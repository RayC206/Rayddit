from email.policy import default
from .db import db
from sqlalchemy.sql import func
import datetime, timeago

class Subreddit(db.Model):
  __tablename__ = "subreddits"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  description = db.Column(db.String(255))
  icon_url = db.Column(db.String, nullable=False)
  banner_img = db.Column(db.String)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())

  #Relationships
  owner = db.relationship("User", back_populates="subreddit")
  subscriptions = db.relationship("Subscription", back_populates="subreddit", cascade="all, delete-orphan")
  posts = db.relationship("Post", back_populates="subreddit", cascade="all, delete-orphan")


  def subsciption_timeago(self):
    date = datetime.now()
    return timeago.format(self.created_at, date)

  def to_dict(self):
      return {
          "id": self.id,
          "name": self.name,
          "owner_id": self.owner_id,
          "description": self.description,
          "icon_url": self.icon_url,
          "banner_img": self.banner_img,
          "subscriptions": [subscription.to_dict() for subscription in self.subscriptions],
          "created_at": self.created_at,
          "updated_at": self.updated_at,
      }
