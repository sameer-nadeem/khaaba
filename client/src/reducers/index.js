import { combineReducers } from 'redux'
import auth from './auth'
import cartReducer from './cartReducer'
export default combineReducers({
    auth,cart:cartReducer
})