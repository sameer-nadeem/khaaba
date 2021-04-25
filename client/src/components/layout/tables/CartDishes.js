import React, { Fragment, useEffect, useState } from 'react'
import { postCheckout } from '../../../actions/customer'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'


// import moment from 'moment'
import axios from 'axios'

const CartDishes = ({ cart, postCheckout, isAuthenticated }) => {

    const totalCalc = (cart) => {
        let total = 0
        cart.khaabay.forEach(element => {
            total += (element.price*element.quantity)
        });
        return total
    }

    const clickFunc = () => {

        postCheckout(isAuthenticated)
    }





    return (
        <div className="dropdown">
            {/* <i class="fa fa-2x fa-shopping-cart" aria-hidden="true"></i> */}
            <input type="image" className="icon" src="/img/icons/cart.png" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
            <div className="dropdown-menu dropdown-menu-end b-check " aria-labelledby="dropdownMenuButton1">
                <div className="hamza-card" aria-labelledby="dropdownMenuButton1">
                    <div className="card-body">
                        <div className="cart-heading  pb-3">Shopping cart</div>
                        {cart.khaabay.map((khaaba, khaabaIDX) => (

                            <div className=" card cart-card2 mb-2">
                                <div className="p-3 ">
                                    

                                        <div className="row justify-content-start">
                                            
                                                <ul className="cart-list text-start">
                                                    <li className="cart-info">{khaaba.title}</li>
                                                    <li className="cart-info-price">PKR {khaaba.price}</li>
                                                </ul>
                                            

                                    </div>
                                    <div className="row d-flex justify-content-end " >
                                                
                                                {/* <button type="button" className="counter-button-left" >+</button> */}
                                                <div className="col-8 justify-content-end color-orange text-end" style={{right:"0"}}>Quantity: {khaaba.quantity}</div>
                                                {/* <button type="button" className="counter-button-right" >-</button> */}
                                           </div>
                                    
                                </div>
                            </div>
                        ))}
                        <div className="row pt-2 justify-content-end">
                            <div className="col text-end">
                       
                            </div>
                            <div className="col text-end px-3">
                            <div className="cart-info">
                                    <span className="bold">Total :</span> <span className="regular">PKR {totalCalc(cart)}</span> 
                    </div>
                                <div className="cart-info-price">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center pt-3">
                            <Link to={`/customer/confirm-checkout`}>
                            <button className="button button-checkout button-sm p-2" style={{width:"300px"}} >Checkout</button>
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
        cart: state.cart,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStatesToProps, { postCheckout })(CartDishes)

