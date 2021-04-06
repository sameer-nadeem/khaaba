import React from 'react'
import LoginForm from '../forms/LoginForm'
const Login = () => {
    return (
        <div className="login-container">

            <div className="container-fluid">

                <div className="row justify-content-center pt-3">
                    <div className="col-md-6 col-lg-4 pt-5 col-sm-8">
                        <div className="card login-card">

                            <div className="card-body">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
