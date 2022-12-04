import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
import { createNotesThunk } from '../../store/notes';
import './NoteForm.css'

const NoteForm = ({setShowEdit, recipe }) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { recipeId } = useParams()

  const [noteBody, setNoteBody] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);
  // const [showSubmitField, setShowSubmitField] = useState(false);

  const notes = useSelector(state => state.notes)
  const notesArr = Object.values(notes)
  // const newNote = notesArr[0]
  // const newNote = notesArr[0]
  const sessionUser = useSelector(state => state.session.user);
  // console.log('note selector', notes)
  // console.log('notesrecipeid', {notes})
  // console.log('notesArr', notesArr.id)

  let existingNote;
  if (sessionUser) existingNote = notesArr.find(note => note.user_id === sessionUser.id)

  const useOutsideClick = (ref, cb) => {
    const handleClick = e => {
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
    setShowEdit(false)


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

  // const openSubmitField = () => {
  //   if (showSubmitField) return;
  //   setShowSubmitField(true)
  // }
  useOutsideClick(ref, () => {
    setShowErrors(false)
    setShowEdit(false)
  });

  return (
    <div>
      {!existingNote && sessionUser && (
        <form className='note-form' onSubmit={handleSubmit} spellCheck="false" ref={ref}>
          <textarea
            className='note-text-area'
            onClick={() => setShowEdit(false)}
            type='text'
            placeholder='Note placeholder'
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)} />
          {setShowEdit && (
            <div>
            {/* disable={!noteBody} onMouseDown={handleSubmit} visible={showSubmitField}  */}
              <div id='note-submit-button-container'>
                <button id='submit-button' disabled={validationErrors.length > 0} type='submit'>Submit</button>
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