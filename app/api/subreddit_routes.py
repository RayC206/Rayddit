from re import sub
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.models.subreddits import Subreddit

from ..models.db import db
from ..models.posts import Post
from ..models.votes import Vote
from ..models.subreddits import Subreddit
from ..models.subscriptions import Subscription
from ..forms.create_subreddit import SubredditForm

subreddit_routes = Blueprint('subreddit', __name__)



# Get details of a Subreddit
@subreddit_routes.route('/<int:subreddit_id>')
def get_subreddit(subreddit_id):
  subreddit = Subreddit.query.get_or_404(subreddit_id)
  print(subreddit)
  return subreddit.to_dict()



# Get all posts in a subreddit
@subreddit_routes.route('/<int:subreddit_id>/posts')
def get_all_posts(subreddit_id):
  subreddit_posts = Post.query.filter(Post.subreddit_id == subreddit_id).order_by(Post.created_at.desc()).all()
  print("here-------",subreddit_posts)

  all_subreddit_posts = [post.to_dict() for post in subreddit_posts]
  return jsonify(all_subreddit_posts)


# Create a subreddit
@subreddit_routes.route("/", methods=["POST"])
@login_required
def create_subreddit():
  form = SubredditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_subreddit = Subreddit(
      name = form.data['name'],
      owner_id = current_user.id,
      description = form.data['description'],
      icon_url = form.data['icon_url'],
      banner_img = form.data['banner_img']
    )
    db.session.add(new_subreddit)
    db.session.commit()

    new_subreddit = new_subreddit.to_dict()
    return new_subreddit
  else:
    return jsonify(form.errors)

# Edit a subreddit
@subreddit_routes.route("/<int:subreddit_id>", methods=["PUT"])
@login_required
def edit_subreddit(subreddit_id):
  form = SubredditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  edited_subreddit = Subreddit.query.get_or_404(subreddit_id)
  if current_user.id != edited_subreddit.owner_id:
    return {"message": "You must be the owner of this subreddit to edit", "statusCode": 403}

  if form.validate_on_submit():
    edited_subreddit.description = form.data['description']
    edited_subreddit.icon_url = form.data['icon_url']
    edited_subreddit.banner_img = form.data['banner_img']

    db.session.commit()

    return edited_subreddit.to_dict()
  else:
    return jsonify(form.errors)

# Delete a subreddit
@subreddit_routes.delete("/<int:subreddit_id>")
@login_required
def delete_subreddit(subreddit_id):
  subreddit = Subreddit.query.get_or_404(subreddit_id)
  if current_user.id == subreddit.owner_id:
    db.session.delete(subreddit)
    db.session.commit()
    return {'message': 'Subreddit successfully deleted'}
  else:
    return {'message': 'Only subreddit owner can delete subreddit', 'statusCode': 403}

# Subscribe/unsubscribe to a subreddit
@subreddit_routes.route("/<int:subreddit_id>/subscribe", methods=["POST"])
@login_required
def subscribe_to_subreddit(subreddit_id):
  subreddit = Subreddit.query.get_or_404(subreddit_id)
  if not subreddit:
    return {"message": "Subreddit does not exist"}
  subscription = Subscription.query.filter(Subscription.subreddit_id == subreddit_id, Subscription.user_id == current_user.id).first()
  # subscribers = [subscription.user for subscription in subreddit.subscriptions]
  if not subscription:
    new_subscription = Subscription(
      user_id = current_user.id,
      subreddit_id = subreddit_id
    )
    message = "Subscribe success"
    db.session.add(new_subscription)
  else:
    message = "Unsubscribe success"
    subreddit.subscriptions.remove(subscription)

  db.session.commit()
  return {"message": message}

# Get all subreddits the logged in user is subscribed to
@subreddit_routes.route('/subscriptions')
@login_required
def get_users_subreddits():
    subscriptions = current_user.subscription
    subreddits = [subscription.subreddit for subscription in subscriptions]

    return {
      "subreddits": [subreddit.to_dict() for subreddit in subreddits]
    }
