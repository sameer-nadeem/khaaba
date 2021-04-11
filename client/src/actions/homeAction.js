import { HISTORY_RECOMMENDATION_SUCCESS, HISTORY_RECOMMENDATION_FAIL } from './types'
import axios from 'axios'

export const getHistoryRecommendation=() => async dispatch => {
const res = await axios.get('/api/recommendations/byhistory')

console.log(res.data)
}