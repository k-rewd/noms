import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import { createRecipeThunk } from '../../store/recipes'

const RecipeForm = ({ setShowModal }) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [preparation, setPreparation] = useState('')
  const [recipeImage, setRecipeImage] = useState('')

  const newTitle = (e) => setTitle(e.target.value)
  const newIngredients = (e) => setIngredients(e.target.value)
  const newPreparation = (e) => setPreparation(e.target.value)
  const newRecipeImage = (e) => setRecipeImage(e.target.value)

  useEffect(() => {
    const errors = []
    if (!title) errors.push('Title is required!')
    else if (title.length > 25) errors.push('Title too long!(25 characters)')
    if (!ingredients) errors.push('Ingredients required')
    else if (ingredients.length > 500) errors.push('Ingredients too long(500 characters)')
    if (!preparation) errors.push('Preparation field cannot be empty')
    else if (preparation.length > 500) errors.push('Preparation too long. Consider making a recipe pt2')
    if (!recipeImage) errors.push('Please provide a valid image of your creation')
    else if (recipeImage && !recipeImage.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi)) errors.push('Please enter a valid URL ending with png, gif, webp, jpeg, or jpg')

    setValidationErrors(errors)
  }, [title, ingredients, preparation, recipeImage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    if (!validationErrors.length) {
      const payload = {
        title: title,
        ingredients: ingredients,
        preparation: preparation,
        recipe_image: recipeImage
      }
      let response = await dispatch(createRecipeThunk(payload))

      if (response) {
        setShowErrors(false)
        setShowModal(false)
        history.push(`/recipes/${response.id}`)
      }
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Share your Recipe</h2>
          <div>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={newTitle} />
            <textarea
              type='text'
              placeholder='Ingredients'
              value={ingredients}
              onChange={newIngredients} />
            <textarea
              type='text'
              placeholder='Preparation'
              value={preparation}
              onChange={newPreparation} />
            <input
              type='url'
              placeholder='Image(URL)'
              value={recipeImage}
              onChange={newRecipeImage} />
            <button type='submit'>Submit Your Recipe</button>
          </div>
          <div>
            <ul >
              {showErrors && validationErrors.length > 0 && validationErrors.map(error => (
                <li key={error}>{error}</li>))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecipeForm