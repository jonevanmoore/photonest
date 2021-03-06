import { Link } from "react-router-dom";
import { fetchUsers } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'

const DisplayUserInfo = ({ sessionUser, showModal }) => {
    // const dispatch = useDispatch()

    // const users = Object.values(useSelector(state => state.users))

    // let userArr = [];
    // users.forEach(user => {
    //     if (user?.username === sessionUser?.username) {
    //         userArr.push(user)
    //     }
    // })

    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [dispatch])

    return (
        <>
            <div>
                <Link to={sessionUser.username}>
                    <img src={sessionUser?.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                </Link>
            </div>
            <div style={{ paddingLeft: '10px', marginTop: '5px' }}>
                <div style={{ maxWidth: '100px' }}>
                    <Link to={sessionUser.username} style={{ fontSize: '15px', fontWeight: 'bold', float: 'left', textDecoration: 'none', color: 'black' }}>{sessionUser.username}</Link>
                </div>
                <div className="full-name" style={{ maxWidth: '100px' }}>
                    <span style={{ fontSize: '12px', float: 'left', color: 'gray', overflowY: 'break-line' }}>{`${sessionUser.first_name} ${sessionUser.last_name}`}</span>
                    <Link to='/edit_info' style={{ fontSize: '10px', float: 'left', cursor: 'pointer', textDecoration: 'none', color: 'blue' }} onClick={showModal}>edit user info</Link>
                </div>
            </div>
        </>
    )
}

export default DisplayUserInfo;
