import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { updateNoteThunk } from '../../store/notes'

const EditNoteForm = ({setShowEdit, existingNote}) => {
  const dispatch = useDispatch()

  const [noteBody, setNoteBody] = useState(existingNote.note_body)
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);

  const notes = useSelector((state) => state.notes)

  useEffect(() => {
    const errors = []
    if (!noteBody) errors.push('Note body cannot be empty')
    if (noteBody?.length > 500) errors.push('Note max character 500')
    setValidationErrors(errors)
  }, [noteBody])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)
    setShowEdit(false)

    if (!validationErrors.length) {
      const payload = {
        id: existingNote.id,
        user_id: existingNote.user_id,
        recipe_id: existingNote.recipe_id,
        note_body: noteBody
      }
      console.log('payload~~~', payload)
      let response = await dispatch(updateNoteThunk(payload))

      if (response) {
        setShowErrors(false)
      }
    }
  }
  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} spellCheck="false">
        <textarea
          type='text'
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)} />
        <div>
          <button type='submit'>Save</button>
        </div>
        <div>
          <div>
            {showErrors && validationErrors.length > 0 && validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}



export default EditNoteForm