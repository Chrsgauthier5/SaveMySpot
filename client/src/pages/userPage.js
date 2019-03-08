import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import Nav from "../components/Nav/index";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";

class userPage extends Component {
  state = {
    jwt: "",
    userInfo: null,
    buttons,
    isLoaded: false
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    this.setState({ userInfo: JSON.parse(userInfo), isLoaded: true });
  }

  render() {
    const {jwt, userInfo, isLoaded} = this.state;
    console.log(userInfo);
    if (isLoaded) {
      return (
        <div>
          <Nav 
          buttons={buttons} 
          userInfo={userInfo}
          />
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
                <h2>You are # in line</h2>
                <h2>Current wait time is: </h2>
              </Jumbotron>
            </Col>
          </Row>
        </div>
      );
    }
    else{
      return <h4>Loading...</h4>
    }
  }
}

export default userPage;
