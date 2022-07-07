import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { fetchUsers } from '../../store/user';

const SignUpForm = ({ formDisplay }) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const user = useSelector(state => state.session.user);
  const users = Object.values(useSelector(state => state.users))

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
      setErrors(['errors: Passwords must match'])
    }
  };

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(`${e.target.value}`);
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
        {errors.map((error, i) => (
          <div>
            <span key={i} style={{ color: 'darkred' }}>{error.split(': ')[1]}</span>
          </div>
        ))}
        <form onSubmit={onSignUp}>

          <div className={`splash-input-div`}>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
                className={`splash-input`}
                maxLength={100}
                required={true}
              ></input>
              <span className='span-input'>first name</span>
            </label>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='text'
                name='lastName'
                onChange={updateLastName}
                value={lastName}
                className={`splash-input`}
                maxLength={100}
                required={true}
              ></input>
              <span className='span-input'>last name</span>
            </label>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                className={`splash-input`}
                maxLength={40}
                required={true}
              ></input>
              <span className='span-input'>username</span>
            </label>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                className={`splash-input`}
                maxLength={255}
                required={true}
              ></input>
              <span className='short-span-input'>email</span>
            </label>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                className={`splash-input`}
                maxLength={255}
                required={true}
              ></input>
              <span className='span-input'>password</span>
            </label>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='password'
                name='repeatPassword'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                className={`splash-input`}
                maxLength={255}
              ></input>
              <span className='mid-span-input'>confirm password</span>
            </label>
          </div>

          <button
            type='submit'
            className={`sign-up-btn form-btn`}
          >Sign Up</button>
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
