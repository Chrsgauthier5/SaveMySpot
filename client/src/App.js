import React, { Component } from "react";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index"; 
import Jumbotron from "./components/Jumbotron/index";
import homebuttons from "./components/ButtonLayout/homeBtn.json";
import homeUserbuttons from "./components/ButtonLayout/homeUserBtn.json";
import homeBusbuttons from "./components/ButtonLayout/homeBusBtn.json";
import Loading from './components/Loading'
import SimpleCard from "./components/SimpleCard/SimpleCard";



class App extends Component {

  state = {
    buttons: '',
    userInfo: null
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    this.setState({ userInfo: JSON.parse(userInfo)});

  if(this.state.jwt && this.state.userInfo.businessUser){
    this.setState({buttons: homeBusbuttons}) 
  } else if (this.state.jwt && this.state.userInfo){
    this.setState({buttons: homeUserbuttons}) 
  }
  else{
    this.setState({buttons: homebuttons})
  }
}

  changeButtons = async () => {
    console.log('hello');
    await this.setState({buttons: homebuttons});
    await this.setState({userInfo: null})
  }

  render() {
    
    if(this.state.buttons){  
    return (
      
      <div>
      <Nav 
      buttons={this.state.buttons}
      userInfo={this.state.userInfo}
      changeButtons={this.changeButtons}
      page='App'
      />
      <Row>
        <Col size="md-12">
        <Jumbotron>
        <h2> Welcome to Save My Spot!</h2>
        <p> Is your To Do list a mile long? Do you hate to waste time standing in line when
          there are other things that need your attention? Save My Spot can help you make
          more productive use of your time in 3 easy steps!
        </p>
        <br/>

        <SimpleCard/>
        </Jumbotron>
        </Col>
        <Col size="md-12">
        <Jumbotron>
        <h2>Business Owners </h2>
        <p> Keep your customers and your employees happy by using Save My Spot! Customers will 
          no longer have to wait in line for your excellent services and your employees can space 
          out their customers better. 
        </p>
        </Jumbotron>
        </Col>
      </Row>
      </div>
    );
    }else{
      return <Loading />
    }
  }
}

export default App;
