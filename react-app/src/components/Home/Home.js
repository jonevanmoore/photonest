import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllPosts } from "../../store/post"


const Home = () => {
    const dispatch = useDispatch()

    const posts = Object.values(useSelector(state => state.posts))
    console.log(posts)

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])

    return (
        <div>
            <h1>HOME</h1>
            {posts.map(post => (
                <img src={post.post_image} style={{ width: '200px' }} alt='preview' id='image-preview' />
            ))}
        </div>
    )
}

export default Home
