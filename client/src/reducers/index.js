import { combineReducers } from 'redux'
import auth from './auth'
<<<<<<< HEAD
import chefReducer from './chefReducer'
import customerReducer from './customerReducer'
export default combineReducers({
    auth, chefOrders: chefReducer, customerOrders: customerReducer
=======
import cartReducer from './cartReducer'
export default combineReducers({
    auth,cart:cartReducer
>>>>>>> 0c7bfa17daa8a11c5a6a3b3a4b12406297cbd995
})