import React from 'react'
import RegisterForm from '../forms/RegisterForm'
const Register = () => {
    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center pt-5">
                <div className="col-md-7 col-lg-5 col-sm-8">
                    <div className="card login-card mb-4">
                        <div className="card-body">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
