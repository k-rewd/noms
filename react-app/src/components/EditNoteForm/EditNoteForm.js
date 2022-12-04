import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { updateNoteThunk } from '../../store/notes'
import './EditNoteForm.css'

const EditNoteForm = ({ setShowEdit, existingNote }) => {
  const dispatch = useDispatch()
  const ref = useRef()

  const [noteBody, setNoteBody] = useState(existingNote.note_body)
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);

  const notes = useSelector((state) => state.notes)

  const useOutsideClick = (ref, cb) => {
    const handleClick = e => {
      setShowErrors(true)
      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  useEffect(() => {
    const errors = []
    if (!noteBody) errors.push('Note body cannot be empty')
    if (noteBody?.length > 500) errors.push('Note max character 500')
    setValidationErrors(errors)
  }, [noteBody])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setShowErrors(true)
    setShowEdit(false)

    if (!validationErrors.length) {
      const payload = {
        id: existingNote.id,
        user_id: existingNote.user_id,
        recipe_id: existingNote.recipe_id,
        note_body: noteBody
      }
      // console.log('payload~~~', payload)
      let response = await dispatch(updateNoteThunk(payload))

      if (response) {
        setShowErrors(false)
      }
    }
  }
  // onClick={handleCancelClick}
  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   setShowEdit(false)

  // };

  useOutsideClick(ref, () => {
    setShowEdit(false)
  });

  return (
    <div >
      <form onSubmit={handleSubmit} spellCheck="false" ref={ref}>
        <textarea
          className='note-text-area'
          type='text'
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)} />
        <div id='note-buttons-container'>
          <button disabled={validationErrors.length > 0} id='edit-note-save-button' type='submit'>Save</button>
          <div>
            <ul className='edit-note-form-error'>
              {showErrors && validationErrors.length > 0 && validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}



export default EditNoteForm