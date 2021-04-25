import { SET_PAGENUMBER, SET_QUERY } from '../actions/types'

const initialState = {
    query: '',
    pageNumber: 1
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUERY:
            return { ...state, query: action.payload }
        case SET_PAGENUMBER:
            return { ...state, pageNumber: action.payload }
        default:
            return state
    }
}

export default searchReducer