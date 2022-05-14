const ALL_COMMENTS = 'comments/ALL_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'

const fetchComments = (comments) => ({
    type: ALL_COMMENTS,
    comments
})
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
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
        console.log('ruh-roh')
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
        default:
            return state
    }
}

export default userCommentsReducer
