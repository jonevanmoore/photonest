from .db import db
from sqlalchemy.sql import func


class CommentLike(db.Model):
    __tablename__ = 'comment_likes'

    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(
        db.Integer, db.ForeignKey('comments.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)

    comment = db.relationship('Comment', back_populates='comment_likes')
    user = db.relationship('User', back_populates='comment_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'comment_id': self.comment_id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
