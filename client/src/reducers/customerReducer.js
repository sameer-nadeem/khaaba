import { ACTIVE_ORDERS_CUSTOMER_FAIL, ACTIVE_ORDERS_CUSTOMER_SUCCESS, COMPLETE_ORDERS_CUSTOMER_FAIL, COMPLETE_ORDERS_CUSTOMER_SUCCESS } from '../actions/types'

const initialState = {
    activeOrders: [],
    completeOrders: [],
    loading: true
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state, activeOrders: action.payload, loading: false
            }
        case COMPLETE_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state, completeOrders: action.payload, loading: false
            }
        case COMPLETE_ORDERS_CUSTOMER_FAIL:
        case ACTIVE_ORDERS_CUSTOMER_FAIL:
            return state
        default:
            return state
    }
}


export default customerReducer
