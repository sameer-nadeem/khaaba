import {ADD_CART, REMOVE_CART} from './types'
import {toast} from 'react-toastify'
import 
{
    CHECKOUT_FAIL,
    CHECKOUT_SUCCESS
}from'./types'
import axios from 'axios'



export const getCheckout = ()=>async dispatch=>
{
    try{
        const res = await axios.post('api/user/order')
        dispatch({
            type: CHECKOUT_SUCCESS,
            payload : res.data.orders
        })
    }
    catch (error){
        dispatch({
            type: CHECKOUT_FAIL,

        })
        toast.error("Server error!")
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

