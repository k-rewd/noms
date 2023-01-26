import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllRatingsThunk, newRatingThunk } from '../../store/ratings'
import './RatingForm.css'

const RatingForm = () => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { recipeId } = useParams()

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const ratings = useSelector(state => state.ratings)
  const ratingsArr = Object.values(ratings)

  const sessionUser = useSelector(state => state.session.user)

  let existingRating;
  if (sessionUser) existingRating = ratingsArr.find(rating => rating.user_id === sessionUser.id)

  const handleSubmit = async (e) => {
    console.log(e.target.value)
    console.log(e.target)

    e.preventDefault();
    setRating(e.target.value)

    const payload = {
      user_id: sessionUser?.id,
      recipe_id: recipeId,
      rating: e.target.value
    }
    await dispatch(newRatingThunk(payload))
    await dispatch(getAllRatingsThunk(recipeId))
    // console.log('did it work')
    // console.log('payload', payload)
  }

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        return (
          <label>
            <input
              type='radio'
              name="rating"
              value={ratingVal}
              // onClick={() => setRating(ratingVal)}
              onClick={handleSubmit}
            />
            <i class="fa-solid fa-star"
              id={ratingVal <= (hover || rating) ? 'yellow' : 'gray'}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}></i>
          </label>
        )}
      )}
    </div>
  )
}

export default RatingForm