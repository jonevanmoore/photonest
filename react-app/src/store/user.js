const ALL_USERS = 'session/ALL_USERS'

const fetchAllUsers = (users) => ({
    type: ALL_USERS,
    users
})

const ONE_USER = 'session/ALL_USERS'

const fetchOneUser = (user) => ({
    type: ONE_USER,
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
            newState = {};
            newState[action.user.id] = action.user
            return newState
        default:
            return state;
    }
}

export default usersReducer
