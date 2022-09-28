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
    return {"posts": all_posts_json}

# Get Details of a single post
@post_routes.route("/<int:post_id>")
def post_details(post_id):
  post = Post.query.get(post_id)
  if not post:
    return {"message": "Post does not exist"}
  else:
    return post.to_dict()

# Create a post
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print(form.data)
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
