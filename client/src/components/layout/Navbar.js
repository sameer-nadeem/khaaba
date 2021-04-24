import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import CartDishes from "./tables/CartDishes";

const Navbar = ({ isAuthenticated, type, logout }) => {
  const location = useLocation();
  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            KHAABA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 text-center">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  <span
                    className={location.pathname === "/" && "nav-link-active"}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all-kitchens" className="nav-link">
                  <span
                    className={
                      location.pathname === "/all-kitchens" && "nav-link-active"
                    }
                  >
                    Kitchens
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  <span
                    className={
                      location.pathname === "/about-us" && "nav-link-active"
                    }
                  >
                    About Us
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link instant-khaaba-link"
                  to="instant-khaaba"
                >
                  <span>Instant Khaaba</span>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 text-center align-items-center">
              {!isAuthenticated && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <span className="login-btn">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      <span className="signup-btn">Signup</span>
                    </Link>
                  </li>
                </Fragment>
              )}

              {type !== "chef" && (
                <li className="nav-item">
                  <span className="nav-link">
                    <CartDishes auth={isAuthenticated} />
                  </span>
                </li>
              )}

              {
                type === "chef" &&
                <li class="nav-item">
                  <Link to = "/chef/menu">
                <a class="menu">Menu</a>
                </Link>
            </li>
              }




              {isAuthenticated && (
                <Fragment>
                  {" "}
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to=""
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="icon-dropdown"
                        src="/img/icons/man.png"
                        alt=""
                      />
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-start"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/${type}/edit-profile`}
                        >
                          <img
                            className="icon-dropdown pe-2"
                            src="/img/icons/carbon_settings.png"
                            alt=""
                          />
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`/${type}/orders`}>
                          <img
                            className="icon-dropdown pe-2"
                            src="/img/icons/orders.png"
                            alt=""
                          />
                          My Orders
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={() => logout()}
                          className="dropdown-item"
                          to=""
                        >
                          <img
                            className="icon-dropdown pe-2"
                            src="/img/icons/logout.png"
                            alt=""
                          />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.user ? state.auth.user.type : null,
  };
};

export default connect(mapStatesToProps, { logout })(Navbar);
