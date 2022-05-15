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

    const [image, setImage] = useState('')
    const [caption, setCaption] = useState('')
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);

        setImageLoading(true);

        if (await dispatch(postCreate(formData, userId))) {
        } else {
            setImageLoading(false);
        }
        closeModalFunc()
    }


    return (
        <div className="new-post-div" style={{ border: '1px solid white' }}>
            <div className="img-preview">
                {!image && (
                    <div className="img-preview">
                        <img src='https://www.wolflair.com/wp-content/uploads/2017/02/placeholder.jpg' style={{ maxWidth: '400px' }} alt='preview' id='image-preview' />
                    </div>

                )}
                {image && (
                    <>
                        <img src={URL.createObjectURL(image)} style={{ maxHeight: '500px', maxWidth: '600px' }} alt='preview' id='image-preview' />
                        {/* <span>{accepted}</span> */}
                    </>
                )}
            </div>
            <div className="img-upload">
                <label className="img-file">
                    <label htmlFor='img-upload' id='select-file-button'>Select from computer...</label>
                    <input
                        type='file'
                        onChange={e => setImage(e.target.files[0])}
                        accept="image/*"
                        placeholder='Enter your URL image'
                        id='img-upload'
                        name='img-upload'
                        required
                        hidden
                    />
                </label>
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
                    <span style={{ float: 'left', marginLeft: '10px', fontSize: '12px' }}>{`${caption.length}/200`}</span>
                </div>
            </div>
            <div className="new-post-btn-div">
                <button onClick={handleSubmit} className="new-post-btn login-btn">Submit</button>
            </div>
        </div>
    )
}

export default NewPost
