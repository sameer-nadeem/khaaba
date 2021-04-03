import {
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    CHEF_REGISTER_FAIL,
    CHEF_REGISTER_SUCCESS
} from '../actions/types'

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHEF_REGISTER_SUCCESS:
        case CUSTOMER_REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state, token: action.payload, isAuthenticated: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case AUTH_ERROR:
        case CUSTOMER_REGISTER_FAIL:
        case CHEF_REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state, token: null, user: null, isAuthenticated: false
            }
        default:
            return state
    }


    return state
}


export default authReducer