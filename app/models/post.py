# from .db import db
# from sqlalchemy.sql import func
# from sqlalchemy.schema import Column, ForeignKey
# from sqlalchemy.orm import relationship
# from flask_login import UserMixin


# class Post(db.Model, UserMixin):
#     __tablename__ = 'posts'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     post_image = db.Column(db.String, nullable=False)
#     caption = db.Column(db.String(200))
#     created_at = db.Column(db.Date, nullable=False)
#     updated_at = db.Column(db.Date, nullable=False)

#     # user = relationship("User", back_populates="posts")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'post_image': self.post_image,
#             'caption': self.caption,
#             'user': self.user.to_dict()
#         }
