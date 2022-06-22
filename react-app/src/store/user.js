const ALL_USERS = 'session/ALL_USERS'
const ONE_USER = 'session/ONE_USER'
const UPDATE_USER = 'session/UPDATE_USER'
const UPDATE_USER_WITHOUT_PIC = 'session/UPDATE_USER_WITHOUT_PIC'

const fetchAllUsers = (users) => ({
    type: ALL_USERS,
    users
})


const fetchOneUser = (user) => ({
    type: ONE_USER,
    user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})

const updateUserWithoutPic = (user) => ({
    type: UPDATE_USER_WITHOUT_PIC,
    user
})

export const fetchUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/', {
        method: 'GET'
    })
    if (response.ok) {
        const users = await response.json()

        dispatch(fetchAllUsers(users))
        return users
    }
}

export const fetchUser = (username) => async (dispatch) => {
    const response = await fetch(`/api/users/${username}`, {
        method: 'GET'
    })
    if (response.ok) {
        const user = await response.json()

        dispatch(fetchOneUser(user))
        return user
    }
}

export const editUser = (formData, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/`, {
        method: "PUT",
        body: formData
    });


    if (res.ok) {
        const editedUser = await res.json();
        dispatch(updateUser(editedUser));
        return editedUser;
    }
}

export const editUserWithoutPic = (formData, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/no_pic`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });


    if (res.ok) {
        const editedUser = await res.json();
        dispatch(updateUserWithoutPic(editedUser));
        return editedUser;
    }
}

const initialState = {};
const usersReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_USERS:
            action.users.map(user => {
                return newState[user.id] = user
            })
            return newState;
        case ONE_USER:
            return action.user
        case UPDATE_USER:
            newState[action.user.id] = action.user
            return newState
        case UPDATE_USER_WITHOUT_PIC:
            newState[action.user.id] = action.user
            return newState
        default:
            return state;
    }
}


export default usersReducer
