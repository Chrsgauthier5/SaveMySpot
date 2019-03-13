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
    firstNameLastName: "",
    inLine: ""
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    await this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    await this.setState({ userInfo: JSON.parse(userInfo) });
    await this.setState({firstNameLastName: this.state.userInfo.firstname + " " + this.state.userInfo.lastname})
    
    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });
    console.log(this.state.businessInfo);

    const userDBInfo = await api.call("get", "auth/");
    const filtered = userDBInfo.filter(
      obj => obj.email === this.state.userInfo.email
    );
    console.log(filtered[0].email);

    await this.setState({ userInfo: filtered[0] });

    businessInfo[0]["waitlist"].indexOf(filtered[0].email) > -1
      ? this.setState({ inLine: true })
      : this.setState({ inLine: false });

    this.state.jwt && this.state.userInfo
      ? await this.setState({ isLoaded: true })
      : await this.setState({ loggedIn: false });
  }

  saveSpot = async event => {
    const { businessInfo, userInfo } = this.state;
    await api.call("put", "auth/toggle", this.state.userInfo);
    const email = userInfo.email;
    const waitlist = await api.call("get", "business/displayWaitList"); //array of current waitlist
    await api.call("put", "business/addWaitList", {
      biz: businessInfo,
      user: userInfo
    });
    const updatedBusinessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: updatedBusinessInfo, inLine: true });
  };

  stopWaiting = async event => {
    const { businessInfo, userInfo } = this.state;
    // const firstNameLastName = userInfo.firstname + " " + userInfo.lastname;
    // const waitlist = await api.call("get", "business/displayWaitList"); //array of current waitlist
    await api.call("put", "business/removeWaitList", {
      biz: businessInfo,
      user: userInfo
    });
    const updatedBusinessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: updatedBusinessInfo, inLine: false });
  };

  currentWaitTime() {
    const { businessInfo, firstNameLastName } = this.state;
    if (businessInfo[0].waitlist.length === 0) {
      return <p> No one is in line!</p>;
    } else if (businessInfo[0].waitlist.indexOf(firstNameLastName) === -1) {
      return (
        <p>
          The current wait time is{" "}
          {businessInfo[0].waitlist.length * businessInfo[0].waitTime}
        </p>
      );
    } else {

      if ((businessInfo[0].waitlist.indexOf(firstNameLastName) * businessInfo[0].waitTime) === 0) {
        return <p>You are the first one in line - get over here!</p>;
      } else {
        return (
          <p>
            Your current wait time is{" "}
            {businessInfo[0].waitlist.indexOf(firstNameLastName) *
              businessInfo[0].waitTime}
          </p>
        );
      }
    }
  }

  changeButtons = async () => {
    // do not delete this
    console.log("hello");
  };

  render() {
    const {
      jwt,
      userInfo,
      isLoaded,
      loggedIn,
      inLine,
      businessInfo,
      firstNameLastName
    } = this.state;

    if (loggedIn && isLoaded) {
      return (
        <div>
          <Nav
            buttons={buttons}
            userInfo={userInfo}
            changeButtons={this.changeButtons}
          />
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
                {inLine ? (
                  <h2>
                    You are #{" "}
                    {businessInfo[0].waitlist.indexOf(firstNameLastName) + 1} in
                    line
                  </h2>
                ) : (
                  <h2 />
                )}
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
