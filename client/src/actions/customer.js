import {
    ACTIVE_ORDERS_CUSTOMER_FAIL,
    ACTIVE_ORDERS_CUSTOMER_SUCCESS,
    COMPLETE_ORDERS_CUSTOMER_FAIL,
    COMPLETE_ORDERS_CUSTOMER_SUCCESS,
    GET_KITCHEN_REVIEWS_SUCCESS ,
    GET_KITCHEN_REVIEWS_FAIL 
} from './types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ADD_CART, REMOVE_CART, CHECKOUT_FAIL, CHECKOUT_SUCCESS } from './types'
import history from '../util/history'

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




export const postCheckout = (isAuthenticated) => async dispatch => {
    let cart = JSON.parse(localStorage.cart)
    if (!isAuthenticated) {
        toast.error('You are not Signed in')
        return
    }
    if (cart.kitchenID !== 0) {
        try {
            const res = await axios.post('/api/user/order', cart,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            localStorage.setItem('cart', JSON.stringify({
                kitchenID: 0,
                khaabay: []
            }))
            dispatch({
                type: CHECKOUT_SUCCESS,
            })
            history.push('/checkout/success')
            toast.success('Succesfully Ordered')

        }
        catch (error) {
            console.log(error)
            dispatch({
                type: CHECKOUT_FAIL,
            })
            toast.error("Server error!")
        }
    } else {

        toast.error('Your Cart is Empty!')
    }
}


export const addToCart = (kitchenID, khaabaID, quantity, price, title) => dispatch => {

    let cart = JSON.parse(localStorage.cart)
    let check = false
    for (let i = 0; i < cart.khaabay.length; i++) {
        if (cart.khaabay[i].khaaba === khaabaID) {
            check = true

        }
    }

    if (kitchenID !== cart.kitchenID && cart.kitchenID !== 0 && cart.khaabay.length > 0) {
        toast.error('You can only order from one kitchen at a time')
        return
    }

    if (check === true) {
        toast.error('Item already in Cart')
        return

    }
    cart.kitchenID = kitchenID
    cart.khaabay.push({
        khaaba: khaabaID,
        price: price,
        title,
        quantity
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success('Successfully Added')
    dispatch({
        type: ADD_CART,
        payload: cart
    })
    return

}

export const removekhaaba = (khaabaID) => dispatch => {

    let cart = JSON.parse(localStorage.cart)


    for (let i = 0; i < cart.khaabay.length; i++) {
        if (cart.khaabay[i].khaaba === khaabaID) {
            cart.khaabay.splice(i, 1)

        }
    }

    if (cart.khaabay.length === 0) {
        cart = {
            kitchenID: 0,
            khaabay: []
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch({
        type: ADD_CART,
        payload: cart
    })

    return
}


export const decreasecounter = (khaabaID) => dispatch => {

    let cart = JSON.parse(localStorage.cart)


    for (let i = 0; i < cart.khaabay.length; i++) {
        if (cart.khaabay[i].khaaba === khaabaID) {
            if (cart.khaabay[i].quantity > 1) {
                cart.khaabay[i].quantity = cart.khaabay[i].quantity - 1


            }


        }

    }

    localStorage.setItem('cart', JSON.stringify(cart))

    dispatch({
        type: ADD_CART,
        payload: cart
    })

    return


}




export const increasecounter = (khaabaID) => dispatch => {

    let cart = JSON.parse(localStorage.cart)


    for (let i = 0; i < cart.khaabay.length; i++) {
        if (cart.khaabay[i].khaaba === khaabaID) {
            cart.khaabay[i].quantity = cart.khaabay[i].quantity + 1
            console.log(`REACHED`)

        }

    }

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch({
        type: ADD_CART,
        payload: cart
    })
    return


}




export const loadCart = () => dispatch => {
    let cart = JSON.parse(localStorage.cart)
    dispatch({
        type: ADD_CART,
        payload: cart
    })
}

export const getKitchenReviews = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/user/view-reviews/${id}`)
        dispatch({
            type: GET_KITCHEN_REVIEWS_SUCCESS,
            payload: res.data,
            kitchenID: id
        })
    }
    catch (error) {
        dispatch({
            type: GET_KITCHEN_REVIEWS_FAIL
        })
        console.log(error.message)
        toast.error("Server error!")
    }

}



