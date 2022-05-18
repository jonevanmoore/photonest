
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Modal from './Modal/Modal';
import NewPost from './Post/NewPost';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const userId = sessionUser.id
  const [showModal, setShowModal] = useState(false);
  const closeModalFunc = () => setShowModal(false);
  const showModalFunc = () => setShowModal(true);

  const stopTheProp = e => e.stopPropagation();

  return (
    <nav className='navbar'>
      <div className='left-side-nav'>
        <NavLink to='/' exact={true} className='active photonest-nav-label'>photonest</NavLink>
      </div>
      <div className='right-side-nav'>
        <NavLink to='/'><i className="fa-solid fa-house-chimney fa-navbar"></i></NavLink>
        <span onClick={showModalFunc}><i className="fa-solid fa-square-plus fa-navbar"></i></span>
        <NavLink to={`/${sessionUser.username}`}><i className="fa-solid fa-user fa-navbar"></i></NavLink>
        <LogoutButton />
      </div>

      {showModal && (
        <Modal closeModalFunc={closeModalFunc}>
          <div
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              animation: 'animation: slideIn .5s, fadeIn .1s',
            }}>
            <NewPost closeModalFunc={closeModalFunc} />
          </div>
        </Modal>
      )
      }
    </nav >
  );
}

export default NavBar;
