import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute'
import ChefRoute from './components/routing/ChefRoute'
import AdminRoute from './components/routing/AdminRoute'
import CustomerRoute from './components/routing/CustomerRoute'

import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";
import ChefHome from "./components/layout/ChefHome";
import BarChart from "./components/layout/tables/barChartFirst"

import AdminRegister from "./components/forms/AdminRegister";
import Home from "./components/layout/Home";


import ChefMenu from "./components/layout/ChefMenu";
import AddDish from "./components/layout/AddDish";
import EditDish from "./components/layout/EditDish";

import AboutUs from "./components/layout/AboutUs";


import EditProfileChef from "./components/layout/EditProfileChef";
import EditProfileCust from "./components/layout/EditProfileCust";



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
import AdminLogin from './components/layout/AdminLogin'
import Reviewscrsl from "./components/layout/tables/ReviewsBar";

import SearchResults from './components/layout/SearchResults'
import Kitchen from './components/layout/Kitchen'
import Kitchens from './components/layout/Kitchens'
import InstantKhaaba from './components/layout/InstantKhaaba'
import Search from './components/layout/Search'

import ConfirmCheckout from './components/layout/ConfirmCheckout'




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
          <Route exact path="/" component={Home} />
          <CustomerRoute exact path='/checkout/success' component={CheckoutSuccess} />
          <Route exact path="/signup" component={Register} />
          <AdminRoute exact path="/admin" component={AdminRegister} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about-us" component={AboutUs} />
          <ChefRoute exact path="/chef/orders" component={ChefOrder} />
          <ChefRoute exact path="/chef" component={ChefHome} />
          <Route exact path="/rc" component={Reviewscrsl} />
          <ChefRoute exact path='/chef/order-history' component={ChefOrderHistory} />
          <CustomerRoute exact path='/customer/orders' component={CustomerOrders} />
          <Route exact path='/login/admin' component={AdminLogin} />
          <ChefRoute exact path='/chef/menu' component={ChefMenu} />
          <ChefRoute exact path='/chef/adddish' component={AddDish} />
          <ChefRoute exact path='/chef/editdish' component={EditDish} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/all-kitchens' component={Kitchens} />
          <Route exact path='/instant-khaaba' component={InstantKhaaba} />
          <Route exact path='/kitchen/:id' component={Kitchen} />
          <CustomerRoute exact path='/customer/confirm-checkout' component={ConfirmCheckout} />
          <ChefRoute exact path="/chef/edit-profile" component={EditProfileChef} />
          <CustomerRoute exact path="/customer/edit-profile" component={EditProfileCust} />
          <ChefRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
