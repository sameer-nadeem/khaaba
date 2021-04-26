import React, { useEffect } from 'react'
import RegisterForm from '../forms/RegisterForm'
import { connect } from 'react-redux'
import history from '../../util/history'
import AdminForm from '../forms/AdminForm'
const AdminLogin = ({ auth }) => {
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/')
        }
    }, [auth])
    return (
        <div className="login-container">

            <div className="container-fluid">

                <div className="row justify-content-center pt-3">
                    <div className="col-md-6 col-lg-4 pt-5 col-sm-8">
                        <div className="card login-card">

                            <div className="card-body">
                                <AdminForm />
                            </div>
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

export default connect(mapStateToProps)(AdminLogin)
