import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postCreate } from "../../store/post"
import './NewPost.css'

const NewPost = ({ closeModalFunc }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState('')
    const userId = sessionUser.id
    const [image, setImage] = useState('')
    const [caption, setCaption] = useState('')
    const [imageLoading, setImageLoading] = useState(false);
    const [custError, setCustError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);

        setImageLoading(true);

        const data = await dispatch(postCreate(formData, userId))
        if (data.status === 200) {
            setImageLoading(true)
            closeModalFunc()
        }
        else {
            setCustError('Image file not supported')
            setImage('')
            setImageLoading(false);
        }
    }

    useEffect(() => {
        if (image.type === ("image/svg+xml" || "image/webp" || "image/avif" || "image/apng")) {
            setImage('')
            setCustError('Image file not supported')
        }
    })

    const displayError = () => {
        setCustError('Please provide an image')
    }

    const setTheImage = (e) => {
        setCustError('')
        setImage(e.target.files[0])
    }

    return (
        <div className="new-post-div" style={{ border: '1px solid white' }}>
            <span style={{ color: 'white', borderBottom: '1px lightgray solid', padding: '10px', fontWeight: 'bold' }}>Create new post</span>
            <div className="img-preview">
                {!image && (
                    <div className="img-preview">
                        <img src='https://myphotonestbucket.s3.amazonaws.com/cdfce7339ee14eb08d01803527adb774.jpeg' style={{ width: '400px', height: '45vh' }} alt='preview' id='image-preview' />
                    </div>
                )}
                {image && (
                    <>
                        <img src={URL.createObjectURL(image)} alt='preview' id='actual-image-preview' />
                    </>
                )}
            </div>
            <div className="img-upload">
                <label className="img-file">
                    <label htmlFor='img-upload' id='select-file-button'>Select from computer...</label>
                    <input
                        type='file'
                        onChange={setTheImage}
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
                    <span style={{ float: 'left', marginLeft: '10px', fontSize: '12px', color: 'white' }}>{`${caption.length}/200`}</span>
                </div>
            </div>
            <div className="new-post-btn-div">
                {!image && (
                    <button onClick={displayError} className="new-post-btn btn-disabled" style={{ fontSize: '15px', fontFamily: 'Raleway' }}>Submit</button>
                )}
                {image && (
                    <button onClick={handleSubmit} className="new-post-btn">Submit</button>
                )}
                {(imageLoading) && <p style={{ color: 'white', position: 'relative', bottom: '10px' }}>Loading...</p>}
            </div>
            <span style={{ color: 'red', position: 'relative', bottom: '10px' }}>{custError}</span>
        </div>
    )
}

export default NewPost
