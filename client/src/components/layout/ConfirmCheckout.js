import React, { Fragment, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { postCheckout,increasecounter,decreasecounter,removekhaaba} from '../../actions/customer'

const Displaycheckout = ({cart, postCheckout,isAuthenticated,increasecounter,decreasecounter,removekhaaba,profile}) => {

    const clickFunc = () => {

        postCheckout(isAuthenticated)
 
    }
    const [profileAddress, setprofileAddress] = React.useState('')
    const [checked, setchecked] = React.useState(false)

    const DefaultAddress= (e) => {
        
        if(e.target.checked)
        {
            setprofileAddress(profile.address.addr)
        }
        

    }
    const editAddress= (e) => {
        
        console.log(`value`,e.value)
       setprofileAddress(e.target.value)

       console.log(profileAddress)

    }

    return (
        <div className=" login-container">
        <div className="row pt-5 px-5 mt-3">
            <div className="pb-3 col-md-6 col-12">

            {cart.khaabay.map((khaaba, khaabaIDX) => (
                <div className="row mb-2">
                    <div className="card checkout-item-card">
                        <div className="card-body">
                            <div className="row text-center">
                            
                            <img className="close-button" src="/img/icons/close.png" alt="" onClick={() => removekhaaba(khaaba.khaaba)}/>
                            
                                <span className="card-title semibold">{khaaba.title}</span>
                                <span className="text-end">PKR {khaaba.price}</span>
                                <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="counter-button-left" onClick={() => decreasecounter(khaaba.khaaba)} >-</button>
                          <button type="button" className="number-box text-center">  { ` ${khaaba.quantity} `} </button>
                          <button type="button" className="counter-button-right" onClick={() => increasecounter(khaaba.khaaba)}>+</button>
                        </div>

                            </div>
                           
                        </div>
                    </div>
                </div>

            ))}
            </div>
            <div className="col-md-6 col-12 text-center">
                <div className="card checkout-card p-4">
                    <div className="card-body">
                        <h3 className="card-title semibold">Your Order</h3>
                        <div className="table-responsive" >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price (PKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart.khaabay.map((khaaba, khaabaIDX) => (         
                                <tr>
                                    <td>{khaaba.title}</td>
                                    <td>{khaaba.quantity}</td>
                                    <td>{khaaba.price*khaaba.quantity}</td>
                                </tr>
            
            ))}
                            </tbody>
         
                        </table>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="">Order Type:</span>
                            </div>
                            <div className="col">
                                <div className="form-check form-check-inline">
             
                                    <label className="form-check-label" >Pickup</label>
                                </div>

                            </div>
                       
                        </div>
                        <div className="row text-start pt-4 ps-2">
                            <div className="mb-3">
                                <label  className="form-label">Address</label>
                                <div className="form-check float-end">
                                    <input className="form-check-input checkout-radio" type="checkbox" value=""
                                        id="flexCheckDefault" onClick={DefaultAddress}/>
                                    <span className="" style={{fontSize: "10pt" }} >
                                        Same as profile address.
                                    </span>
                                </div>
                                <input type="email" className="form-control checkout-fields" id="exampleFormControlInput1"
                                    placeholder="" onChange={editAddress} value={profileAddress}/>
                            </div>
                        </div>
                       
                        <input type="button" className="checkout-confirm-btn" onClick={clickFunc} value="Confirm"/>
      
                        
                    </div>
                </div>
            </div>
        </div>
    </div>




    )

}

const mapStatesToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        cart: state.cart,
        profile: state.auth.user ? state.auth.user.profile : null,
    }
}

export default connect(mapStatesToProps, { postCheckout,increasecounter,decreasecounter,removekhaaba })(Displaycheckout)