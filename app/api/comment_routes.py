from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.comments import Comment
from ..forms.create_comment import CommentForm

comment_routes = Blueprint('comment', __name__)

# Create post
@comment_routes.route('/create', methods=["POST"])
@login_required
def create_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_comment = Comment (
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
