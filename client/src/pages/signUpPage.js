import React, { Component } from "react";
import Nav from "../components/Nav/index";
import Form from "../components/Form/index";

export class signUpPage extends Component {
  render() {
    const buttons = [
      {
        id: 1,
        name: "Home",
        display: true,
        link: "/",
        color: "primary"
      },
      {
        id: 2,
        name: "Login",
        display: true,
        link: "/login",
        color: "info"
      },
      {
        id: 3,
        name: "Sign Up",
        display: false,
        link: "/signUp",
        color: "warning"
      },
      {
        id: 4,
        name: "Logout",
        display: false,
        link: "/",
        color: "danger"
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

export default signUpPage;
