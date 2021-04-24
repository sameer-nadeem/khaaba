import { SET_PAGENUMBER, SET_QUERY } from './types'

export const setPageNumber = (p) => dispatch => dispatch({
    type: SET_PAGENUMBER,
    payload: p
})

export const setQuery = (p) => dispatch => dispatch({
    type: SET_QUERY,
    payload: p
})