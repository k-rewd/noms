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
  const sessionUser = useSelector(state => state.session.user);
  // console.log('RECIPES ', recipes)
  // const recipesArr = Object.values(recipes)
  // console.log('recipeArr', recipesArr)

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
                  A place where you can
                  <br />
                  <div className='bold-this'>
                    CREATE, READ, UPDATE, DELETE
                  </div>
                  recipes for your favorite
                  drinks
                  <br />
                  <br />
                  and also . . . wait for . . .
                  <br />
                  <br />
                  <div className='bold-this'>
                    CREATE, READ, UPDATE, DELETE
                  </div>
                  notes for those recipes!
                  <br />
                  <br />
                  <div className='bold-this'>
                    waaoowww~!!
                  </div>
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
                      <div id='recipe-card-title'>{recipe.title}</div>
                      <div id='recipe-card-author'>{recipe.user.username}</div>
                      <div>★{recipe.avgRating}</div>
                      
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