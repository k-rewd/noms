import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';
import './SignUpForm.css'
import signupimg from '../buttons/signupimg.jpg'

const SignUpForm = () => {

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  function isEmpty(str) {
    return !str.trim().length
  }
  useEffect(() => {
    const err = []
    if (!username) err.push('Please enter valid username')
    if (username.length > 15) err.push('Username must be between 1 and 15 characters')
    if (!email || isEmpty(email)) err.push('Please enter valid email')
    if ( email && !email.toLowerCase().match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) err.push('Please provide a valid email');
    // else if (email.length > 25) errors.push('Email must be between 1 and 25 characters ') 
    if (isEmpty(password)) err.push('Please provide valid password')
    if (password !== repeatPassword)err.push('Passwords must match')
    if (password.length < 6) err.push('Password must be at least 6 characters')
    if (password.length > 20) err.push('Password length must not exceed 20 characters')

    setErrors(err)
  },[username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
        setShowModal(false)
      }
      return
    }
    setShowErrors(true)
    return
  };

  const onCloseModal = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setRepeatPassword("")
    setShowModal(false);
    setShowErrors(false)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <button className='signup-button' onClick={() => setShowModal(true)}>SIGN UP</button>
      {showModal && (
        <Modal showModal={showModal} onClose={() => onCloseModal()}>
          <form className='signup-form' onSubmit={onSignUp}>

            <div className='signup-form-left-side'>

              <img className='signup-form-img' src={signupimg} />
            </div>

            <div id='signup-form-inputs-button'>
              <div id='signup-message'> join us</div>

              <label>username</label>
              <div>
                <input
                  className='signup-input-fields'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <label>email</label>
              <div>
                <input
                  className='signup-input-fields'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <label>password</label>
              <div>
                <input
                  className='signup-input-fields'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <label>repeat password</label>
              <div>
                <input
                  className='signup-input-fields'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div id='signup-space-thingy'></div>

              {showErrors && (
              <div className='signup-errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              )}
              <button className='signup-button-form' type='submit'>Sign Up</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignUpForm;
