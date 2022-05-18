export const UPDATE_FOLLOW = 'FOLLOW/UPDATE_FOLLOW'
const GET_FOLLOWERS = 'FOLLOWERS/GET_FOLLOWERS'


const updateFollow = (follow) => ({
    type: UPDATE_FOLLOW,
    follow
})

const getFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    followers
})


export const followUnfollow = (followedId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${followedId}`, {
        method: 'POST'
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(updateFollow(data))
        return response
    }
}

export const loadfollowers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/followers/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getFollowers(data))
        return response
    }
}


const followReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case UPDATE_FOLLOW: {
            if (Object.keys(newState).includes(`${action.follow.id}`)) {
                delete newState[action.follow.id]
                return newState
            } else {
                newState[action.follow.id] = action.follow
                return newState;
            }
        }
        case GET_FOLLOWERS: {
            newState = {}

            action.followers.map(follower => (
                newState[follower.id] = follower
            ))
            return newState
        }

        default:
            return state;
    }
}

export default followReducer
