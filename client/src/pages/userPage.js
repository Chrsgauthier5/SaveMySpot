import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import buttons from "../components/ButtonLayout/userBtn.json";
import Nav from "../components/Nav/index";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Loading from "../components/Loading";
import api from "../services/api";

class userPage extends Component {
  state = {
    jwt: null,
    userInfo: null,
    buttons,
    isLoaded: false,
    loggedIn: true
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    await this.setState({ jwt: jwt });

    const userInfo = await api.call("get", "auth/");
    await this.setState({ userInfo: userInfo });

    (this.state.jwt && this.state.userInfo) ? await this.setState({isLoaded: true}) : await this.setState({loggedIn: false});
  }


  render() {
    const {jwt, userInfo, isLoaded, loggedIn} = this.state;
    console.log(loggedIn)
    console.log(isLoaded);
    if (loggedIn && isLoaded) {
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
    else if (!loggedIn){
      alert('You are not logged in!');
      return <Redirect to="/login" />
    }
    else{
      return <Loading />
    }
  }
}

export default userPage;
