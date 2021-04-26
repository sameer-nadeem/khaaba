import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'
//import { Toast } from 'react-toastify/dist/components'
import { editprofile_customer, passchange_customer } from '../../actions/editcustAction'
import history from '../../util/history'
const EditProfileCust = ({ profile, editprofile_customer, passchange_customer }) => {

    // const [registerFields, setRegisterFields] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     city: '',
    //     phone: '',
    //     address: '',
    //     password: '',
    // })
    const [SaveAllow, setSaveAllow] = useState(true)
    const [registerFields, setRegisterFields] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        city: profile.address.city,
        phone: profile.phone,
        address: profile.address.addr,
        //password: profile.password,
    })

    const [NewPass, setNewPass] = useState('')
    const [PassChangeFlag, setPassChangeFlag] = useState(false)
    const [ProfileChangeFlag, setProfileChangeFlag] = useState(false)


    const {
        firstName,
        lastName,
        email,
        city,
        phone,
        address,
        //password,
    } = registerFields

    const onChange = (e) => {
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        })
        //console.log("in table",registerFields, e.target.value)
        setSaveAllow(false)
        setProfileChangeFlag(true)

    }

    const passChange = (e) => {
        setPassChangeFlag(true)
        setNewPass({ password: e.target.value })
        setSaveAllow(false)

    }

    const [errors, setErrors] = useState({})
    const validatefields = () => {
        setErrors({})

        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const errs = {}

        if (firstName === '' || lastName === '') {
            errs.name = 'First Name and Last Name cannot be empty'
        }
        if (city === '') {
            errs.city = 'City cannot be empty'
        }
        if (address === '') {
            errs.address = 'Address cannot be empty'
        }
        if (!isNumeric(phone) || phone === '') {
            errs.phone = 'Invalid phone number'
        }


        if (!emailRegex.test(email)) {
            errs.email = 'Invalid email entered'
        }


        console.log(errs)

        if (Object.keys(errs).length === 0) {
            //console.log('nn')
            return true;
        }

        setErrors({
            ...errs
        })


        return false

    }
    const [PassErrors, setPassErrors] = useState({})
    const validatepassword = () => {
        setPassErrors({})
        const errs = {}
        //console.log(`new password`,NewPass.password)
        if (NewPass.password.length < 6) {
            errs.password = 'Password must contain atleast 6 characters'

        }
        if (NewPass.password === '' || NewPass.password === "") {
            //console.log(`reached here`)
            errs.password = 'Password cannot be empty'
        }

        if (Object.keys(errs).length === 0) {
            //console.log('nn')
            return true;
        }
        setPassErrors({
            ...errs
        })
        return false

    }

    const onSubmit = (e) => {
        e.preventDefault()
        //set allow == false
        //console.log(`in on submit`,registerFields)
        if (SaveAllow === false) {
            if (ProfileChangeFlag === true) {
                if (validatefields() === true) {
                    editprofile_customer(registerFields)

                }
                else {
                    toast.error('Profile Edit Unsuccessful')
                }

            }
            if (PassChangeFlag === true) {
                if (validatepassword() === true) {
                    passchange_customer(NewPass)
                }

            }

            setSaveAllow(true)
            setNewPass('')
        }


    }



    //console.log(registerFields)
    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center pt-5">
                <div className="col-md-7 col-lg-5 col-sm-8">
                    <div className="card login-card mb-4">

                        <div className="card-body">

                            <form className="m-4">

                                <h5 className="card-title text-center login-heading mt-3">Edit Profile</h5>

                                <div className="form-group row">
                                    <div className="col m-1">
                                        <label className="login-field-headings">First Name</label>
                                        <div className="input-group">
                                            <input type="text" onChange={onChange} className="form-control login-fields" name='firstName' defaultValue={firstName}
                                            />
                                            <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                        </div>


                                    </div>
                                    <div className="col m-1">
                                        <label className="login-field-headings">Last Name</label>

                                        <div className="input-group">
                                            <input type="text" onChange={onChange} className="form-control login-fields" name='lastName' defaultValue={lastName} />
                                            <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                        </div>



                                    </div>
                                    <span className='text-danger '>{errors.name}</span>
                                </div>
                                <div className="form-group m-1">
                                    <label className="login-field-headings">Email</label>

                                    <div className="input-group">
                                        <input type="email" onChange={onChange} className="form-control login-fields" name='email' defaultValue={email}
                                        />

                                        <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                    </div>
                                    <span className='text-danger '>{errors.email}</span>
                                </div>
                                <div className="form-group row">

                                    <div className="col m-1">
                                        <label className="login-field-headings">PhoneNumber</label>

                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">+92</span>
                                            <input type="text" onChange={onChange} className="form-control login-fields" name='phone' defaultValue={phone} />
                                            <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>

                                        </div>
                                        <span className='text-danger '>{errors.phone}</span>
                                    </div>
                                    <div className="col m-1">

                                        <label className="login-field-headings">City</label>
                                        <div className="input-group">
                                            <input type="text" disabled className="form-control login-fields" name='city' defaultValue={city} />
                                            <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                        </div>
                                        <span className='text-danger '>{errors.city}</span>

                                    </div>
                                </div>
                                <div className="form-group m-1 mb-3">
                                    <label className="login-field-headings">Address</label>
                                    <div className="input-group">
                                        <input type="text" onChange={onChange} className="form-control login-fields" name='address' defaultValue={address}
                                        />
                                        <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                    </div>
                                    <span className='text-danger '>{errors.address}</span>
                                </div>
                                <div className="form-group m-1 mb-3">
                                    <label className="login-field-headings">New Password</label>

                                    <div className="input-group">
                                        <input type="password" onChange={passChange} className="form-control login-fields" name='password'
                                        />
                                        <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>
                                    </div>
                                    <span className='text-danger ms-1'>{PassErrors.password}</span>
                                </div>



                                <div className="row justify-content-center">
                                    <div className="col-sm-6  col-md-4 m-1 d-flex justify-content-center">
                                        <button type="submit" onClick={onSubmit} className="btn edit-form-btn" disabled={SaveAllow}>Save</button>
                                    </div>
                                    <div className="col-sm-6  col-md-4 m-1 d-flex justify-content-center">
                                        <button onClick={() => history.push('/')} className="btn edit-cancel-btn">Cancel</button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
const mapStatesToProps = (state) => {
    return {
        //isAuthenticated: state.auth.isAuthenticated,
        profile: state.auth.user ? state.auth.user.profile : null,
    };
};

export default connect(mapStatesToProps, { editprofile_customer, passchange_customer })(EditProfileCust);