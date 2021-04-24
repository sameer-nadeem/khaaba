import React, { Fragment, useEffect, useState } from 'react'
import { postCheckout } from '../../../actions/customer'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'


// import moment from 'moment'
import axios from 'axios'

const CartDishes = ({ cart, postCheckout, auth }) => {

    const totalCalc = (cart) => {
        let total = 0
        cart.khaabay.forEach(element => {
            total += element.price
        });
        return total
    }

    const clickFunc = () => {

        postCheckout(auth)
    }





    return (
        <div className="dropdown">
            {/* <i class="fa fa-2x fa-shopping-cart" aria-hidden="true"></i> */}
            <input type="image" className="icon" src="/img/icons/cart.png" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
            <div className="dropdown-menu dropdown-menu-end drpdown" aria-labelledby="dropdownMenuButton1">
                <div className=" card cart-card" aria-labelledby="dropdownMenuButton1">
                    <div className="card-body">
                        <div className="cart-heading">Shopping cart</div>
                        {cart.khaabay.map((khaaba, khaabaIDX) => (

                            <div className=" card cart-card2">
                                <div className="card-body d-flex text-center">
                                    <div className="row justify-content-start">

                                        <div className="row justify-content-between">
                                            <div className="col-10">
                                                <ul className="cart-list text-start">
                                                    <li className="cart-info">{khaaba.title}</li>
                                                    <li className="cart-info-price">PKR {khaaba.price}</li>
                                                </ul>
                                            </div>
                                            <div className="col-2 text-end price dish-count" >
                                                <div className="btn-group d-flex text-end" role="group" aria-label="Basic example">
                                                    {/* <button type="button" className="counter-button-left" >+</button> */}
                                                    <span className="">Quantity:{khaaba.quantity}</span>
                                                    {/* <button type="button" className="counter-button-right" >-</button> */}
                                                </div>  </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row pt-2">
                            <div className="col text-start">
                                <div className="cart-info">
                                    Total
                    </div>
                            </div>
                            <div className="col text-end">
                                <div className="cart-info-price">
                                    {totalCalc(cart)}
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <Link to={`/customer/confirm-checkout`}>
                            <button className="button button-checkout button-sm" >Checkout</button>
                            </Link>
                            {/* <button className="button button-checkout button-sm" onClick={clickFunc} >Checkout</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )



}

const mapStatesToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStatesToProps, { postCheckout })(CartDishes)

