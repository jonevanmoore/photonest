import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { editPost, destroyPost } from "../../store/post"
import { fetchUsers } from "../../store/user"
import Modal from "../Modal/Modal"
import { postComment } from "../../store/comment"
import FullPostModal from "./FullPostModal"
import { updatePostLike, fetchPostLikes } from "../../store/like"

import './DisplayPost.css'

const DisplayPost = ({ post, comments }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id
    const postId = post.id
    const users = Object.values(useSelector(state => state.users))

    const likes = Object.values(useSelector(state => state.likes))
    const postLikes = likes.filter(like => like.post_id === postId)
    const userLiked = postLikes.filter(like => like.user_id === userId).length
    const [sessionUserLikes, setSessionUserLikes] = useState('')

    useEffect(() => {
        if (userLiked > 0) {
            setSessionUserLikes('liked-blue')
        } else {
            setSessionUserLikes('')
        }

    }, [userLiked])

    const postComments = []
    comments.forEach(comment => {
        if (postId === comment.post_id) {
            postComments.push(comment)
        }
    })

    const [editedCaption, setEditedCaption] = useState(post.caption)
    const [newComment, setNewComment] = useState('')
    const [postDisabled, setPostDisabled] = useState('post-disabled')

    const [captionDisplay, setCaptionDisplay] = useState(true)
    const [editCaptionDisplay, setEditCaptionDisplay] = useState(false)
    const closeEditCaption = () => {
        setEditCaptionDisplay(false)
        setCaptionDisplay(true)
        setEditedCaption(post.caption)
    }
    const showEditCaption = () => {
        setEditCaptionDisplay(true)
        setCaptionDisplay(false)
        setEditedCaption(post.caption)
    }


    const [showModal, setShowModal] = useState(false);
    const closeModalFunc = () => setShowModal(false);
    const showModalFunc = () => setShowModal(true);

    const [showFullPostModal, setShowFullPostModal] = useState(false);
    const closeFullPostModalFunc = () => setShowFullPostModal(false);
    const showFullPostModalFunc = () => setShowFullPostModal(true)

    const stopTheProp = e => e.stopPropagation();

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchPostLikes(postId))
    }, [dispatch])

    useEffect(() => {
        if (newComment.length > 0) {
            setPostDisabled('able')
        } else {
            setPostDisabled('post-disabled')
        }
    }, [newComment])

    const handleUpdate = async () => {
        const updatedCaption = {
            id: postId,
            user_id: post.user_id,
            post_image: post.post_image,
            caption: editedCaption
        }
        await dispatch(editPost(updatedCaption))
        closeEditCaption()
    }

    const deletePost = async () => {
        await dispatch(destroyPost(postId))
    }

    const createComment = async () => {
        const commentBody = {
            post_id: postId,
            user_id: sessionUser.id,
            content: newComment
        }

        await dispatch(postComment(commentBody))
        setNewComment('')
    }

    const updateLikePost = async () => {
        await dispatch(updatePostLike(postId))
    }

    //
    function timeSince(date) {

        let seconds = Math.floor((new Date() - date) / 1000);

        //YEARS
        let interval = seconds / 31536000;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + " YEAR AGO";
        }
        if (interval > 1) {
            return Math.floor(interval) + " YEARS AGO";
        }

        //MONTHS
        interval = seconds / 2592000;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + " MONTH AGO";
        }
        if (interval > 1) {
            return Math.floor(interval) + " MONTHS AGO";
        }

        //DAYS
        interval = seconds / 86400;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + " DAY AGO";
        }
        if (interval > 1) {
            return Math.floor(interval) + " DAYS AGO";
        }

        //HOURS
        interval = seconds / 3600;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + " HOUR AGO";
        }
        if (interval > 1) {
            return Math.floor(interval) + " HOURS AGO";
        }

        // MINUTES
        interval = seconds / 60;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + " MINUTE AGO";
        }
        if (interval > 1) {
            return Math.floor(interval) + " MINUTES AGO";
        }

        if (Math.floor(seconds) === 1) {
            return Math.floor(seconds) + " SECOND AGO";
        }
        return Math.floor(seconds) + " SECONDS AGO";
    }

    const data_posted = new Date(post.created_at).toUTCString()
    const [realTime, setRealTime] = useState(timeSince(new Date(data_posted)))

    return (
        <div className="indie-post-div">
            {users.map((user, i) => {
                if (user?.id === post?.user_id) {
                    return (
                        <div className="username-post-display" key={i}>
                            <span className='img-link'>
                                <img src={user?.profile_image} style={{ width: '28px', height: '28px' }} className='profile-pic-home' />
                            </span>
                            <span style={{ cursor: 'text' }} className='username-display'>
                                <span>{user?.username}</span>
                            </span>
                            {/* DELETE POST MODAL */}
                            {sessionUser.id === post.user_id && (
                                < div className="delete-post-div">
                                    <span onClick={showModalFunc}><i className="fa-solid fa-trash"></i></span>
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
                                                        <span style={{ color: 'white' }}>Are you sure you want to delete this post?</span>
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
            <div className="img-div">
                <img key={post.id} src={post.post_image} style={{ maxHeight: '600px', maxWidth: '500px', minWidth: '500px', borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }} alt='preview' />
            </div>
            <div className="icon-caption-div">
                <div className="edit-cap-div">
                    <div className="icon-btns">
                        <i className={`fa-solid fa-heart ${sessionUserLikes}`} onClick={updateLikePost}></i>
                        <i className="fa-solid fa-comment" onClick={showFullPostModalFunc}></i>
                        {sessionUser.id === post.user_id && captionDisplay && (
                            <span className="edit-cap-btn" onClick={showEditCaption}>edit caption</span>
                        )}
                    </div>
                    {postLikes?.length === 1 && (
                        <div>
                            <span style={{ float: 'left', marginLeft: '10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: 'var(--blue-theme)', transition: '.2s' }}>{`${postLikes?.length} like`}</span>
                        </div>
                    )}
                    {postLikes?.length > 1 && (
                        <div>
                            <span style={{ float: 'left', marginLeft: '10px', marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: 'var(--blue-theme)', transition: '.2s' }}>{`${postLikes?.length} likes`}</span>
                        </div>
                    )}

                </div>
                {post.caption && captionDisplay && (
                    <div className='caption-display'>
                        <span className="caption-text"><span style={{ cursor: 'text' }} className="username-on-caption">{users[post.user_id - 1]?.username}</span>{`${post.caption}`}</span>
                    </div>

                )}
                {sessionUser.id === post.user_id && editCaptionDisplay && (
                    <>
                        <div className="edit-post-div">
                            <textarea
                                value={editedCaption}
                                onChange={e => setEditedCaption(e.target.value)}
                                maxLength={200}
                                className='edit-cap-input'
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
            </div>
            <div className="comment-section" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="view-comment-div">

                    {postComments.length === 1 && (
                        <span className="view-comment" onClick={showFullPostModalFunc}>View 1 comment</span>
                    )}
                    {postComments.length > 1 && (
                        <span className="view-comment" onClick={showFullPostModalFunc}>{`View all ${postComments.length} comments`}</span>
                    )}
                </div>
                <div className="created-at-div">
                    <span className="created-at">{realTime}</span>
                </div>
                <div className="leave-comment-div" style={{ borderTop: '1px solid lightgray' }}>
                    <div className="leave-com-input-div">
                        <input
                            value={newComment}
                            placeholder="Add a comment..."
                            maxLength={200}
                            className='leave-com-input'
                            onChange={e => setNewComment(e.target.value)}
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
            {showFullPostModal && (
                <Modal closeModalFunc={closeFullPostModalFunc}>
                    <FullPostModal
                        stopTheProp={stopTheProp}
                        closeModalFunc={closeModalFunc}
                        post={post}
                        comments={postComments}
                        postId={postId}
                        createComment={createComment}
                        showModalFunc={showModalFunc}
                        showModal={showModal}
                        Modal={Modal}
                        deletePost={deletePost}
                        setCaptionDisplay={setCaptionDisplay}
                        showEditCaption={showEditCaption}
                        editCaptionDisplay={editCaptionDisplay}
                        captionDisplay={captionDisplay}
                        setEditedCaption={setEditedCaption}
                        editedCaption={editedCaption}
                        closeEditCaption={closeEditCaption}
                        handleUpdate={handleUpdate}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        postDisabled={postDisabled}
                        sessionUserLikes={sessionUserLikes}
                        updateLikePost={updateLikePost}
                        postLikes={postLikes}
                    />
                </Modal>
            )}
        </div>
    )

}

export default DisplayPost;
