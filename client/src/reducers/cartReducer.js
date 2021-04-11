import {ADD_CART, REMOVE_CART, CHECKOUT_SUCCESS, CHECKOUT_FAIL} from '../actions/types'
import {toast} from 'react-toastify'

const initialState = {
    kitchenID: null,
    khaabay: []

    }

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART:
            
            return {kitchenID:action.payload.kitchenID,
                    khaabay: action.payload.khaabay}
        case CHECKOUT_SUCCESS:
                return {
                    kitchenID: null,
                    khaabay: []  
                }
        case CHECKOUT_FAIL:

        default:
            return state
    }


    
}

export default cartReducer