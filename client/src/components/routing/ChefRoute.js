import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
const ChefRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.loading ? <Spinner /> :
                !auth.isAuthenticated ? (
                    <Redirect to="/login" />
                ) :
                    auth.user.type === 'chef' ?
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

ChefRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ChefRoute);
