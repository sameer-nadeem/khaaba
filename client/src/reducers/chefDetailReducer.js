import { CHEF_ANALYTICS_SUCCESS, CHEF_ANALYTICS_FAIL, CHEF_OWN_DETAILS_SUCCESS, CHEF_OWN_DETAILS_FAIL, CHEF_OWN_REVIEWS_SUCCESS, CHEF_OWN_REVIEWS_FAIL } from '../actions/types'

const initialState = {
    kitchenName:'',
    kitchenLogo:'',
    address :'',
    phone: '',
    activeHours : {},
    totalOrders: 0,
    kitchenAvgRating: 0,
    reviews : []
}

const chefDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case CHEF_ANALYTICS_SUCCESS:
            return {
                ...state, totalOrders: action.payload.numOrders, kitchenAvgRating: action.payload.kitchenAvgRating, loading: false
            }
        case CHEF_OWN_DETAILS_SUCCESS:
            return {
                ...state,
                kitchenName: action.payload.kitchenName,
                kitchenLogo: action.payload.kitchenLogo,
                address :action.payload.kitchenAddress,
                phone: action.payload.kitchenPhone,
                activeHours : action.payload.kitchenHours,
                 loading: false
            }
        case CHEF_OWN_REVIEWS_SUCCESS:
            return {
                ...state, reviews: action.payload.kitchenReviews, kitchenAvgRating: action.payload.avgRating, loading: false
            }
        case CHEF_OWN_REVIEWS_FAIL:
        case CHEF_OWN_DETAILS_FAIL:
        case CHEF_ANALYTICS_FAIL:
            return state
        default:
            return state
    }
}


export default chefDetailReducer