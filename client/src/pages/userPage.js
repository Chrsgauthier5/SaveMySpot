import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import buttons from "../components/ButtonLayout/userBtn.json";
import Nav from "../components/Nav/index";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Loading from "../components/Loading";
import api from "../services/api";
import { userInfo } from "os";

class userPage extends Component {
  state = {
    jwt: null,
    userInfo: null,
    businessInfo: null,
    buttons,
    isLoaded: false,
    loggedIn: true,
    inLine: ""
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    await this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    await this.setState({ userInfo: JSON.parse(userInfo) });
    console.log(this.state.userInfo);
    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });

    const userDBInfo = await api.call("get", "auth/");
    const filtered = userDBInfo.filter(obj => obj.email === this.state.userInfo.email )

    await this.setState({inLine: filtered[0].inLine, userInfo: filtered[0]});
    console.log(this.state.userInfo);
    // await this.setState({ userInfo: userInfo });

    this.state.jwt && this.state.userInfo
      ? await this.setState({ isLoaded: true })
      : await this.setState({ loggedIn: false });
  }

  saveSpot = async event => {
    const { businessInfo, userInfo } = this.state;
    await api.call("put", "auth/toggle", this.state.userInfo);
    const email = userInfo.email;
    const waitlist = await api.call("get", "business/displayWaitList"); //array of current waitlist
    if (waitlist.indexOf(email) > -1) {
      return alert("You are already on the waitlist!");
    } else {
      await api.call("put", "business/addWaitList", {
        biz: businessInfo,
        user: userInfo
      });
      const updatedBusinessInfo = await api.call("get", "business/showBis");
      await this.setState({ businessInfo: updatedBusinessInfo, inLine: true });

      // const toggle = await api.call("put", "auth/toggle", this.state.userInfo); // toggles inLine field or User Collection
      // if (toggle.toggleUser.nModified) {
      //   this.setState({ inLine: true });
      //   this.addWaitlist();
      // }
    }
  };
  stopWaiting = async event => {
    const { businessInfo, userInfo } = this.state;
    const email = userInfo.email;
    console.log(email);
    const waitlist = await api.call("get", "business/displayWaitList"); //array of current waitlist
    console.log(waitlist);
    if (waitlist.indexOf(email) === -1) {
      return alert("You aren't on the waitlist");
    } else {
      await api.call("put", "business/removeWaitList", {
        biz: businessInfo,
        user: userInfo
      });
      const updatedBusinessInfo = await api.call("get", "business/showBis");
      await this.setState({ businessInfo: updatedBusinessInfo, inLine: false });
    }
  };

  currentWaitTime() {
    const {businessInfo, userInfo} = this.state;
    if (businessInfo[0].waitlist.length === 0){
      return <p> No one is in line!</p>
    }
    else if (businessInfo[0].waitlist.indexOf(userInfo.email) === -1){
      return <p>The current wait time is {(businessInfo[0].waitlist.length) * 10}</p>
    }
    else {
      return <p>Your current wait time is {businessInfo[0].waitlist.indexOf(userInfo.email) * 10} </p>
    }
  }

  render() {
    const {
      jwt,
      userInfo,
      isLoaded,
      loggedIn,
      inLine,
      businessInfo
    } = this.state;

    
    if (loggedIn && isLoaded) {
      return (
        <div>
          <Nav buttons={buttons} userInfo={userInfo} />
          <Row>
            <Col size="md-6">
              <Jumbotron>
                <h2> Join the wait list for {businessInfo[0].businessName}</h2>
                {this.currentWaitTime()}
               
                
                
                {!inLine ? (
                  <button className="save" onClick={this.saveSpot}>
                    Save My Spot
                  </button>
                ) : (
                  <button className="save" onClick={this.stopWaiting}>
                    Stop Waiting
                  </button>
                )}
              </Jumbotron>
            </Col>
            <Col size="md-6">
              <Jumbotron>
                {inLine ? <h2>You are #  {(businessInfo[0].waitlist.indexOf(userInfo.email) + 1)} in line</h2> : <h2 />}
                <h3>Current Waiting List</h3>
                {businessInfo[0].waitlist.map(ppl => (
                  <p>{ppl}</p>
                ))}
              </Jumbotron>
            </Col>
          </Row>
        </div>
      );
    } else if (!loggedIn) {
      alert("You are not logged in!");
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

export default userPage;
