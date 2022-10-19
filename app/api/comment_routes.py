from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.comments import Comment
from ..forms.create_comment import CommentForm

comment_routes = Blueprint('comment', __name__)

