import React, { Component } from 'react'
import buttons from "../components/userBtn.json";
import BusPage from "../components/BusinessNav/index";
import { Col, Row, Container } from "../components/Grid/index"; 
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import SimpleTable from "../components/Table/index";

class businessPage extends Component {

    state = {
        buttons
    }



    render() {
      return (
        <div>
        <Nav buttons={buttons}/>  
        <Row>
          <Col size="md-12">
          <Jumbotron>
          <h2> Welcome Haircuts by Chris! Here is a list of your customers:</h2>
          {/* <p> Jeff and Chris' code here </p> */}
          {/* <button className="save">Save My Spot</button> */}
          <SimpleTable/>
          </Jumbotron>
          </Col>
          {/* <Col size="md-6">
          <Jumbotron>
          <h1>Data here - open to formatting</h1>
          </Jumbotron>
          </Col> */}
        </Row>
        </div>
      )
    }
  }

export default businessPage