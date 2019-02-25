import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index"; 
import Jumbotron from "./components/Jumbotron/index";

class App extends Component {
  render() {
    const buttons = [
      {
        id: 1,
        name: "Home",
        display: false,
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
        display: true,
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
      <Nav buttons={buttons}/>
      <Row>
        <Col size="md-6">
        <Jumbotron>
        <h1> SaveMySpot Product Info</h1>
        </Jumbotron>
        </Col>
        <Col size="md-6">
        <Jumbotron>
        <h1>SaveMySpot Demo</h1>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;
