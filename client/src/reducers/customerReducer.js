<<<<<<< HEAD
import { ACTIVE_ORDERS_CUSTOMER_FAIL, ACTIVE_ORDERS_CUSTOMER_SUCCESS, COMPLETE_ORDERS_CUSTOMER_FAIL, COMPLETE_ORDERS_CUSTOMER_SUCCESS } from '../actions/types'

const initialState = {
    activeOrders: [],
    completeOrders: []
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state, activeOrders: action.payload
            }
        case COMPLETE_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state, completeOrders: action.payload
            }
        case COMPLETE_ORDERS_CUSTOMER_FAIL:
        case ACTIVE_ORDERS_CUSTOMER_FAIL:
            return state
        default:
            return state
    }
}


export default customerReducer
=======

import 
{
    CHECKOUT_FAIL,
    CHECKOUT_SUCCESS,
}from'../actions/types'

const initialState = {
    checkout = []
}
const customerReducer = (state = initialState ,action)=>{
    switch(action.type)
    {
        case CHECKOUT_SUCCESS:
            return{
                ...state, checkout:action.payload
            }
        case CHECKOUT_FAIL:
            return state
        default:
            return state            
    }
}

export default customerReducer
>>>>>>> 6370a37174af95e4dec34a398a4fb13a52effae1
