from .db import db
from sqlalchemy.sql import func
import datetime, timeago

class Post_Type(db.Model):
  __tablename__ = "post_types"

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String, nullable=False, unique=True)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())

  #relationship
  posts = db.relationship("Post", back_populates="post_type")


  def post_type_timeago(self):
    date = datetime.now()
    return timeago.format(self.created_at, date)


  def to_dict(self):
      return {
          "id": self.id,
          "type": self.type,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
      }
