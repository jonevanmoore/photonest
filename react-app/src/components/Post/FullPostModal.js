import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import './FullPostModal.css'

const FullPostModal = ({ stopTheProp, closeModalFunc, post, comments, postId, createComment, showModalFunc, showModal, Modal, deletePost }) => {

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))



    return (
        <div
            className='full-post-body'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <div className='img-left' >
                <div className="img-left-div">
                    <img src={post.post_image} style={{ maxWidth: '55vw', maxHeight: '95vh' }} />
                </div>
            </div>
            <div className='img-info-right'>
                <div className='username-top'>
                    {users.map(user => {
                        if (user.id === post.user_id) {
                            return (
                                <div className="top-display">
                                    <div className="pp-and-username">
                                        <div>
                                            <Link to={`/${user.username}`} className='img-link'>
                                                <img src={user.profile_image} key={user.id} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                                            </Link>
                                        </div>
                                        <div>

                                            <Link to={`/${user.username}`} className='username-modal-display'>
                                                <span>{user.username}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* DELETE POST MODAL */}
                                    {sessionUser.id === post.user_id && (
                                        < div className="delete-post-div">
                                            <span onClick={showModalFunc}><i className="fa-solid fa-trash fa-trash-modal"></i></span>
                                            {showModal && (
                                                <Modal closeModalFunc={closeModalFunc}>
                                                    <div className="delete-confirmation-div"
                                                        onClick={stopTheProp}
                                                        onMouseDown={stopTheProp}
                                                        style={{ display: 'flex' }}
                                                    >
                                                        <img src={`${post.post_image}`} style={{ border: '1px solid white', maxWidth: '300px' }} />
                                                        <div className='confirmation-action-div' style={{ padding: '10px', borderRadius: '10px' }}>
                                                            <div>
                                                                <span>Are you sure you want to delete this post?</span>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <button onClick={deletePost} className='delete-btn'>Delete</button>
                                                                <button onClick={closeModalFunc} className='cancel-btn'>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            )}
                                        </div>
                                    )
                                    }
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default FullPostModal;
