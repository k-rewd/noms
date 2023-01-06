from flask import Blueprint, redirect, request, jsonify
from ..models import db, Recipe, Note
from ..forms import RecipeForm, NoteForm
from flask_login import login_required, current_user

# AWS
from ..aws import (upload_file_to_s3, allowed_file, get_unique_filename)

def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



recipe_routes = Blueprint('recipe', __name__)

# ALL RECIPE
@recipe_routes.route('/')
def get_all_recipes():
  recipes = Recipe.query.all()
  # recipe_list = []
  # for recipe in recipes:
  #   recipe_dict = recipe.to_dict()
  #   recipe_list.append(recipe_dict)
  # return {'recipes': recipe_list}
  return {'recipes': [recipe.to_dict() for recipe in recipes]}

# RECIPE BY ID + ALL ITS NOTES
@recipe_routes.route('/<int:id>')
def recipe(id):
  recipe = Recipe.query.get(id)
  recipe_dictionary = recipe.to_dict()

  notes = Note.query.filter(Note.recipe_id == id).all()
  recipe_dictionary['note'] = [notes.to_dict() for notes in notes]

  return recipe_dictionary




# NEW RECIPE
@recipe_routes.route('/new', methods=["POST"])
@login_required
def new_recipe():
  form = RecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']




  if form.validate_on_submit():
    recipe = Recipe(
      user_id=current_user.id,
      title=form.title.data,
      ingredients=form.ingredients.data,
      preparation=form.preparation.data,
      # time=form.time.data,
      recipe_image=form.recipe_image.data
    )

    # if "recipe_image" not in request.files:
    #   return {"errors": "image required"}, 400

    print('request.files-------------------------------', request.files)

    db.session.add(recipe)
    db.session.commit()
    return recipe.to_dict()

  return {'errors': validation_errors(form.error), 'statusCode': 401}




#UPDATE RECIPE
@recipe_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_recipe(id):
  form = RecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  recipe = Recipe.query.get(id)
  if current_user.id != recipe.user_id:
    return {'errors': 'Unauthorized', 'statusCode': 401}
  
  if not recipe:
    return {'errors': 'Recipe not found', 'statusCode': 404}
  
  if form.validate_on_submit():
    recipe.title = form.title.data
    recipe.ingredients = form.ingredients.data
    recipe.preparation = form.preparation.data
    # recipe.time = form.time.data
    recipe.recipe_image = form.recipe_image.data

    db.session.commit()
    return recipe.to_dict()
  return {'errors': validation_errors(form.errors), 'statusCode': 401}

# DELETE RECIPE
@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
  delete_recipe = Recipe.query.get(id)

  if not delete_recipe:
    return {'errors': 'Recipe not found', 'statusCode': 404}

  if current_user.id != delete_recipe.user_id:
    return {'errors': 'Unauthorized', 'statusCode': 401}

  db.session.delete(delete_recipe)
  db.session.commit()
  return {
    "message": "Successfully deleted",
    "statusCode": 200
  }

### NOTES ###
# GET ALL NOTES OF ONE RECIPE
@recipe_routes.route('/<int:id>')
def notes():
  notes = Note.query.all()
  # for note in notes:
  #   note_dictionary = note.to_dict()
  #   note_list.append(note_dictionary)
  return {'notes': [note.to_dict() for note in notes]}

# NEW NOTE 
@recipe_routes.route('/<int:id>/note', methods=['POST'])
@login_required
def new_note(id):
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    note = Note(
      user_id = current_user.id,
      recipe_id = id,
      note_body = form.note_body.data
    )
    db.session.add(note)
    db.session.commit()
    return note.to_dict()
  return {'errors': validation_errors(form.errors), "statusCode": 401}
  
