const GET_ALL_RECIPES = 'recipes/getAllRecipes';
const GET_ONE_RECIPE = 'recipes/getOneRecipe';
const CREATE_RECIPE = 'recipes/createRecipe';
const UPDATE_RECIPE = 'recipes/updateRecipe';
const DELETE_RECIPE = 'recipes/deleteRecipe';

const actionGetRecipes = (payload) => {
  return {
    type: GET_ALL_RECIPES,
    payload
  }
}
const actionGetOneRecipe = (payload) => {
  return {
    type: GET_ONE_RECIPE,
    payload
  }
}
const actionCreateRecipe = (payload) => {
  return {
    type: CREATE_RECIPE,
    payload
  }
}
const actionUpdateRecipe = (payload) => {
  return {
    type: UPDATE_RECIPE,
    payload
  }
}
const actionDeleteRecipe = (payload) => {
  return {
    type: DELETE_RECIPE,
    payload
  }
  //payload = id
}

export const getAllRecipesThunk = () => async dispatch => {
  const response = await fetch(`/api/recipes/`)
  // console.log('response from thunk', response)
  if (response.ok) {
    // console.log('running get all recipes thunk!!')
    const allRecipes = await response.json();
    await dispatch(actionGetRecipes(allRecipes))
    return allRecipes
  }
  return;
}
export const getOneRecipeThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/${payload}`)
  // console.log('response from GetONeRecipeThunk', response)
  // console.log('payload', payload)

  if (response.ok) {
    const oneRecipe = await response.json();
    await dispatch(actionGetOneRecipe(oneRecipe))
    return oneRecipe
  }
  return;
}
export const createRecipeThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const newRecipe = await response.json();
    dispatch(actionCreateRecipe(newRecipe))
    return newRecipe
  }
  return;
}
export const updateRecipeThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const updatedRecipe = await response.json();
    await dispatch(actionUpdateRecipe(updatedRecipe))
    return updatedRecipe
  }
  return;
}
export const deleteRecipeThunk = (id) => async dispatch => {
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    dispatch(actionDeleteRecipe(id));
  }
  return;
}

const initialState = {}

export const recipeReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {

    case GET_ALL_RECIPES:
      action.payload.recipes.forEach(recipe => {
        newState[recipe.id] = { ...newState[recipe.id], ...recipe}
      })
      return newState

    case GET_ONE_RECIPE:
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState 

    case CREATE_RECIPE:
      newState[action.payload.id] = action.payload
      return newState

    case UPDATE_RECIPE:
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState

    case DELETE_RECIPE:
      delete newState[action.payload]
      return newState

    default:
      return state;
  }
}