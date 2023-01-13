from flask import Blueprint, redirect, request, jsonify
from ..models import db, Recipe, Note, Rating
from ..forms import RecipeForm, NoteForm, RatingForm
from flask_login import login_required, current_user

def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

rating_routes = Blueprint('rating', __name__)

# EDIT RATING
@rating_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_rating(id):
  form = RatingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  rating = Rating.query.get(id)
  if current_user.id != rating.user_id:
    return {'errors': 'Unauthorized', 'statusCode': 401}
  if not rating:
    return {'errors': 'Rating not found', 'statusCode': 404}
  if form.validate_on_submit():
    
    # calculate average here


    db.session.commit()
    return rating.to_dict()
  return {'errors': validation_errors(form.errors), "statusCode": 401}
 








