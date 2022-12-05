import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../../context/Modal';
import loginImg from '../buttons/logincocktail.jpg'
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [showErrors, setShowErrors] = useState(false)
  // const [showErrors, setShowErrors] = useState(false);


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch(); 

  // function isEmpty(str) {
  //   return !str.trim().length
  // }

  // useEffect(() => {
  //   const err = []
  //   if (!email) err.push('email: Invalid email')
  //   if (!password) err.push('password: Invalid password')

  //   setErrors(err)
  // }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    // setErrors([])
    const data = await dispatch(login(email, password));
    if (data) {
      let err = []
      for (let error of data) {
        if (error.startsWith('email')) err.push('Invalid email')
        if (error.startsWith('password')) err.push('Invalid password')
        setErrors(err)
      }
      return
    }
    // setShowErrors(true)
    return
  };

  const onCloseModal = () => {
    setEmail("")
    setPassword("")
    setShowModal(false);
    // setShowErrors(false)
    
  }

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div >
      <button className='login-button' onClick={() => setShowModal(true)}>LOG IN</button>
      {showModal && (
        <Modal onClose={() => onCloseModal()}>
          <form className='auth-form' onSubmit={onLogin}>

            <div className='auth-form-left-side'>
              {/* <div className='auth-form-message'>hello</div> */}

              <img className='auth-form-img' src={loginImg} />
            </div>


            <div className='auth-form-inputs-button'>
              <div id='login-message'>enter your email & password to log in</div>
              <div id='auth-space-thingy' ></div>

              <label htmlFor='email'>email</label>
              <div >
                <input
                  className='auth-input-fields'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <label htmlFor='password'>password</label>
              <div >
                <input
                  className='auth-input-fields'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              {/* {showErrors && ( */}
              <div className='auth-errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              {/* )} */}
              <div id='auth-login-demo-button-container'>
              <button id='demo-login-button'
                  type="submit"
                  onClick={() => {
                    setEmail("demo@aa.io")
                    setPassword("password")
                  }}>
                  DEMO USER
                </button>
              <button className='auth-button-form' type='submit'>L O G I N</button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default LoginForm;
