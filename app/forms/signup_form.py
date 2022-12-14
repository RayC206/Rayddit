from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_check(form,field):
    email = field.data
    if "@" not in email:
        raise ValidationError('Email is not a valid address.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=4, max=12, message="Username must be length must between 4 and 12 characters!"), Regexp('^\w+$', message="Username name must contain only letters numbers or underscore (check for spaces)")])
    email = StringField('email', validators=[DataRequired(), user_exists, Email("Email address is not valid")])
    password = StringField('password', validators=[DataRequired(), Length(min=5, message="Password length must be greater than 4 characters")])
