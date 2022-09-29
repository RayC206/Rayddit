from flask import Blueprint, jsonify
from flask_login import login_required

from app.models import User

from ..models.db import db
from ..models.posts import Post
from ..models.votes import Vote
from ..models.subreddits import Subreddit
from ..models.subscriptions import Subscription


user_routes = Blueprint('users', __name__)

# Get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# Get details of a user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get_or_404(id)
    return user.to_dict()


# Get all posts authored by a user (profile)
@user_routes.route("/<int:user_id>/posts_by_user")
@login_required
def get_users_posts(user_id):
    users_posts = Post.query.filter(Post.user_id == user_id).all()

    all_users_posts = [post.to_dict() for post in users_posts]

    return jsonify(all_users_posts)
