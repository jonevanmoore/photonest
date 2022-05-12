
const ALL_POSTS = 'posts/ALL_POSTS'
const CREATE_POST = 'post/CREATE_POST'
const UPDATE_POST = 'post/UPDATE_POST'
const DELETE_POST = 'post/DELETE_POST'

const fetchPosts = (posts) => ({
    type: ALL_POSTS,
    posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const fetchAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'GET'
    })
    if (response.ok) {
        const posts = await response.json()

        dispatch(fetchPosts(posts))
        return posts;
    }
}

export const postCreate = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });


    if (response.ok) {
        const newPost = await response.json();
        dispatch(createPost(newPost));
        return newPost;
    }
}

export const editPost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePost(updatedPost));
        return updatedPost
    }
}

export const destroyPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const deletedPost = await response.json();
        dispatch(deletePost(deletedPost));
    }
}

const initialState = {};

const userPostsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_POSTS:
            action.posts.map(post => {
                return newState[post.id] = post
            })
            return newState;
        case CREATE_POST:
            newState[action.post.id] = action.post
            return newState;
        case UPDATE_POST:
            newState[action.post.id] = action.post
            return newState
        case DELETE_POST:
            delete newState[action.postId]
            return newState
        default:
            return state;
    }
};

export default userPostsReducer;
