import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";
<<<<<<< HEAD

import Home from "./components/layout/Home";

=======
import ChefOrder from './components/layout/ChefOrders'
import ChefOrderHistory from './components/layout/ChefOrderHistory'
>>>>>>> 7f7e6fe33556922b067a4be05bda43b3a57db689
import Login from './components/layout/Login'
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/auth'
import { ToastContainer } from 'react-toastify';
import Spinner from './components/layout/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import history from './util/history'
import CustomerOrders from "./components/layout/CustomerOrders";

// import { toast } from 'react-toastify'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}



const Dashboard = () => (<h1>Hello</h1>)

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Provider store={store}>
      <Router history={history}>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
<<<<<<< HEAD
          <Route exact path="/home" component={Home} />
=======
          <Route exact path="/chef/orders" component={ChefOrder} />
          <Route exaxt path='/chef/order-history' component={ChefOrderHistory} />
          <Route exaxt path='/customer/orders' component={CustomerOrders} />
>>>>>>> 7f7e6fe33556922b067a4be05bda43b3a57db689
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
