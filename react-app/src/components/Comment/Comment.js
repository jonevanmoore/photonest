import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { updateComment, destroyComment } from "../../store/comment";

import './Comment.css'

const Comment = ({ comment, users, post }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    const [editedComment, setEditedComment] = useState(comment.content)


    const [commentInfoDisplay, setCommentInfoDisplay] = useState(true)
    const [editCommentDisplay, setEditCommentDisplay] = useState(false)
    const showCommentInfo = () => {
        setCommentInfoDisplay(true)
        setEditCommentDisplay(false)
        setEditedComment(comment.content)
    }
    const showEditComment = () => {
        setEditCommentDisplay(true)
        setCommentInfoDisplay(false)
        setEditedComment(comment.content)
    }

    const editComment = async () => {
        const updatedComment = {
            content: editedComment,
        }
        await dispatch(updateComment(updatedComment, comment.id))
        showCommentInfo()
    }

    const deleteComment = async () => {
        await dispatch(destroyComment(comment.id))
    }

    return (
        <>
            {commentInfoDisplay && (
                <div style={{ display: 'flex', marginLeft: '10px', marginTop: '10px', justifyContent: 'space-between', animation: 'fadeIn .3s' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <Link>
                                <img src={users[comment.user_id - 1].profile_image} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                            </Link>
                            <span className="caption-text" style={{ marginTop: '7px', marginLeft: '5px', paddingLeft: '0px' }}><Link to={`/${users[comment.user_id - 1].username}`} style={{ marginTop: '7px' }} className="username-on-caption">{users[comment.user_id - 1].username}</Link>{comment.content}</span>
                        </div>
                        <div className="comment-info">
                            <span>1h</span>
                            <span>2 likes</span>
                            {sessionUser.id === comment.user_id && (
                                <>
                                    <span className='update-comment' onClick={showEditComment}>edit</span>
                                    <span className='update-comment' onClick={deleteComment}>delete</span>
                                </>
                            )}
                            {sessionUser.id === post.user_id && sessionUser.id !== comment.user_id && (
                                <>
                                    <span className='update-comment' onClick={deleteComment}>delete</span>

                                </>
                            )}
                        </div>
                    </div>
                    <div >
                        <i className="fa-solid fa-heart" style={{ marginRight: '10px', marginTop: '10px', fontSize: '12px' }}></i>
                    </div>
                </div>
            )}
            {sessionUser.id === comment.user_id && editCommentDisplay && (
                <div className="edit-post-div" style={{ marginTop: '5px' }}>
                    <textarea
                        value={editedComment}
                        onChange={e => setEditedComment(e.target.value)}
                        maxLength={200}
                        className='edit-cap-input'
                    >
                    </textarea>
                    <div>
                        <span style={{ float: 'left', marginLeft: '10px', fontSize: '12px' }}>{`${editedComment.length}/200`}</span>
                        {editedComment.length < 1 && (
                            <span style={{ float: 'left', marginLeft: '10px', fontSize: '12px', color: 'red' }}>Cannot leave comment blank</span>
                        )}
                        <div className='edit-comment-btns-div' style={{ float: 'right' }}>
                            <button onClick={editComment}
                                disabled={editedComment.length < 1}
                                style={{ backgroundColor: 'transparent', border: 'none', fontFamily: 'Raleway', fontSize: '15px' }}
                                className={editedComment.length < 1 ? 'post-disabled' : 'update-btn'}
                            >update</button>
                            <span onClick={showCommentInfo}>cancel</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Comment;
