from app.models import db, Rating

def seed_ratings():
  rating1 = Rating(
    user_id=1,
    recipe_id=1,
    rating=5
  )
  rating2 = Rating(
    user_id=2,
    recipe_id=1,
    rating=5
  )
  rating3 = Rating(
    user_id=1,
    recipe_id=2,
    rating=5
  )
  rating4 = Rating(
    user_id=2,
    recipe_id=2,
    rating=1
  )
  rating5 = Rating(
    user_id=2,
    recipe_id=3,
    rating=1
  )
  rating6 = Rating(
    user_id=2,
    recipe_id=4,
    rating=4
  )
  rating7 = Rating(
    user_id=1,
    recipe_id=5,
    rating=1
  )
  rating8 = Rating(
    user_id=2,
    recipe_id=5,
    rating=5
  )

  all_ratings = [rating1, rating2, rating3, rating4, rating5, rating6, rating7, rating8]
  saved_rating = [db.session.add(rating) for rating in all_ratings]
  db.session.commit()

def undo_ratings():
  db.session.execute('DELETE FROM ratings')
  db.session.commit()
