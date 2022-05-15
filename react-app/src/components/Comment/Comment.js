import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { updateComment } from "../../store/comment";
import './Comment.css'

const Comment = ({ comment, users }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const singleComment = useSelector(state => state.comments[comment.id])

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
    }

    const editComment = async () => {
        const updatedComment = {
            content: editedComment
        }
        await dispatch(updateComment(updatedComment, singleComment.id))
        setEditedComment(comment.content)
        showCommentInfo()
    }

    return (
        <>
            {sessionUser.id === comment.user_id && commentInfoDisplay && (
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
                            <>
                                <span className='update-comment' onClick={showEditComment}>edit</span>
                                <span className='update-comment'>delete</span>
                            </>
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
                        minLength={1}
                        className='edit-cap-input'
                    >
                    </textarea>
                    <div>

                        <div className='edit-comment-btns-div' style={{ float: 'right' }}>
                            <span onClick={editComment}>update</span>
                            <span onClick={showCommentInfo}>cancel</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Comment;
