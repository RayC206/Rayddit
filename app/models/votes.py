from .db import db
from sqlalchemy.sql import func
import datetime, timeago


class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    value = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # relationship
    post = db.relationship("Post", back_populates="votes")
    user = db.relationship("User", back_populates="votes")

    def vote_timeago(self):
        date = datetime.now()
        return timeago.format(self.created_at, date)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "value": self.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
