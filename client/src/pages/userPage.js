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
    businessInfo: null,
    buttons,
    isLoaded: false,
    loggedIn: true,
    inLine: false
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    await this.setState({ jwt: jwt });
    
    const userInfo = await sessionStorage.getItem("userInfo");
    await this.setState({ userInfo: JSON.parse(userInfo) });

    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });

    // const userInfo = await api.call("get", "auth/");
    // await this.setState({ userInfo: userInfo });

    (this.state.jwt && this.state.userInfo) ? await this.setState({isLoaded: true}) : await this.setState({loggedIn: false});
  }


  saveSpot = async event => {
    const toggle = await api.call('put', 'auth/toggle', this.state.userInfo);
    if(toggle.toggleUser.nModified) {
      let lineStatus = this.state.inLine;
      this.setState({inLine: !lineStatus});
    }
  }


  render() {
    const {jwt, userInfo, isLoaded, loggedIn, inLine, businessInfo} = this.state;
    
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
                <p> The wait time is currently: {businessInfo[0].waitTime} </p>
                {(!inLine) ? <button className="save" onClick={this.saveSpot}>Save My Spot</button> : <button className="save" onClick={this.saveSpot}>Stop Waiting</button>}
          
              </Jumbotron>
            </Col>
            <Col size="md-6">
              <Jumbotron>

                {(inLine) ? <h2>You are # in line</h2> : <h2></h2>}
                <h3>Current Waiting List</h3>
                {businessInfo[0].waitlist.map(ppl => <p>{ppl}</p>)}
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
