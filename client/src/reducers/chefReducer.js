import { ACTIVE_ORDERS_CHEF_FAIL, ACTIVE_ORDERS_CHEF_SUCCESS, COMPLETE_ORDERS_CHEF_FAIL, COMPLETE_ORDERS_CHEF_SUCCESS, } from '../actions/types'

const initialState = {
    activeOrders: [],
    completeOrders: [],

    loading: true
}

const chefReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_ORDERS_CHEF_SUCCESS:
            return {
                ...state, activeOrders: action.payload, loading: false
            }
        case COMPLETE_ORDERS_CHEF_SUCCESS:
            return {
                ...state, completeOrders: action.payload, loading: false
            }
        case COMPLETE_ORDERS_CHEF_FAIL:
        case ACTIVE_ORDERS_CHEF_FAIL:
            return state
        default:
            return state
    }
}


export default chefReducer
