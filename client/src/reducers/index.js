import { combineReducers } from 'redux'
import auth from './auth'
import cartReducer from './cartReducer'
import chefReducer from './chefReducer'
import customerReducer from './customerReducer'
<<<<<<< HEAD
import searchReducer from './searchReducer'
export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer, search: searchReducer
=======
import chefDetailReducer from './chefDetailReducer'
import userKitchenReducer from './userKitchenReducer'
export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer, cart: cartReducer, chefDetails: chefDetailReducer ,kitchenReviews: userKitchenReducer
>>>>>>> 08b352b79b3bd606e71c3901f094aa79b39086ea
})
