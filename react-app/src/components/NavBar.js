
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Modal from './Modal/Modal';
import NewPost from './Post/NewPost';
import { fetchUsers } from '../store/user';

const NavBar = () => {
  const dispatch = useDispatch()

  const users = Object.values(useSelector(state => state.users))

  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const sessionUser = useSelector(state => state.session.user)
  const username = sessionUser?.username
  const [showModal, setShowModal] = useState(false);
  const closeModalFunc = () => setShowModal(false);
  const showModalFunc = () => setShowModal(true);

  const stopTheProp = e => e.stopPropagation();

  // useEffect(() => {
  //   const sUsers = []
  //   users.forEach(user => {
  //     if (searchInput.includes(user.first_name)) {
  //       sUsers.push(user)
  //     }
  //   })
  //   setSearchedUsers(sUsers)
  // }, [searchedUsers, searchInput])

  useEffect(() => {
    dispatch(fetchUsers)
  }, [dispatch])

  return (
    <nav className='navbar' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='left-side-nav'>
        <NavLink to='/' exact={true} className='active photonest-nav-label'>photonest</NavLink>
      </div>
      <div className='middle-nav'>
        <div className='search-div'>
          <input className='search-bar'
            placeholder='Search users'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}></input>
        </div>
      </div>
      <div className='right-side-nav'>
        <span onClick={showModalFunc}><i className="fa-solid fa-circle-plus fa-navbar"></i></span>
        <NavLink to='/'><i className="fa-solid fa-house-chimney fa-navbar"></i></NavLink>
        <NavLink to={`/${username}`}><i className="fa-solid fa-user fa-navbar"></i></NavLink>
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
