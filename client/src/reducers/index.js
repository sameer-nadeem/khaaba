import { combineReducers } from 'redux'
import auth from './auth'
import cartReducer from './cartReducer'
import chefReducer from './chefReducer'
import customerReducer from './customerReducer'
export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer
})
