import {
    ACTIVE_ORDERS_CHEF_FAIL,
    ACTIVE_ORDERS_CHEF_SUCCESS,
    COMPLETE_ORDERS_CHEF_FAIL,
    COMPLETE_ORDERS_CHEF_SUCCESS
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'


export const getChefCompleteOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/chef/order-history')

        dispatch({
            type: COMPLETE_ORDERS_CHEF_SUCCESS,
            payload: res.data.orders
        })
    }
    catch (error) {
        dispatch({
            type: COMPLETE_ORDERS_CHEF_FAIL
        })

        toast.error("Server error!")
    }

}


export const getChefActiveOrders = () => async dispatch => {

    try {


        const res = await axios.get('/api/chef/active-orders')


        dispatch({
            type: ACTIVE_ORDERS_CHEF_SUCCESS,
            payload: res.data.activeOrders
        })

    }
    catch (error) {
        dispatch({
            type: ACTIVE_ORDERS_CHEF_FAIL
        })

        console.log(error.message)

        toast.error("Server error!")

    }

}