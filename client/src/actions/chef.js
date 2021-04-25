import {
    ACTIVE_ORDERS_CHEF_FAIL,
    ACTIVE_ORDERS_CHEF_SUCCESS,
    COMPLETE_ORDERS_CHEF_FAIL,
    COMPLETE_ORDERS_CHEF_SUCCESS,
    CHEF_ANALYTICS_SUCCESS,
    CHEF_ANALYTICS_FAIL,
    CHEF_OWN_DETAILS_SUCCESS,
    CHEF_OWN_DETAILS_FAIL,
    CHEF_OWN_REVIEWS_SUCCESS,
    CHEF_OWN_REVIEWS_FAIL,
    KITCHEN_DAILY_ORDERS_SUCCESS,
    KITCHEN_DAILY_ORDERS_FAIL ,
    KITCHEN_MONTHLY_ORDERS_SUCCESS, 
    KITCHEN_MONTHLY_ORDERS_FAIL,

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

export const getChefAnalytics = () => async dispatch => {
    try {
        const res = await axios.get('/api/chef/analytics')

        dispatch({
            type: CHEF_ANALYTICS_SUCCESS,
            payload: res.data
        })
        console.log(res.data)
    }
    catch (error) {
        dispatch({
            type: CHEF_ANALYTICS_FAIL
        })
        console.log('server err')
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

export const getChefDetails = () => async dispatch => {

    try {


        const res = await axios.get('/api/chef/chef-details')


        dispatch({
            type: CHEF_OWN_DETAILS_SUCCESS,
            payload: res.data
        })

    }
    catch (error) {
        dispatch({
            type: CHEF_OWN_DETAILS_FAIL
        })

        console.log(error.message)

        toast.error("Server error!")

    }
}

    export const getOwnReviews = () => async dispatch => {

        try {
    
    
            const res = await axios.get('/api/chef/view-reviews')
    
    
            dispatch({
                type: CHEF_OWN_REVIEWS_SUCCESS,
                payload: res.data
            })
    
        }
        catch (error) {
            dispatch({
                type: CHEF_OWN_REVIEWS_FAIL
            })
    
            console.log(error.message)
    
            toast.error("Server error!")
    
        }
    }

    export const getDailyOrders = () => async dispatch => {

        try {
    
    
            const res = await axios.get('/api/chef/orders-by-date')
    
    
            dispatch({
                type:KITCHEN_DAILY_ORDERS_SUCCESS,
                payload: res.data.orders
            })
    
        }
        catch (error) {
            dispatch({
                type:KITCHEN_DAILY_ORDERS_FAIL
            })
    
            console.log(error.message)
    
            toast.error("Server error!")
    
        }
    }

    export const getMonthlyOrders = () => async dispatch => {

        try {
    
    
            const res = await axios.get('/api/chef/orders-by-month')
    
    
            dispatch({
                type:KITCHEN_MONTHLY_ORDERS_SUCCESS,
                payload: res.data.orders
            })
    
        }
        catch (error) {
            dispatch({
                type:KITCHEN_MONTHLY_ORDERS_FAIL
            })
    
            console.log(error.message)
    
            toast.error("Server error!")
    
        }
    }


