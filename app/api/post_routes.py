from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.posts import Post
from ..models.post_types import Post_Type
from ..models.users import User
from ..models.votes import Vote
from ..forms.create_post import PostForm

post_routes = Blueprint('post', __name__)

# Get All posts
@post_routes.route("/all")
def get_all_posts():
  all_posts = Post.query.order_by(Post.created_at.desc()).all()

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

  return jsonify(post.to_dict())

# Create a post
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_post = Post(
      title = form.data["title"],
      img_url = form.data["img_url"],
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
  else:
    return jsonify(form.errors)

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
  else:
    return jsonify(form.errors)

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
