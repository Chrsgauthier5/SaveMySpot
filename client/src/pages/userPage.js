import React, { Component } from 'react'
import buttons from "../components/Buttons.json"
import Nav from "../components/Nav/index";
import { Col, Row, Container } from "../components/Grid/index"; 
import Jumbotron from "../components/Jumbotron/index";

class userPage extends Component {

    state = {
        buttons
    }



  render() {
    return (
      <div>
      <Nav buttons={buttons}/>  
      <Row>
        <Col size="md-6">
        <Jumbotron>
        <h1> User Page Info (data here)</h1>
        </Jumbotron>
        </Col>
        <Col size="md-6">
        <Jumbotron>
        <h1>Data here - open to formatting</h1>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    )
  }
}

export default userPage
