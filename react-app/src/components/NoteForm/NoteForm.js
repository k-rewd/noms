import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import { createNotesThunk } from '../../store/notes';
import './NoteForm.css'

const NoteForm = ({ recipe }) => {
  const dispatch = useDispatch()
  const { recipeId } = useParams()

  const [noteBody, setNoteBody] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);
  const [showSubmitField, setShowSubmitField] = useState(false);

  const notes = useSelector(state => state.notes)
  const notesArr = Object.values(notes)
  // const newNote = notesArr[0]
  // const newNote = notesArr[0]
  const sessionUser = useSelector(state => state.session.user);
  console.log('note selector', notes)
  // console.log('notesrecipeid', {notes})
  console.log('notesArr', notesArr.id)

  let existingNote;
  if (sessionUser) existingNote = notesArr.find(note => note.user_id === sessionUser.id)

  useEffect(() => {
    if (!showSubmitField) return;

    const closeSubmitField = (e) => {
      e.preventDefault();
      setShowErrors(true)
      setShowSubmitField(false)
    }
    document.addEventListener('click', closeSubmitField);
    return () => document.removeEventListener('click', closeSubmitField)
  }, [showSubmitField]);

  // const createNote = (e) => setNoteBody(e.target.value);

  useEffect(() => {
    const errors = []
    if (!noteBody) errors.push('Note body cannot be empty')
    if (noteBody.length > 500) errors.push('Note max character 500')
    setValidationErrors(errors)
  }, [noteBody])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)


    if (!validationErrors.length) {
      const payload = {
        recipe_id: recipe?.id,
        note_body: noteBody
      }
      let response = await dispatch(createNotesThunk(payload))
      if (response) {
        setShowErrors(false)
      }
    }
  }

  const openSubmitField = () => {
    if (showSubmitField) return;
    setShowSubmitField(true)
  }

  return (
    <div>
      {!existingNote && sessionUser && (
        <form className='note-form' onSubmit={handleSubmit} spellCheck="false">
          <textarea
            className='note-text-area'
            onClick={openSubmitField}
            type='text'
            placeholder='Note placeholder'
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)} />
          {showSubmitField && (
            <div>
              <div id='note-submit-button-container'>
                <button disable={!noteBody} onMouseDown={handleSubmit} visible={showSubmitField} id='submit-button' type='submit'>Submit</button>
                <div>
                  <div id='note-form-error'>
                    {showErrors && validationErrors.length > 0 && validationErrors.map(error => (
                      <li key={error}>{error}</li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
export default NoteForm