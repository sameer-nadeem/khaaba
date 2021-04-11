<<<<<<< HEAD
import {
    ACTIVE_ORDERS_CUSTOMER_FAIL,
    ACTIVE_ORDERS_CUSTOMER_SUCCESS,
    COMPLETE_ORDERS_CUSTOMER_FAIL,
    COMPLETE_ORDERS_CUSTOMER_SUCCESS
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'


export const getCustomerCompleteOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/order-history')

        dispatch({
            type: COMPLETE_ORDERS_CUSTOMER_SUCCESS,
            payload: res.data.orders
        })
    }
    catch (error) {
        dispatch({
            type: COMPLETE_ORDERS_CUSTOMER_FAIL
        })
        toast.error("Server error!")
    }
}


export const getCustomerActiveOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/active-orders')
        dispatch({
            type: ACTIVE_ORDERS_CUSTOMER_SUCCESS,
            payload: res.data.activeOrders
        })
    }
    catch (error) {
        dispatch({
            type: ACTIVE_ORDERS_CUSTOMER_FAIL
        })
        console.log(error.message)
        toast.error("Server error!")
    }

}
=======
import {ADD_CART, REMOVE_CART,CHECKOUT_FAIL,CHECKOUT_SUCCESS} from './types'
import {toast, ToastContainer} from 'react-toastify'
import 
{

}from'./types'
import axios from 'axios'



export const postCheckout = (isAuthenticated)=>async dispatch=>
{
    let cart = JSON.parse(localStorage.cart)
    if (!isAuthenticated) {
        toast.error('You are not Signed in')
        return
    }
    if(cart.kitchenID !== 0)
    {
    try{
        const res = await axios.post('api/user/order',cart,
        {headers: {
            'Content-Type': 'application/json'
            }})
        localStorage.setItem('cart',JSON.stringify({kitchenID:0,
            khaabay:[]}))
        dispatch({
            type: CHECKOUT_SUCCESS,
        })
        toast.success('Succesfully Ordered')

    }
    catch (error){
        dispatch({
            type: CHECKOUT_FAIL,
        })
        toast.error("Server error!")
    }
    }else{

        toast.error('Your Cart is Empty!')
    }
} 


export const addToCart =  (kitchenID, khaabaID, quantity, price, title) => dispatch =>{

 let cart = JSON.parse(localStorage.cart)

 if(kitchenID !== cart.kitchenID && cart.kitchenID !== 0 )
 {
    toast.error('You can only order from one kitchen at a time')
    return
 }
 cart.kitchenID = kitchenID
 cart.khaabay.push({
     khaaba : khaabaID,
     price : price*quantity,
     title,
     quantity
 })
 localStorage.setItem('cart',JSON.stringify(cart))
 toast.success('Successfully Added')
 dispatch({type: ADD_CART,
            payload: cart})
 return

}

export const loadCart = () => dispatch =>{
    let cart = JSON.parse(localStorage.cart)
    dispatch({type: ADD_CART,
        payload: cart})
}

>>>>>>> 0c7bfa17daa8a11c5a6a3b3a4b12406297cbd995
