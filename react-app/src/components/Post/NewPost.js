import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postCreate } from "../../store/post"

const NewPost = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const [postImage, setPostImage] = useState('')
    const [caption, setCaption] = useState('')
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        const formData = new FormData()
        formData.append("post_image", postImage)
        formData.append("caption", caption)

        setImageLoading(true)
        const data = await dispatch(postCreate(formData, userId))
        if (data) {
            console.log(postImage)
        } else {
            setImageLoading(false);
            console.log(":(")
        }
    }

    return (
        <div>
            {postImage && (
                <>
                    <img src={URL.createObjectURL(postImage)} style={{ width: '200px' }} alt='preview' id='image-preview' />
                </>

            )}

            <input
                type='file'
                accept='image/*'
                onChange={e => setPostImage(e.target.files[0])}
                required />

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
