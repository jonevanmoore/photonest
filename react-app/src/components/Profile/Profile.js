import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllPosts } from "../../store/post";
import { fetchUser } from "../../store/user";
import './Profile.css'

const Profile = () => {
    const { username } = useParams()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state?.session?.user)

    const user = useSelector(state => state?.users)

    const posts = Object.values(useSelector(state => state?.posts))
    const userPosts = posts.filter(post => post?.username === user.username)

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchUser(username))
    }, [dispatch])

    return (
        <div className="profile-body" style={{ paddingLeft: '25vh', paddingRight: '25vh' }}>
            <div className="info-and-pics-div">
                <div className="user-info-div" style={{ display: 'flex', justifyContent: 'center', }}>
                    <div style={{ marginTop: '80px', display: 'flex' }}>
                        <div className="profile-pic-div" >
                            <img src={user?.profile_image} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        </div>
                        <div className="profile-info">
                            <div>
                                <span style={{ fontSize: '20px', float: 'left' }}>{user?.username}</span>
                                {sessionUser?.id === user?.id && (
                                    <Link to='edit_info'>Edit Profile</Link>
                                )}
                            </div>
                            <div className="follow-info" style={{ display: 'flex', float: 'left' }}>
                                <span>{userPosts?.length} posts</span>
                            </div>
                        </div>
                        <div>
                            <span>{sessionUser?.bio}</span>
                        </div>
                    </div>
                </div>
                <div className="img-gallery" >
                    {userPosts.map(post => (
                        <img src={post?.post_image} key={post?.id} style={{ width: '293px', height: '293px', margin: '5px', float: 'left' }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
