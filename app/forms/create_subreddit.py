from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, ValidationError, Length, Regexp
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)

from app.models.subreddits import Subreddit


def subreddit_exists(form,field):
  subreddit = field.data
  subreddits = Subreddit.query.filter(Subreddit.name == subreddit).first()
  if subreddits:
    raise ValidationError('Subreddit Name Already taken, Choose another name')

def image_url_check(form,field):
  validUrls = (".png", ".jpg", ".jpeg")
  imageUrl = field.data
  if (imageUrl):
    if not imageUrl.endswith(validUrls):
      raise ValidationError('Image icon URL must be a valid type (.png, .jpg, jpeg)')

def banner_url_check(form,field):
  validUrls = (".png", ".jpg", ".jpeg")
  imageUrl = field.data
  if (imageUrl):
    if not imageUrl.endswith(validUrls):
      raise ValidationError('Banner image URL must be a valid type (.png, .jpg, jpeg)')

class SubredditForm(FlaskForm):
  name = StringField("name", validators=[DataRequired("Subreddit name is required!"), subreddit_exists, Length(min=3, max=21, message="Name length must be between 3 and 21 characters!"), Regexp('^\w+$', message="Subreddit name must contain only letters numbers or underscore")])
  description = StringField("description", validators=[Length(max=255, message="Description length too long, 255 characters max!")])
  icon_url = StringField("icon_url", validators=[image_url_check])
  banner_img = StringField("banner_img", validators=[banner_url_check])
