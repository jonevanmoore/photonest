const GET_FOLLOWING = 'FOLLOWING/GET_FOLLOWING'

const getFollowing = (following) => ({
    type: GET_FOLLOWING,
    following
})

export const loadfollowing = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/following/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getFollowing(data))
        return response
    }
}

const followingReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_FOLLOWING: {
            newState = {};
            action.following.map(followed => (
                newState[followed.id] = followed
            ))
            return newState
        }
        default:
            return state;
    }
}

export default followingReducer
