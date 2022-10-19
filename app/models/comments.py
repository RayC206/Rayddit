from .db import db
from sqlalchemy.sql import func
import datetime, timeago


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    parent_id = db.Column(db.Integer, db.ForeignKey("comments.id"))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # relationships
    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")
    replies = db.relationship("Comment", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "text": self.text,
            "post_id": self.post.id,
            "parent_id": self.parent_id,
            "replies": [comment.to_dict() for comment in self.replies],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
