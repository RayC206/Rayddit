from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)

class SubredditForm(FlaskForm):
  name = StringField("name", validators=[DataRequired()])
  description = StringField("description")
  icon_url = StringField("icon_url", validators=[DataRequired()])
  banner_img = StringField("banner_img", validators=[DataRequired()])
