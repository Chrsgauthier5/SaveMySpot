import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import Nav from "../components/Nav/index";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import api from "../services/api";

class userPage extends Component {
  state = {
    jwt: "",
    userInfo: null,
    buttons,
    isLoaded: false,
    inLine: null,
    business: null
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const database = await api.call('get', 'business/showBis')
    this.setState({business: database});

    const userInfo = await sessionStorage.getItem('userInfo');
    // await const user = api.call('get', 'auth/', {})
    this.setState({ userInfo: JSON.parse(userInfo), isLoaded: true });

    
  }

  toggleSpot = event => {
    event.preventDefault();
    api.call("put", "business/toggle", {email: this.state.userInfo.email})
    .then((res) => {
      console.log(res.toggleUser.nModified)
      if (this.state.userInfo.inLine) {
        this.setState({...this.state.userInfo, inLine: false})
        console.log(this.state.userInfo);
      }
      else {
        this.setState({...this.state.userInfo, inLine: true})
        console.log(this.state.userInfo);
      }





    //   let userInfoCopy = {...this.state.userInfo}
    //   console.log(userInfoCopy);
    //   (userInfoCopy.inLine) ? userInfoCopy.inLine = false : userInfoCopy.inLine = true;
    //   console.log(userInfoCopy);
    // //   if (res.toggleUser.nModified === 1) this.setState({userInfo.inLine: !toggle})
    // // }
  })
    .catch(err => console.log(err));
  
}



  render() {
    const {jwt, userInfo, isLoaded, business} = this.state;
    console.log(business);
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
                {(userInfo.inLine) ? <button className="save" onClick={this.toggleSpot}>Stop Waiting in Line</button> : <button className="save" onClick={this.toggleSpot}>Save My Spot!</button>} 
              </Jumbotron>
            </Col>
            <Col size="md-6">
              <Jumbotron>
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
