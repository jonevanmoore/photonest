from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.sql import func
from .post import Post
from .post_likes import PostLike


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    bio = db.Column(db.String(200), nullable=True)
    profile_image = db.Column(
        db.String, nullable=False, default='/default_pi.png')
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), nullable=False)

    posts = relationship("Post", back_populates="user", cascade="all, delete")
    post_likes = relationship(
        "PostLike", back_populates="user", cascade="all, delete")
    comments = relationship(
        "Comment", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'email': self.email
        }
