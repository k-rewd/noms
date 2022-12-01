import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllNotesThunk } from '../../store/notes';
import * as moment from 'moment';

import './Notes.css'


const Notes = () => {
  const dispatch = useDispatch()
  const { recipeId } = useParams()

  const notes = useSelector(state => state.notes)
  const notesArr = Object.values(notes)

  console.log('notes', notes)
  console.log('notesArr', notesArr)

  useEffect(() => {
    dispatch(getAllNotesThunk(recipeId))
  }, [dispatch, recipeId])

  if (!notes) return null
  else return (
    notesArr.map(note => (
      <div id='note-container'>
        <div id='note-user-info'>
        <div id='note-username'>{note.user?.username}</div>
        <div id='note-time-info'>{note.updated_at ? moment(note.updated_at).fromNow() : moment(note.created_at).fromNow()}</div>
        </div>
        <div id='note-body'>{note.note_body}</div>
      </div>
    ))
  )
}


export default Notes