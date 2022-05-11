from .db import db
from sqlalchemy.sql import func


class PostLike(db.Model):
    __tablename__ = 'post_likes'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_onupdate=func.now(), server_default=func.now())

    post = db.relationship('Post', back_populates='post_likes')
    user = db.relationship('User', back_populates='post_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
