from .db import db
from sqlalchemy.sql import func

class Recipe(db.Model):
  __tablename__ = 'recipes'

  # if environment == "production":
  #   __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  title = db.Column(db.String(25), nullable=False)
  ingredients = db.Column(db.String(500), nullable=False)
  preparation = db.Column(db.String(500), nullable=False)
  # time = db.Column(db.Integer, nullable=False)
  recipe_image = db.Column(db.String(255), nullable=True)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp())
  updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.current_timestamp())
  
  recipe_user = db.relationship('User', back_populates='user_recipe')
  recipe_note = db.relationship('Note', back_populates='note_recipe', cascade="all, delete")
  recipe_rating = db.relationship('Rating', back_populates='rating_recipe', cascade="all, delete")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "title": self.title,
      "ingredients": self.ingredients,
      "preparation": self.preparation,
      # "time": self.time,
      "recipe_image": self.recipe_image,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "user": self.recipe_user.to_dict(),
      # "note": self.recipe_note.to_dict()
      "note": [note.to_dict() for note in self.recipe_note],
      # "rating": [rating.to_dict() for rating in self.recipe_rating]
      "rating": self.recipe_rating.to_dict()
      }