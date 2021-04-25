import axios from 'axios'
import history from '../util/history'
import {
    DISH_EDITED_SUCCESSFULLY,
    FAILED_TO_EDIT_DISH
} from './types'

import { toast } from 'react-toastify'

export const editInstant = (formData) => async dispatch => {

    const form = new FormData()
    form.append('dishlogo', formData.dishPicture)
    form.append('title', formData.title)
    form.append('expiryTime', formData.expiryTime)
    form.append('price', formData.price)
    form.append('description', formData.description)
    form.append('servings', formData.servings)
    form.append('categories', formData.categories)
    form.append('isInstantKhaaba', true)
    
    try {
        const res = await axios.post(`/api/kitchen//edit-khaaba/${formData.khaabaID}`, form)
        console.log(`WALAAAAHAAHAHAHAHAHAHA:  ${res.data}`)
        dispatch({
            type: DISH_EDITED_SUCCESSFULLY,
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
            type: FAILED_TO_EDIT_DISH
        })
    }
}



export const editNormal = (formData) => async dispatch => {

   
    const form = new FormData()
    
    form.append('dishlogo', formData.dishPicture)
    form.append('title', formData.title)

    form.append('price', formData.price)
    form.append('description', formData.description)

    form.append('categories', formData.categories)
    form.append('isInstantKhaaba', false)

    // console.log(`Received this in the action handles: formData->${formData}`)
    
    try {
        console.log("This is the logo name being sent to backend: ",formData.dishPicture)

        const res = await axios.post(`/api/kitchen/edit-khaaba/${formData.khaabaID}`, form)
        
        dispatch({
            type: DISH_EDITED_SUCCESSFULLY,
            // payload: res.data.token
        })
        toast.success('Dish info updated, Happy Khaaba!')
        // dispatch(loadUser())
        history.push('/chef/menu')
    } catch (error) {


        console.log(error.response.data.errors)
        console.log(error.response.data)
        const errors = error.response.data.errors
        toast.error('Server error')

        dispatch({
            type: FAILED_TO_EDIT_DISH
        })
    }
}