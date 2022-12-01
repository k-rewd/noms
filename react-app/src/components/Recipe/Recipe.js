import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteRecipeThunk, getOneRecipeThunk } from "../../store/recipes";
import { useParams } from "react-router-dom"
import Notes from "../Notes/Notes";
import './Recipe.css'
import NoteForm from "../NoteForm/NoteForm";
import EditNoteForm from "../EditNoteForm/EditNoteForm";
import { deleteNoteThunk } from "../../store/notes";
import EditRecipeModal from "../EditRecipeForm/EditRecipeModal";

import trashPNG from '../buttons/trash.png'


const Recipe = () => {
  const dispatch = useDispatch()
  const { recipeId } = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const recipe = useSelector(state => state.recipes[recipeId])
  const notes = useSelector(state => state.notes)
  const notesArr = Object.values(notes)
  // console.log('notesBEFORE', notes)
  // console.log('recipes', recipe)

  const [showEdit, setShowEdit] = useState(false)
  // const [showButtons, setShowButtons] = useState(false)

  // const openButtons = () => {
  //   if (showButtons) return;
  //   setShowButtons(true);
  // }

  // useEffect(() => {
  //   if (!showButtons) return;
  //   const closeButtons = () => {
  //     setShowButtons(false);
  //   };
  //   document.addEventListener('click', closeButtons);
  //   return () => document.removeEventListener('click', closeButtons);
  // }, [showButtons])

  let existingNote;
  if (sessionUser) existingNote = notesArr.find(note => note.user_id === sessionUser.id)
  console.log('existingNote', existingNote)


  useEffect(() => {
    dispatch(getOneRecipeThunk(recipeId))
  }, [dispatch, recipeId])

  if (!recipe) return null
  else {
    return (
      <div id='rp-outer-most'>
        <div id='rp-header-content-footer-container'>
          <div id='rp-header'>
            <div id='rp-header-left'>
              <div id='user-buttons-container'>
                {sessionUser.id === recipe.user_id ? 
                  <div >
                    <EditRecipeModal/>
                    <img id='trashpng' src={trashPNG} onClick={() => {dispatch(deleteRecipeThunk(recipe.id))}}/>
                  </div> : <div></div>}
              </div>
              <div id='rp-title-author-container'>
                <div id='rp-recipe-title'>{recipe.title}</div>
                <div id='rp-recipe-author'>By {recipe.user?.username}</div>
              </div>
            </div>
            <div id='rp-header-right'>
              <div id='rp-recipe-image-container'>
                <img
                  alt='recipe-img'
                  // onError={(e) => e.target.src = defaultPro}
                  id='rp-recipe-image'
                  src={recipe.recipe_image} />
              </div>
            </div>
          </div>
          <div id='rp-content'>
            <div id='rp-content-left'>
              <div className='rp-lab'>I N G R E D I E N T S</div>
              <div>{recipe.ingredients}</div>

            </div>
            <div id='rp-content-right'>
              <div className='rp-lab'>P R E P A R A T I O N</div>

              <div>{recipe.preparation}</div>

            </div>

          </div>
          <div id='rp-bottom-container'>
            <div id='rp-bot-left'>
              {/* <div>RATINGS</div> */}

            </div>
            <div id='rp-bot-right'>
              <div className='rp-lab'>N O T E S</div>

              <div>{!existingNote ? <NoteForm recipe={recipe}/> : 

                <div> {showEdit === existingNote?.id ? <EditNoteForm setShowEdit={setShowEdit} existingNote={existingNote} /> :
                  <div>
                    {/* <div>{existingNote?.note_body}</div> */}
                    <button onClick={() => setShowEdit(existingNote.id)}>Edit</button>
                    <button onClick={() => { dispatch(deleteNoteThunk(existingNote.id)) }}>Delete</button>
                  </div>
                }</div>

              }</div>

              <Notes />
            </div>
          </div>
          <div id='rp-footer'>

          </div>
        </div>

      </div>
    )
  }
}

export default Recipe



{/* <div>{ !existingNote ? <NoteForm recipe={recipe}/> :
<div><EditNoteForm setShowEdit={setShowEdit} existingNote={existingNote}/></div>
}</div> */}



{/* <div >{showEdit === annotation.id ? <EditAnnotation setShowEdit={setShowEdit} annotate={annotation} /> :

  <div id='pp-annotation-body'>{annotation.annotation_body}</div>
  <div id='pp-annotation-delete-edit'>
    <button id='pp-annotation-edit' onClick={() => setShowEdit(annotation.id)}>Edit</button>
    <button id='pp-annotation-delete' onClick={() => { dispatch(deleteAnnotation(annotation.id)).then(() => userProp()) }}>Delete</button>
  </div>

}</div> :
<div id='pp-noauth-annotation-body'>{annotation.annotation_body}</div>
}</div> */}