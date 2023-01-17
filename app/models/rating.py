from .db import db
from sqlalchemy.sql import func

class Rating(db.Model):
  __tablename__ = 'ratings'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
  rating = db.Column(db.Integer, nullable=True)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.current_timestamp())
  updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.current_timestamp())

  rating_recipe = db.relationship('Recipe', back_populates='recipe_rating')
  rating_user = db.relationship('User', back_populates='user_rating')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "recipe_id": self.recipe_id,
      "rating": self.rating,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "user": self.rating_user.to_dict(),
      # "recipe": self.rating_recipe.to_dict()
    }