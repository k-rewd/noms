import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipesThunk } from "../../store/recipes";
// import { Carousel } from 'react-responsive-carousel';

import NavBar from "../Navigation/NavBar";

import SignUpForm from "../auth/SignUpForm";
import imgFail from '../buttons/imgfailgif.gif'
import splashimg from '../buttons/splashimg.jpg'
import splashimg2 from '../buttons/splashimg2.png'

import nomslogoWR from '../buttons/noms-logo.png'
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false)

  const recipes = useSelector(state => state.recipes)
  const ratings = useSelector(state => state.ratings)
  const ratingLength = Object.keys(ratings).length

  // const sessionUser = useSelector(state => state.session.user);
  // console.log('RECIPES ', recipes)
  // const recipesArr = Object.values(recipes)
  // console.log('recipeArr', recipesArr)
  function starRating(rating) {
    if (rating === 5) return '★★★★★'
    else if (4 <= rating && rating <= 4.99) return '★★★★'
    else if (3 <= rating && rating <= 3.99) return '★★★'
    else if (2 <= rating && rating <= 2.99) return '★★'
    else if (1 <= rating && rating <= 1.99) return '★'
    else return;
  }

  useEffect(() => {
    dispatch(getAllRecipesThunk())

  }, [dispatch])



  return (
    <div>
      <div id='hp-outer-most'>
        <div id='hp-cover'>
          <div id='dev-divs'>
            <div id='dev-divs-left'>
              <div id='dev-about-links'>
                <a href='https://github.com/k-rewd' target='_blank' rel='noreferrer'>
                  <i className="fa-brands fa-github"></i></a>
                <a href='https://www.linkedin.com/in/andrew-k-474479123/' target='_blank' rel='noreferrer'>
                  <i class="fa-brands fa-linkedin"></i></a>
                <a href='https://angel.co/u/andrew-kim-174' target='_blank' rel='noreferrer'>
                  <i class="fa-brands fa-angellist"></i></a>
                <a href='https://github.com/k-rewd/noms' target='_blank' rel='noreferrer'>
                  <i class="fa-brands fa-dev"></i></a>

              </div>
            </div>
            <div id='dev-divs-right'>
              <div id='dev-about-site'>
                <h2 id='about-noms'>ABOUT noms . . .</h2>
                <div id='dev-about-site-message'>
                  Welcome to
                  <span className='bold-this'> noms</span> ...!!
                  <br />
                  <br />
                  The newest cocktail recipe site
                  <br />
                  <div>
                    where users can learn to make
                  </div>
                  their own cocktails, or share
                  their own.
                  <br />
                  <br />
                  Nam quis convallis velit. Vestibulum risus magna, semper ac placerat in, suscipit et eros.
                  <br />
                  <br />
                </div>
                <img id='dev-about-site-circle' src={nomslogoWR} />
              </div>
            </div>
          </div>
          <img id='hp-banner-photo'
            onError={(e) => e.target.src = splashimg2}
            src={splashimg}
          />
        </div>
        <div id='hp-content'>
          <div id='hp-row1'>
            {Object.values(recipes).map(recipe => (
              <div id='hp-recipe-card' key={recipe.id}>
                <NavLink id='hp-card-link' to={`/recipes/${recipe.id}`}>
                  <div id='hp-recipe-card-image-container'>
                    <img id='recipe-card-image'
                      onError={(e) => e.target.src = imgFail}
                      src={recipe.recipe_image} />
                  </div>
                  <div id='recipe-card-content-container'>
                    <div id='recipe-card-content'>
                      <div id='recipe-card-title-author'>
                        <div id='recipe-card-title'>{recipe.title}</div>
                        <div id='recipe-card-author'>{recipe.user.username}</div>
                      </div>
                      <div>{Object.keys(recipe.rating).length ?
                        <div>{starRating(recipe.avgRating)} ({Object.keys(recipe.rating).length})</div>
                        : <div>NEW!</div>
                      }</div>
                    </div>
                    <div id='recipe-card-footer-container'>
                      <div id='recipe-card-footer'></div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}



export default HomePage;