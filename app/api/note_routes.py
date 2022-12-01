from flask import Blueprint, redirect, request, jsonify
from ..models import db, Recipe, Note
from ..forms import RecipeForm, NoteForm
from flask_login import login_required, current_user

def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

note_routes = Blueprint('note', __name__)

# GET ONE NOTE
# @note_routes.route('/<int:id>')
# def notes(id):
#     note = Note.query.get(id)

# EDIT NOTE
@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    note = Note.query.get(id)
    if current_user.id != note.user_id:
        return {'errors': 'Unauthorized', 'statusCode': 401}
    if not note:
        return {'errors': 'Note not found', 'statusCode': 404}
    if form.validate_on_submit():
        note.note_body = form.note_body.data
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors(form.errors), "statusCode": 401}


# DELETE NOTE
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    delete_note = Note.query.get(id)

    if current_user.id != delete_note.user_id:
        return {'errors': 'Unauthorized', 'statusCode':401}
    if not delete_note:
        return {'errors': 'Note not found', 'statusCode': 404}
    
    db.session.delete(delete_note)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        "statusCode": 200    
    }

