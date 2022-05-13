import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postCreate } from "../../store/post"
import './NewPost.css'

const NewPost = ({ closeModalFunc }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [postImage, setPostImage] = useState('')
    const [accepted, setAccepted] = useState('')
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
        closeModalFunc()
    }


    return (
        <div className="new-post-div" style={{ border: '1px solid white' }}>
            <div className="img-preview">
                {!postImage && (
                    <div className="img-preview">
                        <img src='https://www.wolflair.com/wp-content/uploads/2017/02/placeholder.jpg' style={{ maxWidth: '400px' }} alt='preview' id='image-preview' />
                    </div>

                )}
                {postImage && (
                    <>
                        <img src={postImage} style={{ maxHeight: '500px', maxWidth: '600px' }} alt='preview' id='image-preview' />
                        {/* <span>{accepted}</span> */}
                    </>
                )}
            </div>
            <div className="img-upload">
                <input
                    type='text'
                    onChange={e => setPostImage(e.target.value)}
                    placeholder='Enter your URL image'
                    required
                    className="url-input"
                />
            </div>
            <div className="caption-div">
                <textarea
                    type="text"
                    placeholder="Caption here..."
                    onChange={e => setCaption(e.target.value)}
                    maxLength={200}
                    className="caption-textarea">
                </textarea>
                <div>
                    <span>{`${caption.length}/200`}</span>
                </div>
            </div>
            <div className="new-post-btn-div">
                <button onClick={handleSubmit} className="new-post-btn login-btn">Submit</button>
            </div>
        </div>
    )
}

export default NewPost
