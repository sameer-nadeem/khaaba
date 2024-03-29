import { combineReducers } from 'redux'
import auth from './auth'
import cartReducer from './cartReducer'
import chefReducer from './chefReducer'
import customerReducer from './customerReducer'
import searchReducer from './searchReducer'
import chefDetailReducer from './chefDetailReducer'
import userKitchenReducer from './userKitchenReducer'
// export default combineReducers({
//     auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer,

export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer, chefDetails: chefDetailReducer, kitchenReviews: userKitchenReducer, search: searchReducer
})
