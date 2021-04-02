import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/forms/Register";
import setAuthToken from './util/setAuthToken'
import { loadUser } from './actions/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import history from './util/history'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

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
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
