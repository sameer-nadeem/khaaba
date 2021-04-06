import axios from 'axios'
import {
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    CHEF_REGISTER_FAIL,
    CHEF_REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from './types'
import API from '../config/url'
import { toast } from 'react-toastify'
import setAuthToken from '../util/setAuthToken'
import history from '../util/history'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`/api/auth`)
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


export const login = (formData) => async dispatch => {
    const {
        email,
        password,
        type
    } = formData

    console.log('login')

    try {
        const res = await axios.post(`/api/auth/login/${type}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })
        dispatch(loadUser())
        toast.success('Successfully logged in. Happy eating!')
        history.push('/')
    } catch (error) {

        const err = error.response.data.errors[0]
        console.log(err)
        if (err === 'INVALID_CREDITS') {
            toast.error('You entered invalid credentials.')
        }
        else {
            toast.error('Server error')

        }

        dispatch({
            type: LOGIN_FAIL
        })

    }




}





export const registerChef = (formData) => async dispatch => {
    const form = new FormData()
    form.append('firstName', formData.firstName)
    form.append('lastName', formData.lastName)
    form.append('title', formData.title)
    form.append('description', formData.description)
    form.append('email', formData.email)
    form.append('password', formData.password)
    form.append('logo', formData.logo)
    form.append('startingHour', formData.startingHour)
    form.append('endingHour', formData.endingHour)
    form.append('phone', formData.phone)
    form.append('city', formData.city)
    form.append('address', formData.address)

    try {
        const res = await axios.post('/api/auth/signup/chef', form)
        console.log(res.data)
        dispatch({
            type: CHEF_REGISTER_SUCCESS,
            payload: res.data.token
        })
        toast.success('Registration was successful. Happy eating!')
        dispatch(loadUser())
        history.push('/')
    } catch (error) {
        console.log(error.response.data.errors)
        console.log(error.response.data)
        const errors = error.response.data.errors
        console.log()
        if (errors[0] === "USER_ALREADY_EXISTS") {
            toast.error('User with such email already exists')
        }
        else {
            toast.error('Server error')
        }
        dispatch({
            type: CHEF_REGISTER_FAIL
        })
    }


}


export const register = (formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/auth/signup/customer`, formData, {
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
        console.log()
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