import React from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllRatingsThunk } from "../../store/ratings";


const Ratings = () => {
  const dispatch = useDispatch()
  const { recipeId } = useParams()

  const ratings = useSelector(state => state.ratings)
  const ratingsArr = Object.values(ratings)
  console.log('ratingArr', ratingsArr)
  console.log('ratings', ratings)
  
  useEffect(() => {
    dispatch(getAllRatingsThunk(recipeId))
  }, [dispatch, recipeId])


  function starRating(rating) {
    if (rating === 5) return '★★★★★'
    if (rating >= 4 || rating <= 4.99) return '★★★★'
    if (rating === 3) return '★★★'
    if (rating === 2) return '★★'
    if (rating === 1) return '★'
    else return;
  }

  return (
    <div>
      {
        ratingsArr.map(rating => {
          <div>{rating.rating}</div>
        })
      }
    </div>
  )


}

export default Ratings