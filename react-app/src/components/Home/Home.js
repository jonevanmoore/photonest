import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPosts } from "../../store/post"
import EditPost from '../Post/EditPost'
import './Home.css'


const Home = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const posts = Object.values(useSelector(state => state.posts))

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])

    return (
        <div className="home-page-div">
            <div className="posts-suggestions-div">

                <div className="posts-div">
                    {posts.map(post => (
                        <EditPost post={post} key={post.id} />

                    ))}
                </div>
                <div className="suggestions-div">
                    <span>suggestions for you</span>
                </div>
            </div>
        </div>
    )
}

export default Home
