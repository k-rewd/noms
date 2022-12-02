import React, { useState } from 'react';
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

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onCloseModal = () => {
    setEmail("")
    setPassword("")
    setShowModal(false);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

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

              <img  className='auth-form-img' src={loginImg}/>
            </div>


            <div className='auth-form-inputs-button'>
              <div id='login-message'>enter your email & password to log in</div>
              <div id='auth-space-thingy' ></div>

              <label htmlFor='email'>Email</label>
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
              <label htmlFor='password'>Password</label>
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
              <div className='auth-errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <button className='auth-button-form' type='submit'>L O G I N</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default LoginForm;
