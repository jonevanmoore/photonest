from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, Email, ValidationError
from app.models import User, Post, Comment


class ImageLikeForm(FlaskForm):
    user_id = StringField('user_id')
    post_id = StringField('post_id')
