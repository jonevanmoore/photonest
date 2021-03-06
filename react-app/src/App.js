import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage/SplashPage'
import { authenticate } from './store/session';
import { Redirect } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import EditUser from './components/EditUser';

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
      {/* {sessionUser && (<NavBar />)} */}
      <Switch>
        <Route path='/' exact={true} >
          {sessionUser && (<NavBar />)}
          <SplashPage />
        </Route>
        <Route path='/edit_info'>
          {sessionUser && (<NavBar />)}
          {sessionUser ? <EditUser sessionUser={sessionUser} /> : <Redirect to='/' />}
        </Route>
        <Route path='/:username'>
          {sessionUser ? <Profile /> : <Redirect to='/' />}
        </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
      <About />
    </BrowserRouter>
  );
}

export default App;
