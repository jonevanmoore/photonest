import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postCreate } from "../../store/post"

const NewPost = ({ closeModalFunc }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [postImage, setPostImage] = useState('')
    const [caption, setCaption] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post = {
            post_image: postImage,
            caption,
            user_id: userId
        }
        const data = await dispatch(postCreate(post))
        if (data) {
            console.log("caught it")
        } else {
            console.log(":(")
        }
        history.push('/')
        closeModalFunc()
    }



    const stopTheProp = e => e.stopPropagation();

    return (
        <div>
            {postImage && (
                <>
                    <img src={postImage} style={{ width: '200px' }} alt='preview' id='image-preview' />
                </>
            )}
            <input
                type='text'
                onChange={e => setPostImage(e.target.value)}
                required
            />

            <textarea
                type="text"
                placeholder="Fill out your caption"
                onChange={e => setCaption(e.target.value)}
                maxLength={200}>
            </textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default NewPost
