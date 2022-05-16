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
  const [loginDisabled, setLoginDisabled] = useState('btn-disabled')
  const [customError, setCustomError] = useState('')

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

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setLoginDisabled('enabled')
    } else {
      setLoginDisabled('btn-disabled')
    }

    if (errors.length > 0) {
      setCustomError('email or password is incorrect')
    }
  }, [email, password, errors])

  return (
    <>
      <div className='form-div'>
        <label className='photonest-label'>photonest</label>
        <form onSubmit={onLogin}>
          <div>
            <span style={{ color: 'darkred' }}>{customError}</span>
          </div>
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
              />
              <span className='span-input'>password</span>
            </label>
          </div>
          <button
            type='submit'
            className={`login-btn form-btn ${loginDisabled}`}
            disabled={loginDisabled === 'btn-disabled'}
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
