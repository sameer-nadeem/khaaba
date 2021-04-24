import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {editInstant, editNormal} from '../../actions/editdishAction'


const EditDish = ({editInstant, editNormal}) =>{

    const dish = JSON.parse(sessionStorage.getItem("DISH"))

    console.log("this is what I received from session: ",dish)

    const [dishDetails, setdishDetails] = useState({
        title: dish.title,
        dishPicture: null,
        expiryTime: '',
        description: dish.description,
        price: dish.price,
        categories:[],
        isInstantKhaaba: false,
        servings: dish.instantKhaaba.availableServings,
        khaabaID: dish._id,
    })

    // const [picUrl, setpicUrl] = useState('{`/uploads/dish-thumbnails/${dish.thumbnail}`}')

    // const onPicChange = (newUrl) =>{
    //     setpicUrl(`/img/icons/${newUrl}`)
    // }

    // var temp_categories = []
    const [temp_categories, settemp_categories] = useState([])

    // const [toggle, setToggle] = useState(false)

    const [fileName, setFileName] = useState('')



    const [errors, setErrors] = useState({})

    // const onToggle = () => {

    //     setdishDetails({
    //         ...dishDetails,
    //         isInstantKhaaba: !toggle
    //     })
    //     setToggle(!toggle)
    // }

    const onChange = (e) => {
        console.log(e.target.name)
        setdishDetails({
            ...dishDetails,
            [e.target.name]: e.target.value
        })

    }


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(` sending this to backend  ${dishDetails.title}`)



        if (validateInputs()) {
            if (dish.instantKhaaba.isInstant) {
                console.log(dishDetails)
                editInstant(dishDetails)
            }
            else {
                console.log(dishDetails)
                editNormal(dishDetails)
            }
        }
    }


    const validateInputs = ()=>{
        setErrors({})
        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }

        const errs = {}

        if (dishDetails.title === '') {
            errs.title = 'Dish name cannot be left empty'

        }

        if (dishDetails.price === 0 || dishDetails.price =='') {
            errs.price = 'Price field cannot be left empty and must be a number'

        }


        if ((dish.instantKhaaba.isKhaaba && dishDetails.servings === 0) ||(dish.instantKhaaba.isKhaaba && isNumeric(dishDetails.servings))) {
            errs.servings = 'servings field cannot be left empty and must be a number'
        }

        if (dishDetails.description == '') {
            errs.description = 'description field cannot be left empty'
        }





        console.log(errs)

        if (Object.keys(errs).length === 0) {
            console.log('nn')
            return true;
        }

        setErrors({
            ...errs
        })


        return false

    }

    const logoSelect = (e) => {
        console.log('selecting new pic for dish!!!!')
        // setFileName(e.target.files[0].name)
        setFileName(e.target.files[0].name)
        setdishDetails({
            ...dishDetails, dishPicture: e.target.files[0]
        })

        // onPicChange(e.target.files[0].name)
    }

    const insertCatergories = (e) =>{


        

        // setdishDetails({
        //     ...dishDetails,
        //     categories: [...categories, `${e.target.name}`]
        // })

        settemp_categories([...temp_categories, e.target.name])
        console.log( temp_categories)
        setdishDetails({
            ...dishDetails,
            categories: [...temp_categories]
        })
    }


    ////////////////////////////////////////////////////////////////

    return(
        <div>

<div className="container-fluid AddDish-container">
        <div className="row justify-content-center pt-5">
            <div className="col-md-5 col-sm-8">
                <div className="card AddDish-card">

                    <div className="card-body">


                        <form onSubmit={onSubmit}className="m-4">

                            <h5 className="card-title text-center adddish-heading mt-3">Edit Dish</h5>
                            <div className=" col-12 dimage-container ">
                                
                            <img className="dishimage" src={`/uploads/dish-thumbnails/${dish.thumbnail}`} alt="Dish preview"/>
                            

                            <div className="middle">
                                
                                

                            <input type="file" accept="image/*" id="file" name='logo' className="file" onChange={logoSelect} />
                            <label className="text-center" htmlFor="file">
                            <a >
                                       <img className="camera" src="/img/icons/camera.png" alt="" srcset=""/>
                                      <div className="edit-cam-txt">Change</div> 
                                   </a>

                            </label>

                              </div>
                                <div><div>{fileName}</div></div>
                            </div>

                            <div className="form-group row ">

                            
                                <div className="col m-1">
                                {/* <div className="AddDish-field-subheadings">* If any field is left empty there will be no chages done to it</div> */}
                                    <label for="exampleInputEmail1" className="login-field-headings">Dish Name</label>
                                    <input type="text" className="form-control login-fields" onChange={onChange} name="title" defaultValue={dish.title}/>
                                    <span className='text-danger'>{errors.title}</span>
                                </div>

                                {
                                    dish.instantKhaaba.isInstant &&

                                    <Fragment>
                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Expiry Time</label>
<br/>
                                        <input defaultValue={"1:00"} className="time" type="time"  onChange={onChange} name="expiryTime" min="1:00" max="12:00" required/>

                                </div>
                                </Fragment>
                                }
                            </div>

                            <div className="form-group row">

                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Price</label>

                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">PKR</span>
                                        <input name='price' defaultValue={dish.price} onChange={onChange} type="text" className="form-control login-fields" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" placeholder="e.g. 500"/>
                                            <span className='text-danger'>{errors.price}</span>
                                    </div>
                                </div>
                                {
                                    dish.instantKhaaba.isInstant &&

                                <Fragment>
                                <div className="col m-1">
                                    <label for="exampleInputEmail1" className="login-field-headings">Servings</label>
                                    <input defaultValue={dish.instantKhaaba.availableServings} name='servings' onChange={onChange} type="text" className="form-control login-fields" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="e.g. 4"/>
                                        <span className='text-danger'>{errors.servings}</span>

                                </div>
                                </Fragment>
}
                            </div>
                            <div className="form-group m-1 mb-3">
                                <label for="exampleInputPassword1" className="login-field-headings" >Description</label>
                                <input defaultValue={dish.description} name='description' onChange={onChange} type="text" className="form-control login-fields" id="exampleInputPassword1"
                                    placeholder="e.g. The best burger you can find....."/>
                                    <span className='text-danger'>{errors.description}</span>
                            </div>
                            
                            <div className="form-group m-1 mb-3">
                                <label className="AddDish-field-headings"> Categories <div className="row text-center mt-4">
                                    <div className="AddDish-field-subheadings">Select all that apply</div>
                                </div></label>

                            </div>
                            <div>

                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Appetizers" id="cb1"/><label for="cb1"><div className="row justify-content-center">Appetizers</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Pizza" id="cb2"/><label for="cb2"><div className="row justify-content-center">Pizza</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Burger" id="cb3"/><label for="cb3"><div className="row justify-content-center">Burger</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Dessert" id="cb4"/><label for="cb4"><div className="row justify-content-center">Dessert</div></label>
                        </div>
                        <div>

                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Salad" id="cb5"/><label for="cb5"><div className="row justify-content-center">Salad</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Desi" id="cb6"/><label for="cb6"><div className="row justify-content-center">Desi</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Beverage" id="cb7"/><label for="cb7"><div className="row justify-content-center">Beverage</div></label>
                            <input onChange={insertCatergories}type="checkbox" className="hidden" name="Baked" id="cb8"/><label for="cb8"><div className="row justify-content-center">Baked</div></label>
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

export default connect(null, {editInstant, editNormal})(EditDish)