import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ formDisplay }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className='form-div'>
        <label className='photonest-label'>photonest</label>
        {errors.map((error, i) => (
          <div>
            <span key={i} style={{ color: 'darkred' }}>{error.split(': ')[1]}</span>
          </div>
        ))}
        <form onSubmit={onLogin}>
          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                name='email'
                type='text'
                placeholder=' '
                value={email}
                onChange={updateEmail}
                className="splash-input"
                maxLength={255}
                required={true}
              />
              <span className='short-span-input'>email</span>
            </label>
          </div>
          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                name='password'
                type='password'
                placeholder=' '
                value={password}
                onChange={updatePassword}
                className="splash-input"
                maxLength={255}
                required={true}
              />
              <span className='span-input'>password</span>
            </label>
          </div>
          <button
            type='submit'
            className={`login-btn form-btn`}
          >Login</button>
        </form>
      </div>
      <div className='switch-form-btn-div'>
        <label className="bottom-q">Not a member yet?</label>
        <button onClick={formDisplay} className='switch-form-btn'>Sign up</button>
      </div>
    </>
  );
};

export default LoginForm;
