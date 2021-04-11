import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";

import Home from "./components/layout/Home";


import ChefOrder from './components/layout/ChefOrders'
import ChefOrderHistory from './components/layout/ChefOrderHistory'
import Login from './components/layout/Login'
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/auth'
import { ToastContainer } from 'react-toastify';
import Spinner from './components/layout/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import history from './util/history'
<<<<<<< HEAD
<<<<<<< HEAD
import CustomerOrders from "./components/layout/CustomerOrders";
=======
import {addToCart,loadCart} from './actions/customer'
=======
import CheckoutSuccess from './components/layout/Checkout'

>>>>>>> 6370a37174af95e4dec34a398a4fb13a52effae1

>>>>>>> 0c7bfa17daa8a11c5a6a3b3a4b12406297cbd995

// import { toast } from 'react-toastify'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (!localStorage.cart){

  localStorage.setItem('cart',JSON.stringify({kitchenID:0,
                                              khaabay:[]}))
}
<<<<<<< HEAD



if (localStorage.token) {
  setAuthToken(localStorage.token);
}




=======
>>>>>>> 0c7bfa17daa8a11c5a6a3b3a4b12406297cbd995

const Dashboard = () => (<h1>Hello</h1>)

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(addToCart('6060e763bb69f004ab5db929','6060ebe6ebf5ef4e98b38637',2,60,'Thai Noodles'))
    // store.dispatch(addToCart(1,12344,2,60,'TNoodles'))
    // store.dispatch(addToCart(1,12344,2,60,'Thigh'))

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
          <Route exact path="/home" component={Home} />
          <Route exact path="/chef/orders" component={ChefOrder} />
          <Route exaxt path='/chef/order-history' component={ChefOrderHistory} />
          <Route exaxt path='/customer/orders' component={CustomerOrders} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
