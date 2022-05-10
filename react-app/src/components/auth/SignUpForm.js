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
    <div className='form-div'>
      <label className='photonest-label'>photonest</label>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div>
          <input
            type='text'
            name='firstName'
            placeholder='first name'
            onChange={updateFirstName}
            value={firstName}
            className="splash-input"
          ></input>
        </div>

        <div>
          <input
            type='text'
            name='lastName'
            placeholder='last name'
            onChange={updateLastName}
            value={lastName}
            className="splash-input"
          ></input>
        </div>

        <div>
          <input
            type='text'
            name='username'
            placeholder='username'
            onChange={updateUsername}
            value={username}
            className="splash-input"
          ></input>
        </div>

        <div>
          <input
            type='text'
            name='email'
            placeholder='email'
            onChange={updateEmail}
            value={email}
            className="splash-input"
          ></input>
        </div>

        <div>
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={updatePassword}
            value={password}
            className="splash-input"
          ></input>
        </div>

        <div>
          <input
            type='password'
            name='repeat_password'
            placeholder='confirm password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className="splash-input"
          ></input>
        </div>

        <button type='submit'>Sign Up</button>
      </form>
      <button onClick={formDisplay}>switch</button>
    </div>
  );
};

export default SignUpForm;
