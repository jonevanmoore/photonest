import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { editPost, destroyPost } from "../../store/post"
import { fetchUsers } from "../../store/user"
import Modal from "../Modal/Modal"
import './DisplayPost.css'

const DisplayPost = ({ post, comments }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))
    const postId = post.id
    const postComments = []
    comments.map(comment => {
        if (postId === comment.post_id) {
            postComments.push(comment)
        }
    })
    const [editedCaption, setEditedCaption] = useState(post.caption)
    const [newComment, setNewComment] = useState('')
    const [postDisabled, setPostDisabled] = useState('disabled')

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
    }


    const [showModal, setShowModal] = useState(false);
    const closeModalFunc = () => setShowModal(false);
    const showModalFunc = () => setShowModal(true);

    const stopTheProp = e => e.stopPropagation();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    useEffect(() => {
        if (newComment.length > 0) {
            setPostDisabled('able')
        } else {
            setPostDisabled('disabled')
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

    //
    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " YEARS AGO";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " MONTHS AGO";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " DAYS AGO";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " HOURS AGO";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " MINUTES AGO";
        }

        return Math.floor(seconds) + " SECONDS AGO";
    }

    const data_posted = new Date(post.created_at).toUTCString()
    const [realTime, setRealTime] = useState(timeSince(new Date(data_posted)))

    return (
        <div className="indie-post-div">
            {users.map(user => {
                if (user.id === post.user_id) {
                    return (
                        <div className="username-post-display">
                            <Link to={`/${user.username}`}>
                                <img src={`./static${user.profile_image}`} key={user.id} style={{ width: '28px' }} className='profile-pic-home' />
                            </Link>
                            <Link to={`/${user.username}`} className='username-display'>
                                <span>{user.username}</span>
                            </Link>
                            {/* DELETE POST MODAL */}
                            {sessionUser.id === post.user_id && (
                                < div className="delete-post-div">
                                    <span onClick={showModalFunc}><i className="fa-solid fa-trash-can"></i></span>
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
            <div className="img-div">
                <img key={post.id} src={post.post_image} style={{ maxHeight: '400px', maxWidth: '500px', minWidth: '500px' }} alt='preview' />
            </div>
            <div className="caption-div">
                {sessionUser.id === post.user_id && captionDisplay && (
                    <div className="edit-cap-div">
                        <span className="edit-cap-btn" onClick={showEditCaption}>edit caption</span>
                    </div>
                )}
                {post.caption && captionDisplay && (
                    <div className='caption-display'>
                        <span className="caption-text"><Link to={`/${users[post.user_id - 1]?.username}`} className="username-on-caption">{users[post.user_id - 1]?.username}</Link>{`${post.caption}`}</span>
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
                        <span className="view-comment">View 1 comment</span>
                    )}
                    {postComments.length > 1 && (
                        <span className="view-comment">{`View all ${postComments.length} comments`}</span>
                    )}
                </div>
                <div className="created-at-div">
                    <span className="created-at">{realTime}</span>
                </div>
                <div className="leave-comment-div" style={{ borderTop: '1px solid lightgray' }}>
                    <div className="leave-com-input-div">
                        <input
                            placeholder="Add a comment..."
                            maxLength={200}
                            className='leave-com-input'
                            onChange={e => setNewComment(e.target.value)}
                        >
                        </input>
                        <button
                            disabled={newComment.length < 1}
                            className={`${postDisabled} post-comment-btn`}
                        >Post</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

//post.created_at.slice(0, 17)

// {postComments.map(comment => (
//     <span><Link to={`/${users[comment.user_id - 1].username}`}>{users[comment.user_id - 1].username}</Link>{comment.content}</span>
// ))}
export default DisplayPost;
