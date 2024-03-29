import {POPULAR_KITCHENS_SUCCESS, POPULAR_KITCHENS_FAIL} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getPopularKitchens = () => async dispatch => {

    try {
const res= await axios.get('/api/recommendations/bylocation/31.400336002423533/74.25881050587961')
dispatch ({
type: POPULAR_KITCHENS_SUCCESS,
payload :res.data.chefs


}
)

console.log(res.data)
}

    catch (error)
    {
        dispatch({
            type: POPULAR_KITCHENS_FAIL
        })

        toast.error ("Location Error")
    }


}