import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import User from "./pages/userPage";
import Business from "./pages/businessPage";
import api from './services/api';


const Router = () => {
  if(sessionStorage.token){
    console.log('Setting Token to session storage');
    api.setToken(sessionStorage.token);
  }
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
      <Route path="/business" component={Business} />
      <Redirect from="/*" to="/" />
    </Switch>
  </BrowserRouter>
};

export default Router;