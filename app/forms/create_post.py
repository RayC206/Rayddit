from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, ValidationError
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField, RadioField
)

# from app.forms.create_subreddit import image_url_check

# if post_type_id is 1 (Text), text should not be null
# if post_type_id is 2 (Image), img_url should not be null
# if post_type_id is 3 (Link), link_url should not be null

def type_check(form, field):
  validImageUrls = (".png", ".jpg", ".jpeg")
  validUrl = ("http://", "https://")
  post_type_id = field.data
  text = form.data['text']
  img_url = form.data['img_url']
  link_url = form.data['link_url']
  if post_type_id == 1 and not text:
    raise ValidationError('Text field is required for Text post type')
  elif post_type_id == 2 and not img_url:
    raise ValidationError('Image field is required for Image post type')
  elif post_type_id == 3 and not link_url:
    raise ValidationError('Link URL is required for Link post type')

  if post_type_id == 2 and not img_url.endswith(validImageUrls):
    raise ValidationError('Image URLs must be a valid type (.png, .jpg, jpeg)')

  elif post_type_id == 3 and not link_url.endswith(validUrl):
    raise ValidationError('Link URL invalid, must begin with "http://" or "https://"')


class PostForm(FlaskForm):
  # subreddit
  title = StringField("title", validators=[DataRequired()])
  img_url = StringField("img_url")
  link_url = StringField("link_url")
  text = StringField("text")
  subreddit_id =IntegerField("subreddit_id")
  post_type_id = IntegerField("post_type", validators=[DataRequired(), type_check])
