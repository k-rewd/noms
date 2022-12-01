from .db import db
from sqlalchemy.sql import func

class Note(db.Model):
  __tablename__ = 'notes'

  # if environment == "production":
  #   __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
  note_body = db.Column(db.String(500), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp())
  updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.current_timestamp())

  note_recipe = db.relationship('Recipe', back_populates='recipe_note')
  note_user = db.relationship('User', back_populates='user_note')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "recipe_id": self.recipe_id,
      "note_body": self.note_body,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      # "recipe": self.note_recipe.to_dict(),
      "user": self.note_user.to_dict()
      # "user": [user.to_dict() for user in self.note_user]
    }
