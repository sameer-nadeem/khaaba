import { combineReducers } from 'redux'
import auth from './auth'
import cartReducer from './cartReducer'
import chefReducer from './chefReducer'
import customerReducer from './customerReducer'
import searchReducer from './searchReducer'
export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer, search: searchReducer
})
