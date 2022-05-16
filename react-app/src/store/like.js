const GET_LIKES = 'post/GET_LIKES'
const UPDATE_LIKE = 'post/UPDATE_LIKE'

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const updatedLike = (data) => ({
    type: UPDATE_LIKE,
    data
})

export const fetchLikes = (id) => async (dispatch) => {
    const response = await fetch(`/api/post_likes/${id}`, {
        method: 'GET'
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(getLikes(likes))
        return likes;
    }
}

export const updateLike = (id) => async (dispatch) => {
    const response = await fetch(`/api/post_likes/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updatedLike(data))
        return response
    }
}



const likeReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_LIKES: {
            action.likes.map(like => {
                return newState[like.id] = like
            })
            return newState;
        }

        case UPDATE_LIKE: {
            if (newState[action.data.id]) {
                delete newState[action.data.id]
                return newState
            } else {
                newState[action.data.id] = action.data
                return newState;
            }
        }
        default: {
            return state
        }
    }

}

export default likeReducer
