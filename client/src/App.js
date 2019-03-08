import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav/index";
import { Col, Row, Container } from "./components/Grid/index"; 
import Jumbotron from "./components/Jumbotron/index";
import buttons from "./components/Buttons.json"

import Users from './Users';
import AddUser from './AddUser';

class App extends Component {

  state = {
    buttons,

    users : [
      { username: 'Ivan Lane', useremail: 'ivan@yahoo.com', id: 1},
      { username: 'Jane Smith', useremail: 'jane@gmail.com', id: 2},
      { username: 'Johh Davis', useremail: 'john@gmail.com', id: 3}
    ]

  };

  // function to add new user to array above
  // parameter is newUser is taken in
  addUserFn = (newUser) => {
    console.log(newUser)
    // give new user a unique id
    newUser.id = Math.random();
    // make copy of original array - note spread operator ... equates to the three names above
    let users = [...this.state.users, newUser] 
    this.setState({
      // original state array gets new array assigned to it
      users: users
    })
  }

  // delete user fn
  deleteUserFn = (id) => {
    console.log(id)
    // use filter to remove speific varibale
    let users = this.state.users.filter(user => {
      // if true below it will be added to new array
      return user.id !== id
    });
    this.setState({
      users: users
    })
  }

  render() {
    
      
    return (
      
      <div>
      <Nav buttons={this.state.buttons}/>
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
          out their customers better. This is app is helpful for:
          Auto Service, barbers, nail salons, etc... 
        </p>
{/* adding userlist display and functiona for business  */}
            {/* pass the delete org function in below */}
            {/* pass in the array above below */}
            <Users deleteUserFn={this.deleteUserFn} users={this.state.users}/>
            {/* pass in the function above below */}
            <AddUser addUserFn={this.addUserFn}/>


        </Jumbotron>
        </Col>
      </Row>
      </div>
    );
  }
}

export default App;
