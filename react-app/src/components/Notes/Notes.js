import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllNotesThunk } from '../../store/notes';


const Notes = () => {
  const dispatch = useDispatch()
  const { recipeId } = useParams()

  const notes = useSelector(state => state.notes)
  const notesArr = Object.values(notes)

  console.log('notes', notes)
  console.log('notesArr', notesArr)

  useEffect(()=> {
    dispatch(getAllNotesThunk(recipeId))
  }, [dispatch, recipeId])

  if (!notes) return null
  else return (
    notesArr.map(note => (
      <div>
        {note.note_body}
      </div>
    ))
  )



}


export default Notes