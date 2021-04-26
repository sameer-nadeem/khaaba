import axios from 'axios'
import history from '../util/history'
import {
    DISH_ADDED_SUCCESSFULLY,
    FAILED_TO_ADD_DISH
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

export const addInstant = (formData) => async dispatch => {

    const form = new FormData()
    const image = await resizeFile(formData.dishPicture);
    const logo = dataURIToBlob(image);
    form.append('logo', logo)
    form.append('title', formData.title)
    form.append('expiryTime', formData.expiryTime)
    form.append('price', formData.price)
    form.append('description', formData.description)
    form.append('servings', formData.servings)
    form.append('categories', formData.categories)
    form.append('isInstantKhaaba', true)

    try {
        const res = await axios.post('/api/kitchen/add-khaaba', form)
        console.log(`WALAAAAHAAHAHAHAHAHAHA:  ${res.data}`)
        dispatch({
            type: DISH_ADDED_SUCCESSFULLY,
            // payload: res.data.token
        })
        toast.success('Dish added to menu. Happy Khaaba!')
        // dispatch(loadUser())
        history.push('/chef/menu')
    } catch (error) {
        console.log(error.response.data.errors)
        console.log(error.response.data)
        const errors = error.response.data.errors
        toast.error('Server error')

        dispatch({
            type: FAILED_TO_ADD_DISH
        })
    }
}



export const addNormal = (formData) => async dispatch => {


    const form = new FormData()
    const image = await resizeFile(formData.dishPicture);
    const logo = dataURIToBlob(image);
    form.append('logo', logo)
    form.append('title', formData.title)

    form.append('price', formData.price)
    form.append('description', formData.description)

    form.append('categories', formData.categories)
    form.append('isInstantKhaaba', false)

    // console.log(`Received this in the action handles: formData->${formData}`)

    try {

        const res = await axios.post('/api/kitchen/add-khaaba', form)

        dispatch({
            type: DISH_ADDED_SUCCESSFULLY,
            // payload: res.data.token
        })
        toast.success('Dish added to menu. Happy Khaaba!')
        // dispatch(loadUser())
        history.push('/chef/menu')
    } catch (error) {


        console.log(error.response.data.errors)
        console.log(error.response.data)
        const errors = error.response.data.errors
        toast.error('Server error')

        dispatch({
            type: FAILED_TO_ADD_DISH
        })
    }
}