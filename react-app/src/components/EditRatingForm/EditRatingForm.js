import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateRatingThunk } from '../../store/ratings'
import '../RatingForm/RatingForm.css'


const EditRatingForm = ({ existingRating }) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { recipeId } = useParams()

  console.log('existing rating from edit rating', existingRating)


  const [rating, setRating] = useState(existingRating?.rating)
  const [hover, setHover] = useState(null);

  const ratings = useSelector(state => state.ratings);
  console.log('ratingsss', ratings)

  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRating(e.target.value)

    const payload = {
      user_id: sessionUser.id,
      recipe_id: recipeId,
      rating: e.target.value
    }
    await dispatch(updateRatingThunk(payload))
    console.log('did it work')



  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        return (
          <label>
            <input
              type='radio'
              name='rating'
              value={ratingVal}
              onClick={handleSubmit}
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
export default EditRatingForm