import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import Loading from "../components/Loading";
import api from "../services/api";
import AddUser from "../components/AddUser.js";
import Users from "../components/Users.js";

class businessPage extends Component {
  state = {
    buttons,
    businessInfo: null,
    userInfo: null,
    busUserInfo: null,
    isLoaded: false,
    businessName: "",
    numWaiting: 0,
    waitTime: 0,
    waitlist: [],
    users: [
      { username: 'Ivan Lane', useremail: 'ivan@yahoo.com', id: 1 },
      { username: 'Jane Smith', useremail: 'jane@gmail.com', id: 2 },
      { username: 'Johh Davis', useremail: 'john@gmail.com', id: 3 }
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

  async componentDidMount() {
    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });

    const userInfo = await api.call("get", "auth/");
    await this.setState({ userInfo: userInfo });

    const busUserInfo = await sessionStorage.getItem('userInfo')
    await this.setState({busUserInfo: JSON.parse(busUserInfo)});

    console.log(this.state.userInfo);
    this.state.businessInfo && this.state.userInfo
      ? this.setState({ isLoaded: true })
      : this.setState({ isLoaded: false });
  }

  changeButtons = async () => {
    // do not delete this
    console.log("hello");
  };

  render() {
   const {busUserInfo} = this.state;
    return (

      <div>
        <Nav buttons={buttons} />
        <Jumbotron>
          <h2> Welcome Haircuts by Chris! Here is a list of your customers:</h2>
          <Row>
            <Col size="md-12">
              {/* adding userlist display and functiona for business  */}
              {/* pass the delete org function in below */}
              {/* pass in the array above below */}

{/* ======= FIX BELOW ================  */}

              {busUserInfo}
              {/* busUserInfo.map(ppl => (
                  <p>{ppl}</p>
                )) */}
              <Users deleteUserFn={this.deleteUserFn} users={this.state.users} />
              {/* pass in the function above below */}
              <AddUser addUserFn={this.addUserFn} />

{/* =======================  */}

            </Col>
          </Row>
        </Jumbotron>
      </div>
    )
  }
}

export default businessPage;

