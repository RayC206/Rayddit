from re import sub
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.models.subreddits import Subreddit

from ..models.db import db
from ..models.posts import Post
from ..models.votes import Vote
from ..models.subreddits import Subreddit

subreddit_routes = Blueprint('subreddit', __name__)



# Get details of a Subreddit
@subreddit_routes.route('/<int:subreddit_id>')
def get_subreddit(subreddit_id):
  subreddit = Subreddit.query.get(subreddit_id)
  print(subreddit)
  return subreddit.to_dict()



# Get all posts in a subreddit
@subreddit_routes.route('/<int:subreddit_id>/posts')
def get_all_posts(subreddit_id):
  subreddit_posts = Post.query.filter(Post.subreddit_id == subreddit_id).order_by(Post.created_at.desc()).all()
  print("here-------",subreddit_posts)

  all_subreddit_posts = [post.to_dict() for post in subreddit_posts]
  return jsonify(all_subreddit_posts)



