import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { Link } from "react-router-dom"
import Comment from "../Comment/Comment";
import './FullPostModal.css'

const FullPostModal = ({ stopTheProp, closeModalFunc, post, comments, postId, createComment, showModalFunc, showModal, Modal, deletePost, setCaptionDisplay, showEditCaption, editCaptionDisplay, captionDisplay, setEditedCaption, editedCaption, closeEditCaption, handleUpdate }) => {

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))

    const user = useSelector(state => state.users[post.user_id])


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
                                                <span style={{ marginLeft: '-5px' }}>{user.username}</span>
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
                <div className="comment-section-div">
                    {post.caption && captionDisplay && (
                        <div style={{ display: 'flex', marginLeft: '10px', marginTop: '10px' }}>
                            <Link to={`/${user.username}`} className='img-link'>
                                <img src={user.profile_image} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                            </Link>
                            <div className='caption-display' style={{ marginTop: '7px', display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <span className="caption-text" style={{ marginLeft: '-5px' }}><Link to={`/${user.username}`} className="username-on-caption">{user.username}</Link>{`${post.caption}`}</span>
                                </div>
                                <div>

                                    {sessionUser.id === post.user_id && captionDisplay && (
                                        <span className="edit-cap-btn" onClick={showEditCaption} style={{ float: 'left' }}>edit caption</span>
                                    )}
                                </div>
                            </div>
                        </div>

                    )}
                    {sessionUser.id === post.user_id && editCaptionDisplay && (
                        <>
                            <div className="edit-post-div">
                                <textarea
                                    value={editedCaption}
                                    onChange={e => setEditedCaption(e.target.value)}
                                    maxLength={200}
                                    className='edit-cap-input-modal'
                                >
                                </textarea>
                                <div className="below-edit-div">
                                    <div className="char-count">
                                        <span>{`${editedCaption.length}/200`}</span>
                                    </div>
                                    <div className="update-btn-divs">
                                        <span onClick={closeEditCaption}>Cancel</span>
                                        <span onClick={handleUpdate}>Update</span>
                                    </div>
                                </div>

                            </div>
                        </>

                    )}

                    {comments.map(comment => {
                        return (
                            <Comment
                                comment={comment}
                                users={users}
                            />
                        )
                    })}
                </div>
                <div className="comment-section-bottom-div">
                    <div className="icon-caption-div">
                        <div className="edit-cap-div">
                            <div className="icon-btns">
                                <i className="fa-solid fa-heart"></i>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FullPostModal;
