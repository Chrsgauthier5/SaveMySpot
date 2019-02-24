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
        login: "Login",
        display: true
      },
      {
        id: 2,
        signUp: "Sign Up",
        display: true
      },
      {
        id: 3,
        home: "Home",
        display: false
      },
      {
        id: 4,
        logout: "Logout",
        display: false
      }
    ];
    return (
      
      <div>
      this.prop 
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
