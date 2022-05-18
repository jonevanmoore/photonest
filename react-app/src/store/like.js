const GET_POST_LIKES = 'post/GET_POST_LIKES'
const ADD_POST_LIKE = 'post/ADD_POST_LIKE'
const REMOVE_POST_LIKE = 'post/REMOVE_POST_LIKE'

const GET_COMMENT_LIKES = 'post/GET_COMMENT_LIKES'
const ADD_COMMENT_LIKE = 'post/ADD_COMMENT_LIKE'
const REMOVE_COMMENT_LIKE = 'post/REMOVE_COMMENT_LIKE'

//POSTS
const getPostLikes = (likes) => ({
    type: GET_POST_LIKES,
    likes
})

const addPostLike = (like) => ({
    type: ADD_POST_LIKE,
    like
})
const removePostLike = (id) => ({
    type: REMOVE_COMMENT_LIKE,
    id
})

//COMMENTS
const getCommentLikes = (likes) => ({
    type: GET_COMMENT_LIKES,
    likes
})

const addCommentLike = (like) => ({
    type: ADD_POST_LIKE,
    like
})
const removeCommentLike = (id) => ({
    type: REMOVE_COMMENT_LIKE,
    id
})


//POSTS
export const fetchPostLikes = (id) => async (dispatch) => {
    const response = await fetch(`/api/post_likes/${id}`, {
        method: 'GET'
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(getPostLikes(likes))
        return likes;
    }
}

export const updatePostLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/post_likes/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        if (data.status === 'deleted') {
            dispatch(removePostLike(data.like_id));
        } else {
            dispatch(addPostLike(data));
        }
        return data;
    }
}


//COMMENTS
export const fetchCommentLikes = (id) => async (dispatch) => {
    const response = await fetch(`/api/comment_likes/${id}`, {
        method: 'GET'
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(getCommentLikes(likes))
        return likes;
    }
}

export const updateCommentLike = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comment_likes/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        if (data.status === 'deleted') {
            dispatch(removeCommentLike(data.like_id));
        } else {
            dispatch(addCommentLike(data));
        }
        return data;
    }
}

const likeReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        //POSTS
        case GET_POST_LIKES: {
            action.likes.map(like => {
                return newState[like.id] = like
            })
            return newState;
        }

        case ADD_POST_LIKE: {
            newState[action.like.id] = action.like;
            return newState;
        }

        case REMOVE_POST_LIKE: {
            delete newState[action.id];
            return newState;
        }
        //COMMENTS
        case GET_COMMENT_LIKES: {
            action.likes.map(like => {
                return newState[like.id] = like
            })
            return newState;
        }
        case ADD_COMMENT_LIKE: {
            newState[action.like.id] = action.like;
            return newState;
        }
        case REMOVE_COMMENT_LIKE: {
            delete newState[action.id];
            return newState;
        }
        default: {
            return state;
        }
    }

};

export default likeReducer
