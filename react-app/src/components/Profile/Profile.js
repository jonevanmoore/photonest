import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllPosts } from "../../store/post";
import { fetchUsers } from "../../store/user";
import { followUnfollow, loadfollowers } from "../../store/follow";
import { loadfollowing } from "../../store/following";
import './Profile.css'

const Profile = () => {
    const { username } = useParams()

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state?.session?.user)

    const users = Object.values(useSelector(state => state?.users))
    const profileUser = users.filter(user => user?.username === username)[0]

    const posts = Object.values(useSelector(state => state?.posts))
    const userPosts = posts.filter(post => post?.user_id === profileUser?.id)

    const followers = Object.values(useSelector(state => state.follows))
    const following = Object.values(useSelector(state => state.followings))
    console.log(following)

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchUsers())
        dispatch(loadfollowers(profileUser?.id))
        dispatch(loadfollowing(profileUser?.id))
    }, [dispatch])


    const updateFollowStatus = async () => {
        await dispatch(followUnfollow(profileUser?.id))
    }

    return (
        <div className="profile-body" style={{ paddingLeft: '25vh', paddingRight: '25vh' }}>
            <div className="info-and-pics-div">
                <div className="user-info-div" style={{ display: 'flex', justifyContent: 'center', }}>
                    <div style={{ marginTop: '80px', display: 'flex' }}>
                        <div className="profile-pic-div" >
                            <img src={profileUser?.profile_image} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        </div>
                        <div className="profile-info">
                            <div>
                                <span style={{ fontSize: '20px', float: 'left' }}>{profileUser?.username}</span>
                                {sessionUser?.id === profileUser?.id && (
                                    <button>Edit Profile</button>
                                )}
                                {sessionUser?.id !== profileUser?.id && (
                                    <button onClick={updateFollowStatus}>Following</button>
                                )}
                            </div>
                            <div className="follow-info" style={{ display: 'flex', float: 'left' }}>
                                <span>{userPosts?.length} posts</span>
                                <span>{`${followers.length} followers`}</span>
                                <span>{`${following.length} following`}</span>
                            </div>
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
