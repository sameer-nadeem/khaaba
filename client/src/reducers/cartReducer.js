import {ADD_CART, REMOVE_CART} from '../actions/types'
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
            
    
        default:
            return state
    }


    
}

export default cartReducer