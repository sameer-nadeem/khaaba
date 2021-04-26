import React, { useEffect } from 'react'
import RegisterForm from '../forms/RegisterForm'
import { connect } from 'react-redux'
import history from '../../util/history'

const Register = ({ auth }) => {
    console.log(auth)
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/')
        }
    }, [auth])
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Register)
