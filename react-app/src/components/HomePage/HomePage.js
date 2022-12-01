import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecipesThunk } from "../../store/recipes";
import NavBar from "../Navigation/NavBar";
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  const recipes = useSelector(state => state.recipes)
  console.log('RECIPES ', recipes)
  // const recipesArr = Object.values(recipes)
  // console.log('recipeArr', recipesArr)

  useEffect(() => {
    dispatch(getAllRecipesThunk())
  }, [dispatch])



  return (
    <div>
      <div id='hp-outer-most'>
        <div id='hp-cover'>
          <div></div>
          <img id='hp-banner-photo'
          src={'https://imbibemagazine.com/wp-content/uploads/2018/10/death-and-co-ideal-martini-horizontal-crdt-dylan-and-jeni.jpg'}
          />
        </div>
        <div id='hp-content'>
          <div id='hp-row1'>
            {Object.values(recipes).map(recipe => (
              <div id='hp-recipe-card' key={recipe.id}>
                <NavLink id='hp-card-link'to={`/recipes/${recipe.id}`}>
                  <div id='hp-recipe-card-image-container'>
                    <img id='recipe-card-image' src={recipe.recipe_image} />
                  </div>
                  <div id='recipe-card-content-container'>
                    <div id='recipe-card-content'>
                      <div id='recipe-card-title'>{recipe.title}</div>
                      <div id='recipe-card-author'>{recipe.user.username}</div>
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