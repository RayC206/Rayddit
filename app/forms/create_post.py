from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import StringField
import re
from wtforms.validators import DataRequired, url, ValidationError, Length
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField, RadioField
)

def type_check(form, field):
  validImageUrls = (".png", ".jpg", ".jpeg", ".gif")
  post_type_id = field.data
  # text = form.data['text']
  img_url = form.data['img_url']
  link_url = form.data['link_url']

  regex =  ("((http|https)://)(www.)?" +
             "[a-zA-Z0-9@:%._\\+~#?&//=]" +
             "{2,256}\\.[a-z]" +
             "{2,6}\\b([-a-zA-Z0-9@:%" +
             "._\\+~#?&//=]*)")

  validateUrl = re.compile(regex)


  if post_type_id == 2 and not img_url:
    raise ValidationError('Image field is required for Image post type')
  elif post_type_id == 3 and not link_url:
    raise ValidationError('Link URL is required for Link post type')

  if post_type_id == 2 and not img_url.endswith(validImageUrls):
    raise ValidationError('Image URLs must be a valid type (.png, .jpg, .jpeg, .gif)')

  elif post_type_id == 3 and not re.search(validateUrl,link_url):
    raise ValidationError('Link URL invalid, must begin with "http://" or "https://" and is a real web domain name')


class PostForm(FlaskForm):
  title = StringField("title", validators=[DataRequired("Title is required!"), Length(min=3, max=130, message="Post title should be between 3 and 130 characters long!")])
  img_url = StringField("img_url")
  link_url = StringField("link_url")
  text = TextAreaField("text", validators=[Length(max=2000, message="Text length must be less than 2000 characters!")])
  subreddit_id =IntegerField("subreddit_id")
  post_type_id = IntegerField("post_type", validators=[DataRequired(), type_check])
