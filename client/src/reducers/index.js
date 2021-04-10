import { combineReducers } from 'redux'
import auth from './auth'
import chefReducer from './chefReducer'

export default combineReducers({
    auth, chefOrders: chefReducer
})