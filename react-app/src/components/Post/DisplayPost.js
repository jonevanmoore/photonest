import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { editPost, destroyPost } from "../../store/post"
import { fetchUsers } from "../../store/user"
import './DisplayPost.css'

const EditPost = ({ post, comments }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))
    const postId = post.id
    const [editedCaption, setEditedCaption] = useState(post.caption)

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
                            </div>
                        )
                    }
                })}
                <div className="img-div">
                    <img key={post.id} src={post.post_image} style={{ maxHeight: '400px', maxWidth: '500px' }} alt='preview' />
                </div>
                <div className="caption-div">

                    <span>{post.caption}</span>
                    {sessionUser.id === post.user_id && (
                        <>
                            <div className="edit-post-div">
                                <input
                                    value={editedCaption}
                                    onChange={e => setEditedCaption(e.target.value)}
                                >

                                </input>
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                            <div className="delete-post-div">
                                <button onClick={deletePost}>Delete</button>
                            </div>
                        </>

                    )}
                </div>
                <div className="comment-section" style={{ display: 'flex', flexDirection: 'column' }}>
                    {comments.map(comment => {
                        if (postId === comment.post_id) {
                            return (
                                <span>{comment.content}</span>
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

export default EditPost;
