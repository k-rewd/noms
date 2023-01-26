from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def valid_rating(form, field):
  rating = field.data
  if rating < 0 or rating > 5:
    raise ValidationError('Rating must be between 1 and 5 stars')

class RatingForm(FlaskForm):
  rating = IntegerField("Rating", validators=[valid_rating])