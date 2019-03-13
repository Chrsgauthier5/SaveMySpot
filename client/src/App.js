import React, { Component } from "react";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index"; 
import Jumbotron from "./components/Jumbotron/index";
import homebuttons from "./components/ButtonLayout/homeBtn.json";
import homeUserbuttons from "./components/ButtonLayout/homeUserBtn.json";



class App extends Component {

  state = {
    buttons: homebuttons,
    userInfo: null
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    this.setState({ userInfo: JSON.parse(userInfo)});

  (this.state.jwt && this.state.userInfo) ? this.setState({buttons: homeUserbuttons}) : this.setState({buttons: homebuttons})
  }

  changeButtons = async () => {
    console.log('hello');
    await this.setState({buttons: homebuttons});
  }

  render() {
    
      
    return (
      
      <div>
      <Nav 
      buttons={this.state.buttons}
      userInfo={this.state.userInfo}
      changeButtons={this.changeButtons}
      />
      <Row>
        <Col size="md-6">
        <Jumbotron>
        <h2> Welcome to Save My Spot!</h2>
        <p> Is your To-Do list a mile long? Do you hate waiting in line when
          you know you have a million other things you need to do?  Check the wait 
          on your local business and sign into
          Save My Spot to save your place in line!
        </p>
        </Jumbotron>
        </Col>
        <Col size="md-6">
        <Jumbotron>
        <h2>Business Owners </h2>
        <p> Keep your customers and your employees happy by using Save My Spot! Customers will 
          no longer have to wait in line for your excellent services and your employees can space 
          out their customers better. This is good for:
          Auto Service, barbers, nail salons, etc... 
        </p>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;