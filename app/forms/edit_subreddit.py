from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditSubredditForm(FlaskForm):
  description = StringField("description")
  icon_url = StringField("icon_url")
  banner_img = StringField("banner_img")
