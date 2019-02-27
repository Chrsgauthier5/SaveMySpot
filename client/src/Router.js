import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import User from "./pages/userPage";
import Business from "./pages/businessPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
      <Route path="/business" component={Business} />
    </Switch>
  </BrowserRouter>
);

export default Router;
