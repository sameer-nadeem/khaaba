import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.loading ? <Spinner /> :
                !auth.isAuthenticated ? (
                    <Redirect to="/admin/login" />
                ) :
                    auth.user.type === 'admin' ?
                        (
                            <Component {...props} />
                        )
                        :
                        (
                            <Redirect to="/" />
                        )

        }
    />
);

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
