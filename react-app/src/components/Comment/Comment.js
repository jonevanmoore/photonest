import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { updateComment, destroyComment } from "../../store/comment";
import { fetchCommentLikes, updateCommentLike } from "../../store/like";

import './Comment.css'

const Comment = ({ comment, users, post }) => {
    const dispatch = useDispatch()
    const commentId = comment.id
    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser?.id
    const likes = Object.values(useSelector(state => state.likes))
    let commentLikes = likes.filter(like => like.comment_id === commentId)
    const userLiked = commentLikes.filter(like => like.user_id === userId).length
    const [sessionUserLikes, setSessionUserLikes] = useState('')

    useEffect(() => {
        if (userLiked > 0) {
            setSessionUserLikes('liked-blue')
        } else {
            setSessionUserLikes('')
        }

    }, [userLiked])

    const [editedComment, setEditedComment] = useState(comment.content)

    useEffect(() => {
        dispatch(fetchCommentLikes(commentId))
    }, [dispatch])

    const updateLikeComment = async () => {
        dispatch(updateCommentLike(commentId))
    }

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

    function timeSince(date) {

        let seconds = Math.floor((new Date() - date) / 1000);

        //YEARS
        let interval = seconds / 31536000;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + "y";
        }
        if (interval > 1) {
            return Math.floor(interval) + "y";
        }

        //MONTHS
        interval = seconds / 2592000;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + "m";
        }
        if (interval > 1) {
            return Math.floor(interval) + "m";
        }

        //DAYS
        interval = seconds / 86400;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + "d";
        }
        if (interval > 1) {
            return Math.floor(interval) + "d";
        }

        //HOURS
        interval = seconds / 3600;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + "h";
        }
        if (interval > 1) {
            return Math.floor(interval) + "h";
        }

        // MINUTES
        interval = seconds / 60;
        if (Math.floor(interval) === 1) {
            return Math.floor(interval) + "m";
        }
        if (interval > 1) {
            return Math.floor(interval) + "m";
        }

        if (Math.floor(seconds) === 1) {
            return Math.floor(seconds) + "s";
        }
        return Math.floor(seconds) + "s";
    }

    const date_posted = new Date(comment.created_at).toUTCString()
    const [realTime, setRealTime] = useState(timeSince(new Date(date_posted)))

    return (
        <>
            {commentInfoDisplay && (
                <div style={{ display: 'flex', marginLeft: '10px', marginTop: '10px', justifyContent: 'space-between', animation: 'fadeIn .3s' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <span>
                                <img src={users[comment.user_id - 1].profile_image} style={{ width: '30px', height: '30px' }} className='profile-pic-home' />
                            </span>
                            <span className="caption-text" style={{ marginTop: '7px', marginLeft: '5px', paddingLeft: '0px' }}><span style={{ marginTop: '7px', cursor: 'text' }} className="username-on-caption">{users[comment.user_id - 1].username}</span>{comment.content}</span>
                        </div>
                        <div className="comment-info">
                            {comment.created_at !== comment.updated_at && (
                                <span>edited</span>
                            )}
                            <span>{realTime}</span>
                            {commentLikes?.length === 1 && (
                                <span>{`${commentLikes?.length} like`}</span>
                            )}
                            {commentLikes?.length > 1 && (
                                <span>{`${commentLikes?.length} likes`}</span>
                            )}
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
                        <i className={`fa-solid fa-heart ${sessionUserLikes}`} style={{ marginRight: '10px', marginTop: '10px', fontSize: '12px' }} onClick={updateLikeComment}></i>
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
