import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";

import Home from "./components/layout/Home";

import ChefMenu from "./components/layout/ChefMenu";
import AddDish from "./components/layout/AddDish";


import ChefOrder from './components/layout/ChefOrders'
import ChefOrderHistory from './components/layout/ChefOrderHistory'
import Login from './components/layout/Login'
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/auth'
import { ToastContainer } from 'react-toastify';
import Spinner from './components/layout/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import history from './util/history'

import CustomerOrders from "./components/layout/CustomerOrders";
import { addToCart, loadCart } from './actions/customer'
import CheckoutSuccess from './components/layout/Checkout'




if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (!localStorage.cart) {

  localStorage.setItem('cart', JSON.stringify({
    kitchenID: 0,
    khaabay: []
  }))
}



if (localStorage.token) {
  setAuthToken(localStorage.token);
}





const Dashboard = () => (<h1>Hello</h1>)

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadCart())
  }, [])


  return (
    <Provider store={store}>
      <Router history={history}>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route exact path='/checkout/success' component={CheckoutSuccess} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/chef/orders" component={ChefOrder} />
          <Route exaxt path='/chef/order-history' component={ChefOrderHistory} />
          <Route exaxt path='/customer/orders' component={CustomerOrders} />
          <Route exaxt path='/chef/menu' component={ChefMenu} />
          <Route exaxt path='/chef/adddish' component={AddDish} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />

        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
