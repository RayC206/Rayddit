from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError()


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('You have entered an invalid Email or Password.')
    if not user.check_password(password):
        raise ValidationError('You have entered an invalid Email or Password.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email("Email address is not valid") ])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
