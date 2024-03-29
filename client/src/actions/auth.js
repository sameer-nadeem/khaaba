import axios from 'axios'
import {
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAIL,
    ADMIN_REGISTER_FAIL,
    ADMIN_REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    CHEF_REGISTER_FAIL,
    CHEF_REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types'
import API from '../config/url'
import { toast } from 'react-toastify'
import setAuthToken from '../util/setAuthToken'
import history from '../util/history'
import Resizer from "react-image-file-resizer";


const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            283,
            283,
            "JPEG",
            20,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
};





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


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const login = (formData) => async dispatch => {
    const {
        type
    } = formData


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
        if (type === 'admin') {
            history.push('/admin')
        }
        else if (type === 'chef') {

            history.push('/chef')
        } else {
            history.push('/')
        }
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

    const image = await resizeFile(formData.logo);
    const logo = dataURIToBlob(image);


    form.append('firstName', formData.firstName)
    form.append('lastName', formData.lastName)
    form.append('title', formData.title)
    form.append('description', formData.description)
    form.append('email', formData.email)
    form.append('password', formData.password)
    form.append('logo', logo)
    form.append('startingHour', formData.startingHour)
    form.append('endingHour', formData.endingHour)
    form.append('phone', formData.phone)
    form.append('city', formData.city)
    form.append('address', formData.address)

    try {
        const res = await axios.post('/api/auth/signup/chef', form)
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

export const registerAdmin = (formData) => async dispatch => {

    try {

        const res = await axios.post('/api/auth/create-admin', formData)
        console.log(res.data)
        dispatch({
            type: ADMIN_REGISTER_SUCCESS,
            payload: res.data.token
        })
        toast.success('Admin added successfully')
        dispatch(loadUser())
        history.push('/')
    } catch (error) {

        const errors = error.response.data.errors
        if (errors[0] === "ADMIN_ALREADY_EXISTS") {
            toast.error('Admin with such email already exists')
        }
        else {
            console.log('testing', errors)
            toast.error('Server error')
        }
        dispatch({
            type: ADMIN_REGISTER_FAIL
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