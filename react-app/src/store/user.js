const ALL_USERS = 'session/ALL_USERS'

const fetchAllUsers = (users) => ({
    type: ALL_USERS,
    users
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


const initialState = {};
const usersReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_USERS:
            action.users.map(user => {
                return newState[user.id] = user
            })
            return newState;
        default:
            return state;
    }
}

export default usersReducer
