from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class NewPost(FlaskForm):
    user_id = StringField('user_id')
    post_image = StringField('post_image', validators=[DataRequired()])
    caption = StringField('caption')


class EditPost(FlaskForm):
    caption = StringField('caption')
