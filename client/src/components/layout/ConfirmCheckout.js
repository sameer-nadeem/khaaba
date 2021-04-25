import React, { Fragment, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { postCheckout,increasecounter,decreasecounter,removekhaaba} from '../../actions/customer'
import {editprofile_customer } from '../../actions/editcustAction'
const Displaycheckout = ({cart, postCheckout,isAuthenticated,increasecounter,decreasecounter,removekhaaba,profile,editprofile_customer}) => {
    


    
  // [profileAddress, setprofileAddress] = React.useState('')
    const [checked, setchecked] = React.useState(false)
    const [SaveAllow, setSaveAllow] = useState(true)
    const [totalcost, settotal] = useState(true)
    const [defcheck, setdefcheck] = useState(false)
    const [error_address, seterror_address] = useState('')
    const [registerFields, setRegisterFields] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        city: profile.address.city,
        phone: profile.phone,
        address: '',
        //password: profile.password,
    })
    const {
        firstName,
        lastName,
        email,
        city,
        phone,
        address,
        //password,
    } = registerFields



    const clickFunc = (e) => {
        if(address!='' && totalCalc(cart)!==0)
        {
    
            editprofile_customer(registerFields)
        postCheckout(isAuthenticated)
        }
        else if (totalCalc(cart) <=0)
        {
            
            toast.error(`Cart Empty`)
        }
        else{
            seterror_address(`Address can not be empty`)

        }

    }

    const totalCalc = (cart) => {
        let total = 0
        cart.khaabay.forEach(element => {
            total += (element.price*element.quantity)
        });
        //settotal(total)
        return total
    }

    const DefaultAddress= (e) => {
        if(e.target.checked){
            setdefcheck(true)
        setRegisterFields({
            ...registerFields,
            address: profile.address.addr
        })
    }
    else {setdefcheck(false)}

    }
    const editAddress= (e) => {

        seterror_address('')
        //console.log(`value`,e.value)
        console.log(`profile address`, address)
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        })
        
    console.log(`here is address`,registerFields.address)
       
      
       //console.log(profileAddress)

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
            
            )
            )}
            <br/>
                            <tr>
                                    
                                    <td>{}</td>
                                    <td className="bold color-orange">Total:</td>
                                    <td>{totalCalc(cart)}</td>
                                </tr>
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
                                <input type="text" className="form-control checkout-fields"
                                    placeholder="" name='address' onChange={editAddress} value={address} disabled={defcheck}/>
                                    <span className='text-danger '>{error_address}</span>
                            </div>
                            
                        </div>
                       
                        <input type="button"  className="checkout-confirm-btn" onClick={clickFunc} value="Confirm" />
      
                        
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

export default connect(mapStatesToProps, { postCheckout,increasecounter,decreasecounter,removekhaaba,editprofile_customer })(Displaycheckout)