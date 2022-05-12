import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { editPost, destroyPost } from "../../store/post"

const EditPost = ({ post }) => {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const postId = post.id
    const [editedCaption, setEditedCaption] = useState(post.caption)

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
                <span>username</span>
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
            </div>
        </div>
    )

}

export default EditPost;
