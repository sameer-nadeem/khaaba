import axios from 'axios'
import {
    CHEF_EDITPROFILE_SUCCESS,
    CHEF_EDITPROFILE_FAIL,
    CHEF_PASSCHANGE_SUCCESS,
    CHEF_PASSCHANGE_FAIL,

} from './types'
import { toast } from 'react-toastify'



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





export const editprofile_cheflogo = (formData) => async dispatch => {
    const image = await resizeFile(formData.logo);
    const logo = dataURIToBlob(image);

    const form = new FormData()
    // form.append('firstName', formData.firstName)
    // form.append('lastName', formData.lastName)
    // form.append('title', formData.title)
    // form.append('description', formData.description)
    // form.append('email', formData.email)

    form.append('logo', logo)



    // console.log('the form',form)
    try {

        const res = await axios.post('/api/profile/change-profile/cheflogo', form)
        // console.log(`post response`, res.data)
        dispatch({
            type: CHEF_EDITPROFILE_SUCCESS,
            payload: res.data.updObj
        })
        toast.success('Logo Change Successful!')

    } catch (error) {

        //  console.log(error.response.data)
        // const errors = error.response.data.errors

        // if (errors[0] === "USER_ALREADY_EXISTS") {
        //     toast.error('User with such email already exists')
        // }
        // else {
        toast.error('Server error')
        // }
        dispatch({
            type: CHEF_EDITPROFILE_FAIL
        })
    }
}








export const editprofile_chef = (formData) => async dispatch => {

    // const form = new FormData()
    // form.append('firstName', formData.firstName)
    // form.append('lastName', formData.lastName)
    // form.append('title', formData.title)
    // form.append('description', formData.description)
    // form.append('email', formData.email)

    // form.append('logo', formData.logo)
    // form.append('startingHour', formData.start)
    // form.append('endingHour', formData.end)
    // form.append('phone', formData.phone)
    // form.append('city', formData.city)
    // form.append('address', formData.address)


    // console.log('the form',form)
    try {

        const res = await axios.post('/api/profile/change-profile/chef', formData)
        // console.log(`post response`, res.data)
        dispatch({
            type: CHEF_EDITPROFILE_SUCCESS,
            payload: res.data.updObj
        })
        toast.success('Edit Profile Successful!')

    } catch (error) {

        // console.log(error.response.data)
        const errors = error.response.data.errors

        if (errors[0] === "USER_ALREADY_EXISTS") {
            toast.error('User with such email already exists')
        }
        else {
            toast.error('Server error')
        }
        dispatch({
            type: CHEF_EDITPROFILE_FAIL
        })
    }
}

export const passchange_chef = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/profile/change-pass/chef', formData)
        // console.log(`Resolution`, res.data)
        dispatch({
            type: CHEF_PASSCHANGE_SUCCESS,
            payload: res.data
        })
        toast.success('Password Change Successful!')
    }
    catch (error) {
        //console.log(error.response.data.errors)
        const errors = error.response.data.errors
        if (errors[0] === "INVALID_CREDITS") {
            toast.error('Invalid Credentials')
        }
        else {
            toast.error('Server error')
        }

        dispatch({
            type: CHEF_PASSCHANGE_FAIL
        })

    }

}