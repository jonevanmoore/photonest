
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, ValidationError
# from app.models import User, Post


class CreateCommentForm(FlaskForm):
    user_id = StringField('user_id')
    post_id = StringField('post_id')
    content = StringField('Content', validators=[DataRequired()])


class EditCommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
