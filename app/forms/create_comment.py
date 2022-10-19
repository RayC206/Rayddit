from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, ValidationError, Length
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField, RadioField
)

class CommentForm(FlaskForm):
  text =  TextAreaField("Comment", validators=[DataRequired(),
    Length( min=1, max=2000, message='Comment must be between 1 and 2000 characters')])
