const GET_FOLLOWING = 'following/get'

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

const initialState = {}

export default function followingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWING: {
            const newState = {}
            action.following.map(followee => (
                newState[followee.id] = followee
            ))
            return newState
        }

        default:
            return state;
    }
}
