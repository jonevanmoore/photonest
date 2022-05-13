const ALL_COMMENTS = 'comments/ALL_COMMENTS'

const fetchComments = (comments) => ({
    type: ALL_COMMENTS,
    comments
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

const initialState = {};

const userCommentsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_COMMENTS:
            action.comments.map(comment => {
                return newState[comment.id] = comment
            })
            return newState
        default:
            return state
    }
}

export default userCommentsReducer
