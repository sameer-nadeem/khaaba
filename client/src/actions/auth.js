import axios from 'axios'
import { CUSTOMER_REGISTER_SUCCESS, CUSTOMER_REGISTER_FAIL, AUTH_ERROR, USER_LOADED } from './types'
import API from '../config/url'
import { toast } from 'react-toastify'
import setAuthToken from '../util/setAuthToken'
import history from '../util/history'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`${API}/api/auth`)
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}



export const register = (formData) => async dispatch => {
    try {
        const res = await axios.post(`${API}/api/auth/signup/customer`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data)
        dispatch({
            type: CUSTOMER_REGISTER_SUCCESS,
            payload: res.data.token
        })
        toast.success('Registration was successful. Happy eating!')
        dispatch(loadUser())
        history.push('/')
    } catch (error) {
        console.log(error.response.data)
        const errors = error.response.data.errors
        if (errors[0] === "USER_ALREADY_EXISTS") {
            toast.error('User with such email already exists')
        }
        else {
            toast.error('Server error')
        }
        dispatch({
            type: CUSTOMER_REGISTER_FAIL
        })
    }
    console.log('hello')

}