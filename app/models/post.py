from .db import db
from sqlalchemy.sql import func


class Post(db.Model):
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

    def to_dict_lite(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_image': self.post_image,
            'caption': self.caption,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_lite()
        }

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_image': self.post_image,
            'caption': self.caption,
            'post_likes': [post_like.to_dict_lite() for post_like in self.post_likes],
            'comments': [comment.to_dict_lite() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_lite()
        }
