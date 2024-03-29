import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../store/post";
import { fetchUser } from "../../store/user";
import { followUnfollow, loadfollowers } from "../../store/follow";
import { loadfollowing } from "../../store/following";
import NavBar from "../NavBar";
import './Profile.css'

const Profile = () => {
    const { username } = useParams()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state?.session?.user)

    const user = useSelector(state => state?.users)
    const userId = user?.id

    const posts = Object.values(useSelector(state => state?.posts))
    const userPosts = posts.filter(post => post?.username === user.username)
    const [modalDisplay, setModalDisplay] = useState(false)

    const userFollowers = Object.values(useSelector(state => state?.follows))
    const userFollowings = Object.values(useSelector(state => state?.following))

    const [showFollow, setShowFollow] = useState(false)
    const [unfollowButton, setUnfollowButton] = useState(false)
    const [showFollowersList, setShowFollowersList] = useState(false)
    const [showFollowingList, setShowFollowingList] = useState(false)

    const modalDisplayFunc = () => {
        if (modalDisplay === false) {
            setModalDisplay(true)
        } else {
            setModalDisplay(false)
        }
    }

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchUser(username))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadfollowers(userId))
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(loadfollowing(userId))
    }, [userId, dispatch])

    const followHandler = async (e) => {
        e.preventDefault();
        const followeeId = +e.currentTarget.id;
        await dispatch(followUnfollow(followeeId))
        if (unfollowButton === true) {
            setUnfollowButton(false)
        } else {
            setUnfollowButton(true)
        }
    }

    return (
        <>
            <div className="desktop-el">
                <NavBar />
            </div>
            <div className="mobile-el">
                <nav className='navbar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='profile-label-div'>
                        <span className='active photonest-nav-label-profile'>{username}</span>
                    </div>
                </nav >
            </div>
            <div className="profile-body">
                <div className="info-and-pics-div">
                    <div className="user-info-div" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ marginTop: '80px', display: 'flex' }}>
                            <div className="profile-pic-div" >
                                <img src={user?.profile_image} className='profile-pic' />
                            </div>
                            <div className="profile-pic-info-mobile">
                                <div className="mob-pic-follow-info">
                                    <img src={user?.profile_image} className='profile-pic' />
                                    <div className="follow-info-mob" style={{ display: 'flex', float: 'left' }}>
                                        <div className="mob-info">
                                            <span id="num-info">{userPosts?.length}</span>
                                            <span>posts</span>
                                        </div>
                                        <div className="mob-info">
                                            <span id="num-info">*</span>
                                            <span>followers</span>
                                        </div>
                                        <div className="mob-info">
                                            <span id="num-info">*</span>
                                            <span>following</span>
                                        </div>
                                    </div>
                                    <div className="follow-button-div">
                                        <button>follow</button>
                                    </div>
                                </div>
                                <span className="mobile-el mobile-name">{`${user?.first_name} ${user?.last_name}`}</span>
                                <span className="mobile-el mobile-bio">{user?.bio}</span>
                                <div style={{ marginBottom: '10px' }}>
                                    {sessionUser?.id === user?.id && (
                                        <Link to='edit_info' className="edit-profile-btn-mobile">Edit Profile</Link>
                                    )}
                                    {sessionUser?.id !== userId && (
                                        <Link to='edit_info' className="edit-profile-btn-mobile">Follow</Link>
                                    )}
                                </div>
                            </div>
                            <div className="profile-info">
                                <div>
                                    <span style={{ fontSize: '20px', float: 'left' }}>{user?.username}</span>
                                    {sessionUser?.id === user?.id && (
                                        <Link to='edit_info' className="edit-profile-btn">Edit Profile</Link>
                                    )}
                                </div>
                                <div className="follow-info" style={{ display: 'flex', float: 'left' }}>
                                    <span>{userPosts?.length} posts</span>
                                    <span>* followers</span>
                                    <span>* following</span>
                                    {sessionUser?.id !== userId && (
                                        <div>
                                            <button>Follow</button>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <span style={{ fontWeight: 'bold', float: 'left' }} className='desktop-el'>{`${user?.first_name} ${user?.last_name}`}</span>
                                    </div>
                                    <div>
                                        <span style={{ float: 'left', maxWidth: '30vw', textAlign: 'left' }} className='desktop-el'>{user?.bio}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="img-gallery">
                        {userPosts.map(post => (
                            <>
                                <img src={post?.post_image} key={post?.id} className='indie-img-desktop' />

                                <img src={post?.post_image} key={post?.id} className='indie-img-mobile' />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
