import { ACTIVE_ORDERS_CHEF_FAIL, ACTIVE_ORDERS_CHEF_SUCCESS } from '../actions/types'

const initialState = {
    activeOrders: [],
    orderHistory: []
}

const chefReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_ORDERS_CHEF_SUCCESS:
            return {
                ...state, activeOrders: action.payload
            }
        case ACTIVE_ORDERS_CHEF_FAIL:
            return state
        default:
            return state
    }
}


export default chefReducer
