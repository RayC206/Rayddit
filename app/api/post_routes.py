from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.s3Helper import (
    upload_file_to_s3, allowed_file, get_unique_filename)

from ..models.db import db
from ..models.posts import Post
from ..models.comments import Comment
from ..models.post_types import Post_Type
from ..models.users import User
from ..models.votes import Vote
from ..forms.create_post import PostForm
from ..forms.create_comment import CommentForm

post_routes = Blueprint('post', __name__)

# Get All posts
@post_routes.route("/all")
def get_all_posts():
  all_posts = Post.query.order_by(Post.created_at.desc()).all()
  print("*******")
  print(all_posts)

  all_posts_json = [post.to_dict() for post in all_posts]
  return jsonify(all_posts_json)

# Get all posts for the logged in user's subscriptions (Home)
@post_routes.route("/home")
def get_all_posts_for_user():
  subscriptions = current_user.subscription
  user_subreddits = [subscription.subreddit for subscription in subscriptions]
  all_posts = Post.query.order_by(Post.created_at.desc()).all()
  all_posts = [post for post in all_posts if post.subreddit in user_subreddits]


  all_posts_json = [post.to_dict() for post in all_posts]
  return jsonify(all_posts_json)

# Get Details of a single post
@post_routes.route("/<int:post_id>")
def post_details(post_id):
  post = Post.query.get_or_404(post_id)

  if not post:
    return {"message": "Post does not exist", 'statusCode': 404}

  return post.to_dict()

# Create a post
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    url = None
    if form.data["post_type_id"] == 2:
      if "image" not in request.files:
        return {"errors": ["image required"]}, 400

      image = request.files["image"]

      if not allowed_file(image.filename):
          return {"errors": ["file type not permitted"]}, 400

      image.filename = get_unique_filename(image.filename)

      upload = upload_file_to_s3(image)
      if "url" not in upload:
          return upload, 400
      url = upload["url"]

    new_post = Post(
      title = form.data["title"],
      img_url = url,
      link_url = form.data["link_url"],
      text = form.data["text"],
      user_id = current_user.id,
      subreddit_id  = form.data["subreddit_id"],
      post_type_id = form.data["post_type_id"]
    )
    db.session.add(new_post)
    db.session.commit()

    new_post = new_post.to_dict()
    return new_post
  else: # error handling
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

## Edit a post
@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def edit_post(post_id):
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  edited_post = Post.query.get_or_404(post_id)
  print("-----",current_user.id)
  if current_user.id != edited_post.user_id:
    return {"message": "You must be the owner of this post to edit", "statusCode": 403}

  if form.validate_on_submit():
    edited_post.title = form.data['title']
    edited_post.img_url = form.data['img_url']
    edited_post.link_url = form.data['link_url']
    edited_post.text = form.data['text']

    db.session.commit()

    return edited_post.to_dict()
  else: # error handling
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

## Delete a post
@post_routes.delete("/<int:post_id>")
@login_required
def delete_post(post_id):
  post = Post.query.get_or_404(post_id)
  if current_user.id == post.user_id:
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Successfully deleted post'}
  else:
    return {'message': 'Only post author can delete post', 'statusCode': 403}

## Upvote a post
@post_routes.route("/<int:post_id>/upvote", methods=["POST"])
@login_required
def upvote_post(post_id):
  post = Post.query.get_or_404(post_id)
  if not post:
    return {"message": "Post does not exist", 'statusCode': 404}

  vote = Vote.query.filter(Vote.user_id == current_user.id, Vote.post_id == post_id).first()
  if not vote:
    upvote = Vote(
        user_id = current_user.id,
        post_id = post_id,
        value = 1
      )
    db.session.add(upvote)
  else:
    if vote.value == 1:
      vote.value = 0
    else:
      vote.value = 1

  db.session.commit()
  return jsonify(post.to_dict())

# Downvote a post
@post_routes.route("/<int:post_id>/downvote", methods=["POST"])
@login_required
def downvote_post(post_id):
  post = Post.query.get_or_404(post_id)
  if not post:
    return {"message": "Post does not exist"}

  vote = Vote.query.filter(Vote.user_id == current_user.id, Vote.post_id == post_id).first()
  if not vote:
    downvote = Vote(
        user_id = current_user.id,
        post_id = post_id,
        value = -1
      )
    db.session.add(downvote)
  else:
    if vote.value == -1:
      vote.value = 0
    else:
      vote.value = -1

  db.session.commit()
  return jsonify(post.to_dict())


# Get all comments for a post (including replies)
@post_routes.route("/<int:post_id>/comments")
def get_comments(post_id):
  posts_comments = Comment.query.filter(Comment.post_id == post_id).order_by(Comment.created_at.desc()).all()

  all_posts_comments = [comment.to_dict() for comment in posts_comments if comment.parent_id is None]
  return jsonify(all_posts_comments)

# Create comment
@post_routes.route('/<int:post_id>/comments/create', methods=["POST"])
@login_required
def create_comment(post_id):
  form = CommentForm()
  user_id = current_user.id
  post = Post.query.get_or_404(post_id)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_comment = Comment (
      user_id = user_id,
      post_id = post.id,
      parent_id = form.data["parent_id"],
      text = form.data["text"]
    )
    db.session.add(new_comment)
    db.session.commit()

    new_comment = new_comment.to_dict()
    return new_comment
  else:
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400
