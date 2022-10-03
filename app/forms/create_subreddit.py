from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, ValidationError
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)

from app.models.subreddits import Subreddit


def subreddit_exists(form,field):
  subreddit = field.data
  subreddits = Subreddit.query.filter(Subreddit.name == subreddit).first()
  if subreddits:
    raise ValidationError('Subreddit Name Already taken, Choose another name')

class SubredditForm(FlaskForm):
  name = StringField("name", validators=[DataRequired(), subreddit_exists])
  description = StringField("description")
  icon_url = StringField("icon_url", validators=[DataRequired()])
  banner_img = StringField("banner_img")
