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
        history.push('/')
    }

    return (
        <div
            style={{ backgroundColor: 'white' }}
            className='edit-body'
        >
            <div className="form-body">

                <div className="update-pic">
                    {!imgPreview && (
                        <div>
                            <img src={sessionUser?.profile_image} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                        </div>
                    )}
                    {imgPreview && (
                        <div>
                            <img src={URL.createObjectURL(imgPreview)} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                        </div>
                    )}
                    <label className="img-file">
                        <label htmlFor='img-upload' className="update-pic-btn">Update Profile Picture</label>
                        <input
                            type='file'
                            onChange={e => setImages(e.target.files[0])}
                            accept="image/jpg, image/png, image/jpeg, image/gif"
                            placeholder='Enter your URL image'
                            id='img-upload'
                            name='img-upload'
                            required
                            hidden

                        />
                    </label>
                </div>
                <div style={{ display: 'flex' }} className="info-inputs">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <label className="info-label">Username</label>
                        </div>
                        <input
                            className="edit-input"
                            value={formerUsername}
                            onChange={e => setFormerUsername(e.target.value)}></input>
                        <div>
                            <label className="info-label">First Name</label>
                        </div>
                        <input
                            className="edit-input"
                            value={formerFirst}
                            onChange={e => setFormerFirst(e.target.value)}
                        ></input>
                        <div>
                            <label className="info-label">Last Name</label>
                        </div>
                        <input
                            className="edit-input"
                            value={formerLast}
                            onChange={e => setFormerLast(e.target.value)}
                        ></input>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <label className="info-label">Bio</label>
                            </div>
                            <textarea
                                className="edit-input edit-bio"
                                value={formerBio}
                                onChange={e => setFormerBio(e.target.value)}
                                maxLength={200}
                            >
                            </textarea>
                            <div>
                                <label style={{ float: 'left', color: 'gray' }}>{`${formerBio.length}/200`}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                    <label onClick={handleUpdate} className="update-pic-btn">Update</label>
                    <Link to='/' style={{ textDecoration: 'none', color: 'gray' }}>cancel</Link>
                </div>
            </div>
        </div>
    )
}

export default EditUser;
