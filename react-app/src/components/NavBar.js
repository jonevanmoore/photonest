
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Modal from './Modal/Modal';
import NewPost from './Post/NewPost';

const NavBar = () => {

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
        <NavLink to='/'><i className="fa-solid fa-house-chimney"></i></NavLink>
        <span onClick={showModalFunc} className='new-post-nav-btn'><i className="fa-solid fa-square-plus"></i></span>
        <NavLink to='/'><i className="fa-solid fa-user"></i></NavLink>
        <LogoutButton />
      </div>

      {showModal && (
        <Modal closeModalFunc={closeModalFunc}>
          <div
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            style={{ backgroundColor: 'white', borderRadius: '10px' }}>
            <NewPost closeModalFunc={closeModalFunc} />
          </div>
        </Modal>
      )
      }
    </nav >
  );
}

export default NavBar;
