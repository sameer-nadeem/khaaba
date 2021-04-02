import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
const Register = ({ register }) => {

    const [registerFields, setRegisterFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        phone: '',
        address: '',
        password: '',
        password2: '',
    })

    const {
        firstName,
        lastName,
        email,
        city,
        phone,
        address,
        password,
        password2
    } = registerFields

    const [errors, setErrors] = useState({})

    const validateInputs = () => {
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

        if (password === '') {
            errs.password = 'Password cannot be empty'

        }

        if (password !== password2) {
            errs.password2 = "Passwords don't match"
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

    const onChange = (e) => {
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('hh')
        if (validateInputs()) {
            console.log('winwin')
            register(registerFields)
        }
    }


    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center pt-5">
                <div className="col-md-7 col-lg-5 col-sm-8">
                    <div className="card login-card mb-4">
                        <div className="card-body">
                            <form onSubmit={onSubmit} className="m-4">
                                <div className="row justify-content-center align-items-center mb-3">
                                    <div className="col">
                                        <span className="align-midde">Are you a Chef?
                                    </span>
                                    </div>
                                    <div className="col text-end">
                                        <label className="switch">
                                            <input onChange={onChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>

                                <h5 className="card-title text-center login-heading mt-3">Sign Up</h5>

                                <div className="form-group row ">
                                    <div className="col m-1">
                                        <label className="login-field-headings">First Name</label>
                                        <input onChange={onChange} type="text" className="form-control login-fields" name='firstName' placeholder="etc. Sameer" />
                                    </div>
                                    <div className="col m-1">
                                        <label className="login-field-headings">Last Name</label>
                                        <input onChange={onChange} type="text" className="form-control login-fields" name='lastName'
                                            placeholder="etc. Nadeem" />

                                    </div>
                                    <span className='text-danger ms-1'>{errors.name}</span>

                                </div>
                                <div className="form-group m-1">
                                    <label className="login-field-headings">Email</label>
                                    <input onChange={onChange} className="form-control login-fields" name='email'
                                        placeholder="user@example.com" />
                                    <span className='text-danger'>{errors.email}</span>
                                </div>
                                <div className="form-group row">

                                    <div className="col m-1">
                                        <label className="login-field-headings">Phone Number</label>

                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">+92</span>
                                            <input onChange={onChange} type="text" className="form-control login-fields" name='phone'
                                                placeholder="etc. 090078601" />
                                        </div>
                                        <span className='text-danger'>{errors.phone}</span>

                                    </div>
                                    <div className="col m-1">
                                        <label className="login-field-headings">City</label>
                                        <input onChange={onChange} type="text" className="form-control login-fields" name='city'
                                            placeholder="etc. Lahore" />
                                        <span className='text-danger'>{errors.city}</span>

                                    </div>
                                </div>
                                <div className="form-group m-1 mb-3">
                                    <label className="login-field-headings">Address</label>
                                    <input onChange={onChange} type="text" className="form-control login-fields" name='address'
                                        placeholder="etc. LUMS, PHASE V, DHA" />
                                    <span className='text-danger'>{errors.address}</span>

                                </div>
                                <div className="form-group m-1 mb-3">
                                    <label className="login-field-headings">Password</label>
                                    <input onChange={onChange} type="password" className="form-control login-fields" name='password'
                                        placeholder="Password" />
                                    <span className='text-danger'>{errors.password}</span>

                                </div>
                                <div className="form-group m-1 mb-3">
                                    <label className="login-field-headings">Confirm Password</label>
                                    <input onChange={onChange} type="password" className="form-control login-fields" name='password2'
                                        placeholder="Password" />
                                    <span className='text-danger'>{errors.password2}</span>

                                </div>


                                <div className="row justify-content-center">
                                    <button type="submit" className="btn login-form-btn">Sign Up</button>
                                </div>
                                <div className="row text-center mt-4">
                                    <div className="">Don't have an account? <Link to='/login'>Sign In!</Link></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { register })(Register)
