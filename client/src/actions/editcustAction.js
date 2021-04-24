import axios from 'axios'
import {
    CUSTOMER_EDITPROFILE_SUCCESS,
    CUSTOMER_EDITPROFILE_FAIL,
    CUSTOMER_PASSCHANGE_SUCCESS,
    CUSTOMER_PASSCHANGE_FAIL,

} from './types'
import { toast } from 'react-toastify'


export const editprofile_customer = (formData) => async dispatch => {
    // console.log(`fromdata`,formData)

    // const form = new FormData()
    // form.append('email', formData.email)
    // form.append('address', formData.address)
    // form.append('city', formData.city)
    // form.append('phone', formData.phone)
    // form.append('firstName', formData.firstName)
    // form.append('lastName', formData.lastName)
    

    // console.log('the form',form)
    try {
        
        const res = await axios.post('/api/profile/change-profile/customer', formData)
        // console.log(`post response`,res.data)
        dispatch({
            type: CUSTOMER_EDITPROFILE_SUCCESS,
            payload: res.data.updObj
        })
        toast.success('Edit Profile Successful!')

    } catch (error) {
        // console.log(error.response.data.errors)
        // console.log(error.response.data)
        const errors = error.response.data.errors
        
        if (errors[0] === "USER_ALREADY_EXISTS") {
            toast.error('User with such email already exists')
        }
        else {
            toast.error('Server error')
        }
        dispatch({
            type: CUSTOMER_EDITPROFILE_FAIL
        })
    }


}

export const passchange_customer=(formData) => async dispatch => {
    try {
        console.log(`Form Data`,formData)
    const res = await axios.post('/api/profile/change-pass/customer', formData)
    console.log(`Resolution`,res.data)
    dispatch({
        type: CUSTOMER_PASSCHANGE_SUCCESS,
        payload: res.data
    })
    toast.success('Password Change Successful!')
}
catch (error) {
    //console.log(error.response.data.errors)
    const errors =  error.response.data.errors
    if (errors[0] === "INVALID_CREDITS")
    {
        toast.error('Invalid Credentials')
    }
    else {
        toast.error('Server error')
    }
    
    dispatch({
        type: CUSTOMER_PASSCHANGE_FAIL
    })

}

}