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
  const [signUpDisabled, setSignUpDisabled] = useState('btn-disabled')

  const [firstNameValid, setFirstNameValid] = useState('invalid')
  const [lastNameValid, setLastNameValid] = useState('invalid')
  const [usernameValid, setUsernameValid] = useState('invalid')
  const [emailValid, setEmailValid] = useState('invalid')
  const [passwordValid, setPasswordValid] = useState('invalid')
  const [repeatPasswordValid, setRepeatPasswordValid] = useState('invalid')


  const user = useSelector(state => state.session.user);
  const users = Object.values(useSelector(state => state.users))

  // const usernameList = []
  // users.forEach(user => {
  //   usernameList.push(user.username)
  // })
  // const emailList = []
  // users.forEach(user => {
  //   emailList.push(user.email)
  // })

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

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])



  useEffect(() => {
    //FIRST NAME
    if (firstName.length > 0) {
      setFirstNameValid('valid')
    } else {
      setFirstNameValid('invalid')
    }

    //LAST NAME
    if (lastName.length > 0) {
      setLastNameValid('valid')
    } else {
      setLastNameValid('invalid')
    }

    //USERNAME
    if (username.length > 4) {
      setUsernameValid('valid')
    } else {
      setUsernameValid('invalid')
    }

    //EMAIL
    if (email.length > 0) {
      setEmailValid('valid')
    } else {
      setEmailValid('invalid')
    }

    //PASSWORD
    if (password.length > 7) {
      setPasswordValid('valid')
    } else {
      setPasswordValid('invalid')
    }

    //CONFIRM PASS
    if (repeatPassword === password && repeatPassword.length > 0) {
      setRepeatPasswordValid('valid')
    } else {
      setRepeatPasswordValid('invalid')
    }


    //SIGNUP BTN
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      repeatPassword === password
    ) {
      setSignUpDisabled('enabled')
    } else {
      setSignUpDisabled('btn-disabled')
    }
  }, [firstName, lastName, username, email, password, repeatPassword])

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(`${e.target.value}`.toLocaleLowerCase());
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
                placeholder=' '
                onChange={updateFirstName}
                value={firstName}
                className={`splash-input`}
                maxLength={100}
              ></input>
              <span className='span-input'>first name</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${firstNameValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='text'
                name='lastName'
                placeholder=' '
                onChange={updateLastName}
                value={lastName}
                className={`splash-input`}
                maxLength={100}
              ></input>
              <span className='span-input'>last name</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${lastNameValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                type='text'
                name='username'
                placeholder=' '
                onChange={updateUsername}
                value={username}
                className={`splash-input`}
                maxLength={40}
              ></input>
              <span className='long-span-input'>{'username (5 character min.)'}</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${usernameValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>
              <input
                type='text'
                name='email'
                placeholder=' '
                onChange={updateEmail}
                value={email}
                className={`splash-input`}
                maxLength={255}
              ></input>
              <span className='short-span-input'>email</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${emailValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='password'
                name='password'
                placeholder=' '
                onChange={updatePassword}
                value={password}
                className={`splash-input`}
                maxLength={255}
              ></input>
              <span className='long-span-input'>{'password (8 character min.)'}</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${passwordValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <div className='splash-input-div'>
            <label className='label-input' style={{ width: '90%' }}>

              <input
                type='password'
                name='repeat_password'
                placeholder=' '
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                className={`splash-input`}
                maxLength={255}
              ></input>
              <span className='mid-span-input'>confirm password</span>
            </label>
            <div style={{ position: 'absolute' }}>
              <i className={`fa-solid fa-circle-check ${repeatPasswordValid}`} style={{ position: 'relative', left: '290px', top: '18px' }}></i>
            </div>
          </div>

          <button
            type='submit'
            className={`sign-up-btn form-btn ${signUpDisabled}`}
            disabled={signUpDisabled === 'btn-disabled'}
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
