import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const AddDish = () =>{
    return(
        <div>

<div className="container-fluid AddDish-container">
        <div className="row justify-content-center pt-5">
            <div className="col-md-5 col-sm-8">
                <div className="card AddDish-card">

                    <div className="card-body">


                        <form className="m-4">

                            <h5 className="card-title text-center adddish-heading mt-3">Add Dish</h5>
                            <div className=" col-12 dimage-container ">
                                
                            <img className="dishimage" src="/img/icons/white.png" alt="Dish preview"/>
                            

                            <div className="middle">
                                
                                
                                <div className="camera-container">
                                    <a className="edit-link" href="#">
                                       <img className="camera" src="/img/icons/camera.png" alt="" srcset=""/>
                                      <div className="edit-cam-txt">Edit</div> 
                                   </a>
                                   </div>

                              </div>

                            </div>

                            <div className="row justify-content-center align-items-center pb-3">


                                <div className="col">
                                    Instant khaaba?
                                    
                                </div>
                                <div className="col text-end">
                                    <label className="switch">
                                        <input type="checkbox"/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group row ">

                                
                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Dish Name</label>
                                    <input type="text" className="form-control login-fields" id="DishName" placeholder="e.g. Beef Burger"/>
                                </div>
                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Expiry Time</label>
<br/>
                                        <input className="time" type="time" id="appt" name="appt" min="1:00" max="12:00" required/>

                                </div>
                            </div>

                            <div className="form-group row">

                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Price</label>

                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">PKR</span>
                                        <input type="text" className="form-control login-fields" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" placeholder="e.g. 500"/>
                                    </div>
                                </div>
                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Servings</label>
                                    <input type="text" className="form-control login-fields" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="e.g. 4"/>

                                </div>
                            </div>
                            <div className="form-group m-1 mb-3">
                                <label for="exampleInputPassword1" className="login-field-headings">Description</label>
                                <input type="text" className="form-control login-fields" id="exampleInputPassword1"
                                    placeholder="e.g. The best burger you can find....."/>
                            </div>
                            <div className="form-group m-1 mb-3">
                                <label className="AddDish-field-headings"> Categories <div className="row text-center mt-4">
                                    <div className="AddDish-field-subheadings">Select all that apply</div>
                                </div></label>

                            </div>
                            <div>

                            <input type="checkbox" className="hidden" name="cb1" id="cb1"/><label for="cb1"><div className="row justify-content-center">Appetizers</div></label>
                            <input type="checkbox" className="hidden" name="cb2" id="cb2"/><label for="cb2"><div className="row justify-content-center">Pizza</div></label>
                            <input type="checkbox" className="hidden" name="cb3" id="cb3"/><label for="cb3"><div className="row justify-content-center">Burger</div></label>
                            <input type="checkbox" className="hidden" name="cb4" id="cb4"/><label for="cb4"><div className="row justify-content-center">Dessert</div></label>
                        </div>
                        <div>

                            <input type="checkbox" className="hidden" name="cb5" id="cb5"/><label for="cb5"><div className="row justify-content-center">Salad</div></label>
                            <input type="checkbox" className="hidden" name="cb6" id="cb6"/><label for="cb6"><div className="row justify-content-center">Desi</div></label>
                            <input type="checkbox" className="hidden" name="cb7" id="cb7"/><label for="cb7"><div className="row justify-content-center">Beverage</div></label>
                            <input type="checkbox" className="hidden" name="cb8" id="cb8"/><label for="cb8"><div className="row justify-content-center">Baked</div></label>
                        </div>


                        <div className="row justify-content-center">
                            <button type="submit" className="btn login-form-btn">Save</button>
                        </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        

        </div>

      
    )
}

export default AddDish