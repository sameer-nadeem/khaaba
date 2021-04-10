
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