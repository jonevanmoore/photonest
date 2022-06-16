import { useState } from "react"
import { editUser } from "../store/user"
import { Redirect, Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import './EditUser.css'

const EditUser = ({ sessionUser }) => {
    const userId = sessionUser?.id

    const dispatch = useDispatch()
    const history = useHistory()

    const [imgPreview, setImgPreview] = useState('')
    const [newImage, setNewImage] = useState(sessionUser?.profile_image)
    const [formerUsername, setFormerUsername] = useState(sessionUser?.username)
    const [formerFirst, setFormerFirst] = useState(sessionUser?.first_name)
    const [formerLast, setFormerLast] = useState(sessionUser?.last_name)
    const [formerBio, setFormerBio] = useState(sessionUser?.bio)
    const [imageLoading, setImageLoading] = useState(false)

    const setImages = (e) => {
        setImgPreview(e)
        setNewImage(e)
    }


    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("username", formerUsername);
        formData.append("first_name", formerFirst);
        formData.append("last_name", formerLast);
        formData.append("bio", formerBio);

        setImageLoading(true);

        if (await dispatch(editUser(formData, userId))) {
        } else {
            setImageLoading(false);
        }
        // history.push('/')
    }

    return (
        <div
            style={{ backgroundColor: 'white' }}
            className='edit-body'
        >
            <div style={{ display: 'flex' }}>
                {!imgPreview && (
                    <img src={sessionUser?.profile_image} style={{ borderRadius: '50%', width: '100px', height: '100px', marginTop: '80px' }} />
                )}
                {imgPreview && (
                    <img src={URL.createObjectURL(imgPreview)} style={{ borderRadius: '50%', width: '100px', height: '100px', marginTop: '80px' }} />
                )}
                <label className="img-file" style={{ marginTop: '100px' }}>
                    <label htmlFor='img-upload'>Update profile pic</label>
                    <input
                        type='file'
                        onChange={e => setImages(e.target.files[0])}
                        accept="image/*"
                        placeholder='Enter your URL image'
                        id='img-upload'
                        name='img-upload'
                        required
                        hidden

                    />
                </label>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Username</label>
                    <input
                        value={formerUsername}
                        onChange={e => setFormerUsername(e.target.value)}></input>

                    <label>First Name</label>
                    <input
                        value={formerFirst}
                        onChange={e => setFormerFirst(e.target.value)}
                    ></input>
                    <label>Last Name</label>
                    <input
                        value={formerLast}
                        onChange={e => setFormerLast(e.target.value)}
                    ></input>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Bio</label>
                    <textarea
                        value={formerBio}
                        onChange={e => setFormerBio(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <button onClick={handleUpdate}>Update</button>
            <Link to='/'>cancel</Link>
        </div>
    )
}

export default EditUser;
