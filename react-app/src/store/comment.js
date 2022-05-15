const ALL_COMMENTS = 'comments/ALL_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'


const fetchComments = (comments) => ({
    type: ALL_COMMENTS,
    comments
})
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})
const editComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})
const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})


export const fetchAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments', {
        method: 'GET'
    })
    if (response.ok) {
        const comments = await response.json()

        dispatch(fetchComments(comments))
        return comments
    }
}

export const postComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createComment(data));
        return data;
    } else {
        console.log(data.errors);
    }
}

export const updateComment = (comment, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    const newComment = await response.json();

    if (response.ok) {
        await dispatch(editComment(newComment));
        return newComment
    } else {
        console.log(newComment.errors)
    }
}

export const destroyComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deletedComment = await response.json();
        await dispatch(deleteComment(deletedComment))
    }
}


const initialState = {};

const userCommentsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_COMMENTS:
            action.comments.map(comment => {
                return newState[comment.id] = comment
            })
            return newState
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case UPDATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}

export default userCommentsReducer
