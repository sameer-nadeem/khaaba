import React from 'react'
import AdminForm from '../forms/AdminForm'
const AdminLogin = () => {
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

export default AdminLogin
