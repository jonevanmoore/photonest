const GET_LIKES = 'post/GET_LIKES'
const ADD_LIKE = 'post/ADD_LIKE'
const REMOVE_LIKE = 'post/REMOVE_LIKE'

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const addLike = (like) => ({
    type: ADD_LIKE,
    like
})
const removeLike = (id) => ({
    type: REMOVE_LIKE,
    id
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

export const updateLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/post_likes/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        if (data.status === 'deleted') {
            dispatch(removeLike(data.like_id));
        } else {
            dispatch(addLike(data));
        }
        return data;
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

        case ADD_LIKE: {
            newState[action.like.id] = action.like;
            return newState;
        }

        case REMOVE_LIKE: {
            delete newState[action.id];
            return newState;

        }
        default: {
            return state;
        }
    }

};

export default likeReducer
