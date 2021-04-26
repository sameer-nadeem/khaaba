import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

const AdminForm = ({ login }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onPassChange = (e) => {
        setPassword(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }


    const onSubmit = (e) => {
        e.preventDefault()
        login({
            email,
            password,
            type: 'admin'
        })
    }



    return (
        <form onSubmit={onSubmit} className="p-4">

            <h5 className="card-title text-center login-heading mt-3">Administrator </h5>
            <h5 className="card-title text-center login-heading mt-3">Sign In </h5>

            <div className="form-group row">
                <div className="col m-1">
                    <label for="exampleInputPassword1" class="login-field-headings">Email</label>
                    <input onChange={onEmailChange} type="email" name='email' className="form-control login-fields" placeholder="Enter email" />
                </div>
                <div class="form-group m-1 ">
                    <label for="exampleInputPassword1" class="login-field-headings">Password</label>
                    <input onChange={onPassChange} type="password" name='password' className="form-control login-fields" placeholder="Password" />
                </div>
            </div>

            <div className="row justify-content-center">
                <button type="submit" class="btn login-form-btn">Login</button>
            </div>
        </form>
    )
}

export default connect(null, { login })(AdminForm)
