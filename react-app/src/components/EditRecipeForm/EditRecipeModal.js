import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditRecipeForm from "./EditRecipeForm";

import './EditRecipe.css'
import editPNG from '../buttons/edit.png'

function EditRecipeModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img id='editpng' src={editPNG}onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditRecipeForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditRecipeModal