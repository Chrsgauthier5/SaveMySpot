import React, { Component } from "react";
import Nav from "../components/Nav/index";
import Form from "../components/Form/index";

export class LoginPage extends Component {
  render() {
    const buttons = [
      {
        login: "Login",
        display: false
      },
      {
        signUp: "Sign Up",
        display: true
      },
      {
        home: "Home",
        display: true
      },
      {
        logout: "Logout",
        display: false
      }
    ];
    return (
      <div>
        <Nav buttons={buttons} />
        Please Login to continue
        <Form />
      </div>
    );
  }
}

export default LoginPage;
