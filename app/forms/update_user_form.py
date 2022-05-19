from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UpdateUserForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('lastName', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
    profile_image = StringField('profile_image', validators=[DataRequired()])
