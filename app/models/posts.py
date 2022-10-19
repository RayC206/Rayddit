from .db import db
from sqlalchemy.sql import func
import datetime, timeago

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable=False)
  post_type_id = db.Column(db.Integer, db.ForeignKey("post_types.id"), nullable=False)
  title = db.Column(db.String(255), nullable=False)
  img_url = db.Column(db.String)
  text = db.Column(db.String)
  link_url = db.Column(db.String)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())

  #relationships
  user = db.relationship("User", back_populates="posts")
  subreddit = db.relationship("Subreddit", back_populates="posts")
  post_type = db.relationship("Post_Type", back_populates="posts")
  votes = db.relationship("Vote", back_populates="post", cascade="all, delete-orphan")
  comments = db.relationship("Comment", back_populates="post")

  def post_timeago(self):
    return timeago.format(self.created_at, datetime.datetime.now())

  def total_votes(self):
    return sum(vote.value for vote in self.votes)

  def to_dict(self):
      return {
          "id": self.id,
          "user_id": self.user_id,
          "username": self.user.username,
          "subreddit_id": self.subreddit_id,
          "subreddit_name": self.subreddit.name,
          "post_type_id": self.post_type_id,
          "title": self.title,
          "img_url": self.img_url,
          "text": self.text,
          "link_url": self.link_url,
          "total_votes": self.total_votes(),
          "votes": [vote.to_dict() for vote in self.votes],
          "created_at": self.created_at,
          "created_at_timeago": self.post_timeago(),
          "updated_at": self.updated_at,
      }
