const CREATE_POST = 'post/CREATE_POST'

const createPost = (post) => ({
    type: CREATE_POST,
    post
})

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


const initialState = {};

const userPostsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState;
        default:
            return state;
    }
};

export default userPostsReducer;
