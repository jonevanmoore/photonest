const CREATE_POST = 'post/CREATE_POST'

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

export const postCreate = (data, userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/create/${userId}`, {
        method: 'POST',
        body: data
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
    }

    return response
}


const initialState = {};

const userPostsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_POST:
            newState[action.post.id] = action.post;
            return newState;
        default:
            return state;
    }
};

export default userPostsReducer;
