import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateRecipeThunk } from '../../store/recipes';

const EditRecipeForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipeId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const recipe = useSelector(state => state.recipes[recipeId])

  const [validationErrors, setValidationErrors] = useState([])
  const [showErrors, setShowErrors] = useState(false);

  const [title, setTitle] = useState(recipe.title)
  const [ingredients, setIngredients] = useState(recipe.ingredients)
  const [preparation, setPreparation] = useState(recipe.preparation)
  const [recipeImage, setRecipeImage] = useState(recipe.recipe_image)

  const updateTitle = (e) => setTitle(e.target.value)
  const updateIngredients = (e) => setIngredients(e.target.value)
  const updatePreparation = (e) => setPreparation(e.target.value)
  const updateRecipeImage = (e) => setRecipeImage(e.target.value)

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
        id: recipeId,
        title: title,
        ingredients: ingredients,
        preparation: preparation,
        recipe_image: recipeImage
      }
      let response = await dispatch(updateRecipeThunk(payload))

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
          <h2>Update your Recipe</h2>
          <div>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={updateTitle} />
            <textarea
              type='text'
              placeholder='Ingredients'
              value={ingredients}
              onChange={updateIngredients} />
            <textarea
              type='text'
              placeholder='Preparation'
              value={preparation}
              onChange={updatePreparation} />
            <input
              type='url'
              placeholder='Image(URL)'
              value={recipeImage}
              onChange={updateRecipeImage} />
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

export default EditRecipeForm