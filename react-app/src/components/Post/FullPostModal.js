import { useSelector } from "react-redux"
import { useState } from 'react'
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import Modal from "../Modal/Modal";
import LikesModal from "../Modal/LikesModal";
import './FullPostModal.css'


const FullPostModal = ({ stopTheProp, closeModalFunc, post, comments, postId, createComment, showModalFunc, showModal, Modal, deletePost, setCaptionDisplay, showEditCaption, editCaptionDisplay, captionDisplay, setEditedCaption, editedCaption, closeEditCaption, handleUpdate, newComment, setNewComment, postDisabled, sessionUserLikes, updateLikePost, postLikes }) => {

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))

    const user = useSelector(state => state.users[post.user_id])

    const [likesDisplay, setLikesDisplay] = useState(false)

    const showLikesModal = () => setLikesDisplay(true)
    const closeLikesModal = () => setLikesDisplay(false)



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
                    {users.map((user, i) => {
                        if (user.id === post.user_id) {
                            return (
                                <div className="top-display" key={i}>
                                    <div className="pp-and-username">
                                        <div>
                                            <span style={{ cursor: 'text' }} className='img-link'>
                                                <img src={user.profile_image} key={user.id} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                                            </span>
                                        </div>
                                        <div>
                                            <Link to={user.username} style={{ marginLeft: '-5px' }} className='username-modal-display'>{user.username}</Link>
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
                            <span style={{ cursor: 'text' }} className='img-link'>
                                <img src={user.profile_image} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                            </span>
                            <div className='caption-display' style={{ marginTop: '7px', display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <span className="caption-text" style={{ marginLeft: '-5px' }}><Link to={user.username} className="username-on-caption">{user.username}</Link>{`${post.caption}`}</span>
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
                                post={post}
                            />
                        )
                    })}
                </div>
                <div className="like-section-bottom-div" style={{ height: '11vh' }}>
                    <div className="icon-caption-div">
                        <div className="edit-cap-div">
                            <div className="icon-btns">
                                <i className={`fa-solid fa-heart ${sessionUserLikes}`} onClick={updateLikePost}></i>
                            </div>
                            {postLikes?.length === 1 && (
                                <div>
                                    <span style={{ float: 'left', marginLeft: '10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: 'var(--blue-theme)', transition: '.2s', cursor: 'pointer' }} onClick={showLikesModal}>{`${postLikes?.length} like`}</span>
                                </div>
                            )}
                            {postLikes?.length > 1 && (
                                <div>
                                    <span style={{ float: 'left', marginLeft: '10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: 'var(--blue-theme)', transition: '.2s', cursor: 'pointer' }} onClick={showLikesModal}>{`${postLikes?.length} likes`}</span>
                                </div>
                            )}
                            {likesDisplay && (
                                <Modal closeModalFunc={closeLikesModal}>
                                    <LikesModal closeLikesModal={closeLikesModal} stopTheProp={stopTheProp} likes={postLikes} />
                                </Modal>
                            )}
                            <div>
                                <span style={{
                                    fontSize: '14px',
                                    color: 'gray',
                                    float: 'left',
                                    marginBottom: '13px',
                                    paddingLeft: '10px',
                                    cursor: 'text'
                                }}
                                >{post.created_at.slice(0, 17)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="leave-comment-div" style={{ borderTop: '1px solid lightgray' }}>
                    <div className="leave-com-input-div">
                        <input
                            value={newComment}
                            placeholder="Add a comment..."
                            maxLength={200}
                            className='leave-com-input'
                            onChange={e => setNewComment(e.target.value)}
                            style={{ marginTop: '5px' }}
                        >
                        </input>
                        <button
                            disabled={newComment.length < 1}
                            className={`${postDisabled} post-comment-btn`}
                            onClick={createComment}
                        >Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullPostModal;
