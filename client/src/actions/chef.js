import { ACTIVE_ORDERS_CHEF_FAIL, ACTIVE_ORDERS_CHEF_SUCCESS } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'
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

        toast.error("Server error!")

    }

}