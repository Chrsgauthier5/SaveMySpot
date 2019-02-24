import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
