const GET_ALL_RATINGS = 'ratings/getAllRatings';
const NEW_RATING = 'ratings/newRating';
const UPDATE_RATING = 'ratings/updateRating';

const actionGetRatings = (payload) => {
  return {
    type: GET_ALL_RATINGS,
    payload
  }
}
const actionNewRating = (payload) => {
  return {
    type: NEW_RATING,
    payload
  }
}
const actionUpdateRating = (payload) => {
  return {
    type: UPDATE_RATING,
    payload
  }
}

export const getAllRatingsThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/recipes/${payload}`)
  // console.log('responseeeeeeeeeeeeee', response)
  if (response.ok) {
    const ratings = await response.json();
    await dispatch(actionGetRatings(ratings))
    return ratings
  }
  return;
}
export const newRatingThunk = (payload) =>  async dispatch => {
  const response = await fetch(`/api/recipes/${payload}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const rating = await response.json();
    await dispatch(actionNewRating(rating))
    return rating
  }
}
export const updateRatingThunk = (payload) => async dispatch => {
  const response = await fetch(`/api/ratings/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const updatedRating = await response.json();
    await dispatch(actionUpdateRating(updatedRating))
    return updatedRating
  }
  return;
}

const initialState = {}

export const ratingReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_ALL_RATINGS:
      newState = {}
      action.payload.rating.forEach(rating => {
        newState[rating.id] = { ...newState[rating.id], ...rating}
      })
      return newState
    
    case NEW_RATING:
      newState[action.payload.id] = action.payload
      return newState
      
    case UPDATE_RATING:
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState
      
    default:
      return state;
  }
}