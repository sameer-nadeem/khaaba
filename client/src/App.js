import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";
import Login from './components/layout/Login'
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/auth'
import { ToastContainer } from 'react-toastify';
import Spinner from './components/layout/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import history from './util/history'


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
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
