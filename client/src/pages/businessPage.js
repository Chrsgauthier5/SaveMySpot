import React, { Component } from 'react'
import buttons from "../components/ButtonLayout/userBtn.json";

import { Col, Row, Container } from "../components/Grid/index"; 
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import SimpleTable from "../components/Table/index";

import Users from '../components/Users.js';
import AddUser from '../components/AddUser.js';

class businessPage extends Component {

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
        <Nav buttons={buttons}/>  
        <Row>
          <Col size="md-12">
          <Jumbotron>
          <h2> Welcome Haircuts by Chris! Here is a list of your customers:</h2>

          {/* <p> Jeff and Chris' code here </p> */}
          {/* <button className="save">Save My Spot</button> */}
          <SimpleTable/>


            {/* <p> Jeff and Chris' code here </p> */}
            {/* <button className="save">Save My Spot</button> */}
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
      )
    }
  }

export default businessPage