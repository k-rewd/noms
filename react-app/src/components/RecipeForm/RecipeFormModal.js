import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import RecipeForm from './RecipeForm';
import './RecipeForm.css'

function RecipeFormModal() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
    <button className='submit-recipe-button' onClick={() => setShowModal(true)}>SUBMIT YOUR RECIPE</button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <RecipeForm setShowModal={setShowModal} />
      </Modal>
    )}
    </>
  )
}

export default RecipeFormModal