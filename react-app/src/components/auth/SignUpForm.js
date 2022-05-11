import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ formDisplay }) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const randomizeColor = () => {
    const colorClasses = [
      'blue-hover',
      'green-hover',
      'purple-hover',
      'true-purple-hover',
      'lime-green-hover',
      'aqua-hover',
      'white-hover'
    ]

    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
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
    <>
      <div className='form-div'>
        <label className='photonest-label'>photonest</label>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div className={`splash-input-div`}>
            <input
              type='text'
              name='firstName'
              placeholder='first name'
              onChange={updateFirstName}
              value={firstName}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <div className='splash-input-div'>
            <input
              type='text'
              name='lastName'
              placeholder='last name'
              onChange={updateLastName}
              value={lastName}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <div className='splash-input-div'>
            <input
              type='text'
              name='username'
              placeholder='username'
              onChange={updateUsername}
              value={username}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <div className='splash-input-div'>
            <input
              type='text'
              name='email'
              placeholder='email'
              onChange={updateEmail}
              value={email}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <div className='splash-input-div'>
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={updatePassword}
              value={password}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <div className='splash-input-div'>
            <input
              type='password'
              name='repeat_password'
              placeholder='confirm password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className={`splash-input ${randomizeColor()}`}
            ></input>
          </div>

          <button type='submit' className='sign-up-btn form-btn'>Sign Up</button>
        </form>
      </div>
      <div className='switch-form-btn-div'>
        <label className="bottom-q">Already have an account?</label>
        <button onClick={formDisplay} className='switch-form-btn'>Sign in</button>
      </div>
    </>
  );
};

export default SignUpForm;
