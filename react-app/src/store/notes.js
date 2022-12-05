const GET_ALL_NOTES = 'notes/getAllNotes';
// const GET_ONE_NOTE = 'notes/getOneNote';
const CREATE_NOTE = 'notes/createNote';
const UPDATE_NOTE = 'notes/updateNote';
const DELETE_NOTE = 'notes/deleteNote';

const actionGetNotes = (payload) => {
  return {
    type: GET_ALL_NOTES,
    payload
  }
}
// const actionGetOneNote = (payload) => {
//   return {
//     type: GET_ONE_NOTE,
//     payload
//   }
// }
const actionCreateNote = (payload) => {
  return {
    type: CREATE_NOTE,
    payload
  }
}
const actionUpdateNote = (payload) => {
  return {
    type: UPDATE_NOTE,
    payload
  }
}
const actionDeleteNote = (payload) => {
  return {
    type: DELETE_NOTE,
    payload
  }
}

export const getAllNotesThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/${payload}`)
  // console.log('response from notes thunk', response)
  if (response.ok) {
    const notes = await response.json();
    await dispatch(actionGetNotes(notes))
    return notes
  }
  return;
}
export const createNotesThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/${payload.recipe_id}/note`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  // console.log('response from createNoteThunk', response)
  // console.log('payload from createNoteThunk', payload)
  if (response.ok) {
    const note = await response.json();
    await dispatch(actionCreateNote(note))
    return note
  }
}
export const updateNoteThunk = (payload) => async dispatch => {
  // console.log('updateNote payload', payload)
  const response = await fetch(`/api/notes/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  // console.log('updateNote response', response)
  // console.log('updateNote payload', payload)
  if (response.ok) {
    const updatedNote = await response.json();
    await dispatch(actionUpdateNote(updatedNote))
    return updatedNote
  }
  return;
}
export const deleteNoteThunk = (id) => async dispatch => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    dispatch(actionDeleteNote(id));
  }
  return;
}

const initialState = {}

export const noteReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {

    case GET_ALL_NOTES:
      newState = {}
      action.payload.note.forEach(note => {
        newState[note.id] = { ...newState[note.id], ...note}
      })
      return newState

    case CREATE_NOTE:
      newState[action.payload.id] = action.payload
      return newState
    
    case UPDATE_NOTE:
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState
    
    case DELETE_NOTE:
      delete newState[action.payload]
      return newState
    
    default:
      return state;
  }
}