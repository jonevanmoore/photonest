import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllPosts } from "../../store/post";
import { fetchUsers } from "../../store/user";
import './Profile.css'

const Profile = () => {
    const { username } = useParams()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))
    const profileUser = users.filter(user => user.username === username)[0]
    const posts = Object.values(useSelector(state => state.posts))
    const userPosts = posts.filter(post => post.user_id === profileUser.id)

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className="profile-body" style={{ paddingLeft: '25vh', paddingRight: '25vh' }}>
            <div className="info-and-pics-div">
                <div className="user-info-div" style={{ display: 'flex', justifyContent: 'center', }}>
                    <div style={{ marginTop: '80px', display: 'flex' }}>
                        <div className="profile-pic-div" >
                            <img src={profileUser.profile_image} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        </div>
                        <div className="profile-info">
                            <div>
                                <span style={{ fontSize: '20px', float: 'left' }}>{profileUser.username}</span>
                                {sessionUser.id === profileUser.id && (
                                    <button>Edit Profile</button>
                                )}
                                {sessionUser.id !== profileUser.id && (
                                    <button>Following</button>
                                )}
                            </div>
                            <div className="follow-info" style={{ display: 'flex', float: 'left' }}>
                                <span>{userPosts.length} posts</span>
                                <span>1000 followers</span>
                                <span>1000 followers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-gallery" >
                    {userPosts.map(post => (
                        <img src={post.post_image} key={post.id} style={{ width: '293px', height: '293px', margin: '5px', float: 'left' }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
