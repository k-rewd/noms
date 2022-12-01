from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, Form, FormField, StringField, FieldList
from wtforms.validators import DataRequired, ValidationError, URL

def valid_title(form, field):
  title = field.data
  if len(title) < 1 or len(title) > 25:
    raise ValidationError('Title must be between 1 and 25 characters')

def valid_ingredients(form, field):
  ingredients = field.data
  if len(ingredients) < 1 or len(ingredients) > 500:
    raise ValidationError('Ingredients must be between 1 and 500 characters')

def valid_preparation(form, field):
  preparation = field.data
  if len(preparation) < 1 or len(preparation) > 500:
    raise ValidationError('Preparation must be between 1 and 500 characters')


# class Ingredients(Form):
#   ingredient = StringField('ingredient', validators=[DataRequired(), valid_ingredients])


class RecipeForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired(), valid_title])
  # ingredients = FieldList(FormField(Ingredients), min_entries=1)
  ingredients = TextAreaField("Ingredients", validators=[DataRequired(), valid_ingredients])
  preparation = TextAreaField("Preparation", validators=[DataRequired(), valid_preparation])
  recipe_image = StringField("Recipe Image")
  # time = IntegerField("Time", validators=[DataRequired()])
  # recipe_image = StringField(validators=[URL(require_tld=True, message='Must be a valid URL')])
  submit = SubmitField('Submit')

