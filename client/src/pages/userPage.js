import React, { Component } from 'react'
import buttons from "../components/userBtn.json";
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
        <h2> Join the wait list for Haircuts by Chris</h2>
        <p> The wait time is currently: </p>
        <button className="save">Save My Spot</button>
        {/* <div class="container">
          <h2> this displays after Save My Spot button is clicked </h2>
        <h2>You are # (number from db) in line</h2>
        <h2>Current wait time is: </h2>
        </div> */}
        
        </Jumbotron>
        </Col>
        <Col size="md-6">
        <Jumbotron>
          {/* <h2>this displays after Save My Spot button is clicked </h2> */}
        <h2>You are #   in line</h2>
        <h2>Current wait time is: </h2>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    )
  }
}

export default userPage
