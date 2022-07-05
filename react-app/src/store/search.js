const SEARCH_RESULTS = 'search/SEARCH_RESULTS'
const EMPTY_RESULT = 'search/EMPTY_RESULT'

const searchResultActionCreator = (search, searchResult) => ({
    type: SEARCH_RESULTS,
    search,
    searchResult,
})

const clearSearchActionCreator = () => ({
    type: EMPTY_RESULT
})

export const searchResultThunk = (search_input) => async dispatch => {
    const response = await fetch('/api/search/users?search_input=' + search_input)
    if (response.ok) {
        const search_result = await response.json()
        dispatch(searchResultActionCreator(search_result, search_input))
        return search_result
    }
}

export const emptySearchThunk = () => async dispatch => {
    dispatch(clearSearchActionCreator())
    return;
}


const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SEARCH_RESULTS: {
            newState = { ...state };
            let search_results = action.search.results
            newState['search_results'] = search_results
            return newState
        }
        case EMPTY_RESULT: {
            newState = { ...state };
            newState['search_results'] = [];
            return newState;
        }
        default:
            return state
    }
}

export default searchReducer
