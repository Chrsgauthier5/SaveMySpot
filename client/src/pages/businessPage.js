import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import SimpleTable from "../components/Table/index";
import Loading from "../components/Loading";
import api from "../services/api";
import EnhancedTable from "../components/EnhancedTable/EnhancedTable";

class businessPage extends Component {
  state = {
    buttons,
    businessInfo: null,
    userInfo: null,
    busUserInfo: null,
    isLoaded: false
  };

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
    console.log("12");
    console.log(this.state.businessInfo);
    // console.log(this.state.userInfo);
    if (this.state.isLoaded) {
      return (
        <div>
          <Nav 
          userInfo={this.state.busUserInfo}
          buttons={buttons}
          changeButtons={this.changeButtons}
           />
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
                {/* <SimpleTable busInfo={this.state.businessInfo} /> */}
                <EnhancedTable busInfo={this.state.businessInfo} />


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

