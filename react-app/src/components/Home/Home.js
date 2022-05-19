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
    const userId = sessionUser?.id

    const posts = Object.values(useSelector(state => state.posts)).reverse()
    const comments = Object.values(useSelector(state => state.comments))

    const [imgPreview, setImgPreview] = useState('')
    const [newImage, setNewImage] = useState(sessionUser?.profile_image)
    const [formerUsername, setFormerUsername] = useState(sessionUser?.username)
    const [formerFirst, setFormerFirst] = useState(sessionUser?.first_name)
    const [formerLast, setFormerLast] = useState(sessionUser?.last_name)
    const [imageLoading, setImageLoading] = useState(false)

    const setImages = (e) => {
        setImgPreview(e)
        setNewImage(e)
    }

    const [modalDisplay, setModalDisplay] = useState(false)
    const showModal = () => setModalDisplay(true)
    const closeModal = () => setModalDisplay(false)
    const stopTheProp = e => e.stopPropagation();

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
    }, [dispatch])

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("username", formerUsername)
        formData.append("first_name", formerFirst);
        formData.append("last_name", formerLast);

        setImageLoading(true);

        if (await dispatch(editUser(formData, userId))) {
        } else {
            setImageLoading(false);
        }
        closeModal()
    }

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
                        <DisplayUserInfo sessionUser={sessionUser} showModal={showModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
