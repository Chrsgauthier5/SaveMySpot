import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import SimpleTable from "../components/Table/index";
import Loading from "../components/Loading";
import api from "../services/api";

class businessPage extends Component {
  state = {
    buttons,
    businessInfo: null,
    userInfo: null,
    isLoaded: false
  };

  async componentDidMount() {
    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });

    const userInfo = await api.call("get", "auth/");
    await this.setState({ userInfo: userInfo });

    this.state.businessInfo && this.state.userInfo
      ? this.setState({ isLoaded: true })
      : this.setState({ isLoaded: false });
  }

  // function to add new user to array above
  // parameter is newUser is taken in
  addUserFn = newUser => {
    console.log(newUser);
    // give new user a unique id
    newUser.id = Math.random();
    // make copy of original array - note spread operator ... equates to the three names above
    let users = [...this.state.users, newUser];
    this.setState({
      // original state array gets new array assigned to it
      users: users
    });
  };

  // delete user fn
  deleteUserFn = id => {
    console.log(id);
    // use filter to remove speific varibale
    let users = this.state.users.filter(user => {
      // if true below it will be added to new array
      return user.id !== id;
    });
    this.setState({
      users: users
    });
  };

  render() {
    console.log("12");
    console.log(this.state.businessInfo);
    // console.log(this.state.userInfo);
    if (this.state.isLoaded) {
      return (
        <div>
          <Nav buttons={buttons} />
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h2>
                  {" "}
                  Welcome Haircuts by Chris! Here is a list of your customers:
                  {/* {this.state.userInfo.map(user => {
                    return user.firstname + user.lastname
                  })} */}
                </h2>

                {/* <p> Jeff and Chris' code here </p> */}
                {/* <button className="save">Save My Spot</button> */}
                {/* <SimpleTable /> */}
                <SimpleTable busInfo={this.state.businessInfo} />


                {/* <p> Jeff and Chris' code here </p> */}
                {/* <button className="save">Save My Spot</button> */}
                {/* adding userlist display and functiona for business  */}
                {/* pass the delete org function in below */}
                {/* pass in the array above below
                <Users
                  deleteUserFn={this.deleteUserFn}
                  users={this.state.users}
                />
                {/* pass in the function above below */}
                {/* <AddUser addUserFn={this.addUserFn} />  */}

              </Jumbotron>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default businessPage;
