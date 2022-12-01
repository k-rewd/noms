from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError

def valid_note(form, field):
  note = field.data
  if len(note) < 1 or len(note) > 500:
    raise ValidationError('Note must be between 1 and 500 characters')

class NoteForm(FlaskForm):
  note_body = TextAreaField("Note", validators=[DataRequired(), valid_note])
  submit = SubmitField('Submit')