from .db import db
from sqlalchemy.sql import func
from flask_login import UserMixin


class Post(db.Model, UserMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_image = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(200))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)

    user = db.relationship("User", back_populates="posts")
    post_likes = db.relationship(
        'PostLike', back_populates='post', cascade="all, delete")
    comments = db.relationship(
        "Comment", back_populates="post", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_image': self.post_image,
            'caption': self.caption,
            'post_likes': self.post_likes,
            'comments': self.comments,
            'user': self.user.to_dict(),
        }
