
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import LoginSignUpModal from '../auth/LoginSignUpModal';
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm';
import RecipeFormModal from '../RecipeForm/RecipeFormModal';
import './NavBar.css'
import N from '../buttons/chomskyN.png'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)





  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div><RecipeFormModal /></div>
      <div className='up'><LogoutButton /></div>
      </>
    )
  }
  return (
    <nav>
      <div className='navigator'>
        <div className='nav-home-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='home-logo'>
            <div className='logo-n'>N</div>
            <div className='noms'>oms</div>
            </div>
          </NavLink>
        </div>
        <div className='right-buttons'>
          <div> GITHUB</div>
          <div> LINKEDIN </div>
        {!sessionUser && (
          <>
            <div><LoginForm /></div>
            <div><SignUpForm /></div>  
          </>
        )}
          {sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


{/* <ul>
<li>
  <NavLink to='/' exact={true} activeClassName='active'>
    Home
  </NavLink>
</li>
<li>
  <LoginSignUpModal />
</li>
<li>
  <LogoutButton />
</li>
<li>
  <NavLink to='/login' exact={true} activeClassName='active'>
    Login
  </NavLink>
</li>
<li>
  <NavLink to='/sign-up' exact={true} activeClassName='active'>
    Sign Up
  </NavLink>
</li>
<li>
  <NavLink to='/users' exact={true} activeClassName='active'>
    Users
  </NavLink>
</li>
</ul> */}