import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Modal from './Modal/Modal';
import NewPost from './Post/NewPost';
import { fetchUsers } from '../store/user';
import { emptySearchThunk, searchResultThunk } from '../store/search';

const NavBar = () => {
  const dispatch = useDispatch()

  const users = Object.values(useSelector(state => state.users))

  const [searchInput, setSearchInput] = useState('')
  const search_user = useSelector(state => state.search.search_results)

  const sessionUser = useSelector(state => state.session.user)
  const username = sessionUser?.username
  const [showModal, setShowModal] = useState(false);
  const closeModalFunc = () => setShowModal(false);
  const showModalFunc = () => setShowModal(true);

  const stopTheProp = e => e.stopPropagation();

  useEffect(() => {
    dispatch(fetchUsers)
  }, [dispatch])

  useEffect(() => {
    if (searchInput) {
      dispatch(searchResultThunk(searchInput))
    } else {
      dispatch(emptySearchThunk())
    }
  }, [dispatch, searchInput])

  return (
    <nav className='navbar' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='left-side-nav'>
        <NavLink to='/' exact={true} className='active photonest-nav-label'>photonest</NavLink>
      </div>

      <div>
        <div className="navBar__searchBar">
          <div className="navBar__searchInput">
            <input
              onChange={e => setSearchInput(e.target.value)}
              value={searchInput}
              className='search-bar'
              placeholder='Search users'
            ></input>
          </div>
        </div>

        {search_user?.length > 0 &&
          <div className="navBar__searchResults">
            {search_user?.map(user => (
              <NavLink to={user?.username} onClick={() => setSearchInput('')}>
                <ul className='navBar__users'>
                  <div className="navBar__imageContainer">
                    {user?.profile_image ?
                      <img className='navBar__profilePic' src={user?.profile_image} alt='profile_image' /> :
                      <div className="navBar__defaultPic">{user?.username[0]}</div>
                    }
                  </div>
                  <div className="navBar__user">
                    <h5 className="navBar__fullName">
                      {`${user?.first_name} ${user?.last_name}`}
                    </h5>
                    <h5>
                      {user?.username}
                    </h5>
                  </div>
                </ul>
              </NavLink>
            ))}
          </div>
        }
      </div>


      {/* <div className='middle-nav'>
        <div className='search-div'>
          <input className='search-bar'
            placeholder='Search users'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}></input>
        </div>
      </div> */}
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
