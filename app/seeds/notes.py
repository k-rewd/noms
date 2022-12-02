from app.models import db, Note
# from faker import Faker
# import random
# fake=Faker()

# authors = list(range(1,5))

def seed_notes():
  note1 = Note(
    user_id=1,
    recipe_id=1,
    note_body = 'i am a comment from user 1 on my own recipe'
  )
  note2 = Note(
    user_id=1,
    recipe_id=2,
    note_body = 'i am a comment from user 1 on recipe 2'
  )
  note3 = Note(
    user_id=1,
    recipe_id=3,
    note_body = 'i am a comment from user 1 on recipe 3'
  )
  note4 = Note(
    user_id=1,
    recipe_id=4,
    note_body = 'i am a comment from user 1 on recipe 4'
  )
  note5 = Note(
    user_id=2,
    recipe_id=1,
    note_body = 'I am a comment from user 2 on recipe 1'
  )
  all_notes = [note1, note2, note3, note4, note5]
  saved_notes = [db.session.add(note) for note in all_notes]
  db.session.commit()

def undo_notes():
    db.session.execute('DELETE FROM notes')
    db.session.commit()