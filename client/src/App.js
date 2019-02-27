import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index"; 
import Jumbotron from "./components/Jumbotron/index";
import buttons from "./components/Buttons.json"

class App extends Component {

  state = {
    buttons
  };

  render() {
    
      
    return (
      
      <div>
      <Nav buttons={this.state.buttons}/>
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
