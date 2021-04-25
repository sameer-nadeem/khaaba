import { GET_KITCHEN_REVIEWS_SUCCESS ,
    GET_KITCHEN_REVIEWS_FAIL } from '../actions/types'

const initialState = {
    kitchenReviews: [],
    KitchenID: 0,
    loading: true
}

const userViewKitchenReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_REVIEWS_SUCCESS :
            return {
                ...state, kitchenReviews: action.payload, KitchenID:action.kitchenID, loading: false
            }

        case GET_KITCHEN_REVIEWS_FAIL:
            return state
        default:
            return state
    }
}


export default userViewKitchenReducer
