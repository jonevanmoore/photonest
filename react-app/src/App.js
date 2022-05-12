import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Home from './components/Home/Home'
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SplashPage from './components/SplashPage/SplashPage'
import NewPost from './components/Post/NewPost';
import { authenticate } from './store/session';
import { Redirect } from 'react-router-dom';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser && (<NavBar />)}
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/users' exact={true} >
          {sessionUser ? <UsersList /> : <Redirect to='/' />}
        </Route>
        <Route path='/new_post'>
          {sessionUser ? <NewPost /> : <Redirect to='/' />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
