
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='left-side-nav'>
        <NavLink to='/' exact={true} className='active photonest-nav-label'>photonest</NavLink>
      </div>
      <div className='right-side-nav'>
        <NavLink to='/'>home</NavLink>
        <NavLink to='/new_post'>post</NavLink>
        profile
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
