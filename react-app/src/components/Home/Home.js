import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllComments } from "../../store/comment"
import { fetchAllPosts } from "../../store/post"
import { editUser } from "../../store/user"
import DisplayPost from '../Post/DisplayPost'
import DisplayUserInfo from "../Post/DisplayUserInfo"
import Modal from "../Modal/Modal"
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
                        <DisplayUserInfo sessionUser={sessionUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
