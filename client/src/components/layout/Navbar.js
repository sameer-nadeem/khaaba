import Reactm, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({ isAuthenticated }) => {

    return (
        <nav className="navbar navbar-expand-md navbar-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>KHAABA</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 text-center">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'><span className="nav-link-active">Home</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/kitchens'>Kitchens</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contact-us'>Contact Us</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link instant-khaaba-link" to='instant-khaaba'><span className="">Instant
                                Khaaba</span></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 text-center align-items-center">
                        {
                            !isAuthenticated
                            &&
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>
                                        <span className="login-btn">Login</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/signup'>
                                        <span className="signup-btn">Signup</span>
                                    </Link>
                                </li>
                            </Fragment>
                        }

                        <li className="nav-item cart-icon">
                            <a className="nav-link" href='!#'>
                                <img className="icon" src="./img/icons/cart.png" alt='' />
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStatesToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStatesToProps)(Navbar)
