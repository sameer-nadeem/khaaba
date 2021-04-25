import {
    CHECKOUT_FAIL,
    CHECKOUT_SUCCESS
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'
export const getCheckout = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/order')
        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: res.data.orders
        })
    }
    catch (error) {
        dispatch({
            type: CHECKOUT_FAIL,

        })
        toast.error("Server error!")
    }
}