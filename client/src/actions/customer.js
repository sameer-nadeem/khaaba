import {
    ACTIVE_ORDERS_CUSTOMER_FAIL,
    ACTIVE_ORDERS_CUSTOMER_SUCCESS,
    COMPLETE_ORDERS_CUSTOMER_FAIL,
    COMPLETE_ORDERS_CUSTOMER_SUCCESS
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'


export const getCustomerCompleteOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/order-history')

        dispatch({
            type: COMPLETE_ORDERS_CUSTOMER_SUCCESS,
            payload: res.data.orders
        })
    }
    catch (error) {
        dispatch({
            type: COMPLETE_ORDERS_CUSTOMER_FAIL
        })
        toast.error("Server error!")
    }
}


export const getCustomerActiveOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/active-orders')
        dispatch({
            type: ACTIVE_ORDERS_CUSTOMER_SUCCESS,
            payload: res.data.activeOrders
        })
    }
    catch (error) {
        dispatch({
            type: ACTIVE_ORDERS_CUSTOMER_FAIL
        })
        console.log(error.message)
        toast.error("Server error!")
    }

}