import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import { createRecipeThunk, getAllRecipesThunk } from '../../store/recipes'
import './RecipeForm.css'


const RecipeForm = ({ setShowModal }) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);

  // // // // // 
  // const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  // // // // // 

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [preparation, setPreparation] = useState('')
  const [recipeImage, setRecipeImage] = useState('')

  const newTitle = (e) => setTitle(e.target.value)
  const newIngredients = (e) => setIngredients(e.target.value)
  const newPreparation = (e) => setPreparation(e.target.value)


  useEffect(() => {
    const errors = []
    if (!title) errors.push('Title is required!')
    else if (title.length > 25) errors.push('Title too long! (25 characters)')
    // if (!recipeImage) errors.push('Please provide a valid image of your creation')
    // else if (recipeImage && !recipeImage.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi)) errors.push('Please enter a valid URL ending with png, gif, webp, jpeg, or jpg')
    if (!ingredients) errors.push('Ingredients required')
    else if (ingredients.length > 500) errors.push('Ingredients too long(500 characters)')
    if (!preparation) errors.push('Preparation field cannot be empty')
    else if (preparation.length > 500) errors.push('Preparation too long. Consider making a recipe pt2')

    setValidationErrors(errors)
  }, [title, ingredients, preparation, recipeImage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    const recipeForm = document.getElementById('recipe-form-id')
    console.log('recipeForm', recipeForm)

    // // // // // 
    const formData = new FormData(recipeForm);
    formData.append("recipe_image", recipeImage);

    console.log('formdata', formData)
    setImageLoading(true);


    const res = await fetch('/api/recipes/new', {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await res.json();
      await dispatch(getAllRecipesThunk());
      setImageLoading(false);
      setShowErrors(false)
      setShowModal(false)
      console.log('res', res)
      history.push(`/`)
    } else {
      setImageLoading(false);
      console.log('res', res)

      console.log("error")
    }

    // // // // // 

    // if (!validationErrors.length) {
    //   const payload = {
    //     title: title,
    //     ingredients: ingredients,
    //     preparation: preparation,
    //     recipe_image: recipeImage
    //   }
    //   let response = await dispatch(createRecipeThunk(payload))

    //   if (response) {
    //     setShowErrors(false)
    //     setShowModal(false)
    //     history.push(`/recipes/${response.id}`)
    //   }
    // }
  }



  const newRecipeImage = (e) => {
    const file = e.target.files[0];
    console.log('file', file)
    setRecipeImage(file)
  }

  return (
    <div className='recipe-form-modal'>
      <div>
        <form className='recipe-form' id='recipe-form-id' onSubmit={handleSubmit}>
          <div className='form-title-container'><h2 className='form-title'>SHARE YOUR RECIPE</h2></div>
          <div className='recipe-form-content'>
            <input
              className='recipe-form-title'
              name='title'
              type='text'
              placeholder='Title'
              value={title}
              onChange={newTitle} />
            <input
              className='recipe-form-image'
              type='file'
              accept="image/*"
              name='recipe_image'
              // placeholder='Image URL: png | gif | webp | jpeg | jpg'
              // value={recipeImage}
              onChange={newRecipeImage} />
              {(imageLoading)}
              
            <textarea
              className='recipe-form-ingredients'
              name='ingredients'
              type='text'
              placeholder='Ingredients: Feel free to separate ingredients by line breaks'
              value={ingredients}
              onChange={newIngredients} />
            <textarea
              className='recipe-form-preparation'
              name='prepartion'
              type='text'
              placeholder='Preparation: Feel free to separate steps by line breaks'
              value={preparation}
              onChange={newPreparation} />
              <div ></div>
            <div className='recipe-form-error-space'>
              <ul >
                {showErrors && validationErrors.length > 0 && validationErrors.map(error => (
                  <li key={error}>{error}</li>))}
              </ul>
            </div>
            <button className='submit-recipe-button-form' type='submit'>SUBMIT YOUR RECIPE</button>
            
          </div>

        </form>
      </div>
    </div>
  )
}

export default RecipeForm