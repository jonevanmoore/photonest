import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllComments } from "../../store/comment"
import { fetchAllPosts } from "../../store/post"
import DisplayPost from '../Post/DisplayPost'
import './Home.css'


const Home = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const posts = Object.values(useSelector(state => state.posts)).reverse()
    const comments = Object.values(useSelector(state => state.comments))

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [dispatch])

    return (
        <div className="home-page-div" >
            <div className="posts-suggestions-div" style={{ marginRight: '150px' }}>
                <div className="posts-div" style={{ marginTop: '90px' }}>
                    {posts.map(post => (
                        <DisplayPost post={post} key={post.id} comments={comments} />
                    ))}
                </div>
                <div className="suggestions-div" style={{ marginTop: '100px', position: 'fixed' }}>
                    <div className="suggestions-scroll-div" style={{ display: 'flex', paddingLeft: '50px' }}>
                        <div>
                            <img src={sessionUser.profile_image} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                        </div>
                        <div style={{ paddingLeft: '10px', marginTop: '5px' }}>
                            <div style={{ maxWidth: '100px' }}>
                                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{sessionUser.username}</span>
                            </div>
                            <div className="full-name" style={{ maxWidth: '100px' }}>
                                <span style={{ fontSize: '12px', float: 'left', color: 'gray', overflowY: 'break-line' }}>{`${sessionUser.first_name} ${sessionUser.last_name}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
