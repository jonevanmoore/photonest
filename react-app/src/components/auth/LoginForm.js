import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ formDisplay }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <>
      <div className='form-div'>
        <label className='photonest-label'>photonest</label>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='splash-input-div'>
            <input
              name='email'
              type='text'
              placeholder='email'
              value={email}
              onChange={updateEmail}
              className="splash-input"
            />
          </div>
          <div className='splash-input-div'>
            <input
              name='password'
              type='password'
              placeholder='password'
              value={password}
              onChange={updatePassword}
              className="splash-input"
            />
          </div>
          <button type='submit' className='login-btn'>Login</button>
        </form>
      </div>
      <div className='switch-form-btn-div'>
        <labe className="bottom-q">Not a member yet?</labe>
        <button onClick={formDisplay} className='switch-form-btn'>Sign up</button>
      </div>
    </>
  );
};

export default LoginForm;
