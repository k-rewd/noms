import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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
              onClick={() => (setRating(ratingVal))}
            />
            <i class="fa-solid fa-star"
              id={ratingVal <= (hover || rating) ? 'yellow' : 'gray'}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}></i>
          </label>
        )
      })}
    </div>
  )
}

export default RatingForm