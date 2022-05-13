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
    const [editedCaption, setEditedCaption] = useState(post.caption)

    const [showModal, setShowModal] = useState(false);
    const closeModalFunc = () => setShowModal(false);
    const showModalFunc = () => setShowModal(true);

    const stopTheProp = e => e.stopPropagation();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleUpdate = async () => {
        const updatedCaption = {
            id: postId,
            user_id: post.user_id,
            post_image: post.post_image,
            caption: editedCaption
        }
        await dispatch(editPost(updatedCaption))
    }

    const deletePost = async () => {
        await dispatch(destroyPost(postId))
    }

    return (
        <div>
            <div className="indie-post-div">
                {users.map(user => {
                    if (user.id === post.user_id) {
                        return (
                            <div className="username-post-display">
                                <Link to={`/${user.username}`}>
                                    <img src={`./static${user.profile_image}`} key={user.id} style={{ width: '28px' }} className='profile-pic-home' />
                                </Link>
                                <Link to={`/${user.username}`}>
                                    <span className="username-display">{user.username}</span>
                                </Link>
                                {sessionUser.id === post.user_id && (
                                    <div className="delete-post-div">
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
                                )}
                            </div>
                        )
                    }
                })}
                <div className="img-div">
                    <img key={post.id} src={post.post_image} style={{ maxHeight: '400px', maxWidth: '500px', minWidth: '500px' }} alt='preview' />
                </div>
                <div className="caption-div">
                    <Link to={`/${users[post.user_id - 1]?.username}`}>{users[post.user_id - 1]?.username}</Link>
                    <span>{post.caption}</span>
                    {sessionUser.id === post.user_id && (
                        <>
                            <div className="edit-post-div">
                                <textarea
                                    value={editedCaption}
                                    onChange={e => setEditedCaption(e.target.value)}
                                >

                                </textarea>
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                        </>

                    )}
                </div>
                <div className="comment-section" style={{ display: 'flex', flexDirection: 'column' }}>
                    {comments.map(comment => {
                        if (postId === comment.post_id) {
                            const user = users[comment?.user_id]?.username
                            return (
                                <>
                                    <Link to={`/${user}`}>{user}</Link>
                                    <span>{comment.content}</span>
                                </>
                            )
                        }
                        if (sessionUser.id === comment.user_id) {
                            return (
                                <div>
                                    <button>Edit Comment</button>
                                    <button>Delete Comment</button>
                                </div>
                            )
                        }
                    })}
                    {
                    }
                </div>
            </div>
        </div>
    )

}

export default DisplayPost;
