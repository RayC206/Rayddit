from .db import db
from sqlalchemy.sql import func
import datetime, timeago

class Subscription(db.Model):
  __tablename__ = "subscriptions"

  id = db.Column(db.Integer, primary_key=True)
  subreddit_id = db.Column(db.Integer, db.ForeignKey('subreddits.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())


  #relationships
  user = db.relationship("User", back_populates="subscription")
  subreddit = db.relationship("Subreddit", back_populates="subscriptions")


  def subsciption_timeago(self):
      date = datetime.now()
      return timeago.format(self.created_at, date)

  def to_dict(self):
      return {
          "id": self.id,
          "subreddit_id": self.subreddit_id,
          "user_id": self.user_id,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
      }
