import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Link } from 'react-router-dom'

const LoginForm = ({ login }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(false)
    const onPassChange = (e) => {
        setPassword(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onToggle = (e) => {
        setToggle(!toggle)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login({
            email,
            password,
            type: toggle ? 'chef' : 'customer'
        })
    }



    return (
        <form onSubmit={onSubmit} className="p-4">
            <div className="row justify-content-center align-items-center pb-3">
                <div className="col">
                    <span className="align-middel">Are you a Chef?</span>
                </div>
                <div className="col text-end">
                    <label className="switch">
                        <input onChange={onToggle} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <h5 className="card-title text-center login-heading pt-3">Sign In</h5>
            <div className="form-group pb-3">
                <label className="login-field-headings">Email</label>
                <input onChange={onEmailChange} type="email" name='email' className="form-control login-fields" placeholder="Enter email" />
            </div>
            <div className="form-group pb-3">
                <label className="login-field-headings">Password</label>
                <input onChange={onPassChange} type="password" name='password' className="form-control login-fields" placeholder="Password" />
            </div>
            <div className="row justify-content-center">
                <button type="submit" className="btn login-form-btn">Login</button>
            </div>
            <div className="row text-center pt-4">
                <div className="">Don't have an account? <Link to="/signup">Sign Up!</Link></div>
            </div>
        </form>
    )
}

export default connect(null, { login })(LoginForm)
