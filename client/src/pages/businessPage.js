import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import Loading from "../components/Loading";
import api from "../services/api";
import { number } from "prop-types";

class businessPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    buttons,
    businessInfo: null,
    userInfo: null,
    busUserInfo: null,
    isLoaded: false,
    businessName: "",
    numWaiting: 0,
    waitTime: 0
  };

  async componentDidMount() {
    const businessInfo = await api.call("get", "business/showBis");
    await this.setState({ businessInfo: businessInfo });

    const userInfo = await api.call("get", "auth/");
    await this.setState({ userInfo: userInfo });

    const busUserInfo = await sessionStorage.getItem("userInfo");
    await this.setState({ busUserInfo: JSON.parse(busUserInfo) });

    if (this.state.businessInfo && this.state.userInfo)
      this.setState({ isLoaded: true });
  }

  changeButtons = async () => {
    // do not delete this
    console.log("hello");
  };

  deleteUser = async e => {
    try {
      const index = e.target.id;
      const waitlist = this.state.businessInfo[0].waitlistUserInfo;
      const removeuser = waitlist[index];
      const response = await api.call("put", "business/removeWaitlist", {
        user: removeuser,
        biz: this.state.businessInfo
      });
      console.log(response);
      if (response.waitArrayUserInfo.nModified) {
        const businessInfo = await api.call("get", "business/showBis");
        await this.setState({ businessInfo: businessInfo });
      }
    } catch (err) {
      console.log(err);
      err.message = "Could not add this user";
      alert(err.message);
    }
  };

  addUser = async event => {
    //we need this to log the form data to our DB
    event.preventDefault();
    const { firstname, lastname, email, number } = this.state;
    try {
      const response = await api.call("put", "business/addWaitList", {
        user: {
          firstname,
          lastname,
          number,
          email
        },
        biz: this.state.businessInfo
      });
      console.log(response);
      if (response.waitArrayUserInfo.nModified) {
        const businessInfo = await api.call("get", "business/showBis");
        await this.setState({ businessInfo: businessInfo });
        await this.setState({firstname: '', lastname: '', email: '', number: ''})
      }
    } catch (err) {
      console.log(err);
      err.message = "Could not add this user";
      alert(err.message);
    }
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const {
      businessInfo,
      isLoaded,
      firstname,
      lastname,
      email,
      number
    } = this.state;
    console.log(businessInfo);
    if (isLoaded) {
      return (
        <div>
          <Nav buttons={buttons} />
          <Jumbotron>
            <h2>
              {" "}
              Welcome Haircuts by Chris! Here is a list of your customers:
            </h2>
            <hr />
            <Row>
              <Col size="md-12">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Remove</th>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessInfo[0].waitlistUserInfo.map(
                      function(user, i) {
                        return (
                          <tr>
                            <td>
                              <button
                                className="btn btn-danger"
                                id={i}
                                onClick={this.deleteUser}
                              >
                                <i id={i} className="fas fa-trash-alt" />
                              </button>
                            </td>
                            <td scope="row">{i + 1}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                          </tr>
                        );
                      }.bind(this)
                    )}
                  </tbody>
                </table>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col size="md-12">
                <form onSubmit={this.addUser}>
                  <div class="form-check form-check-inline col-md-2.5">
                    <label for="firstname">First</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      placeholder="John"
                      value={firstname}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-check form-check-inline col-md-2.5">
                    <label for="lastname">Last</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder="Doe"
                      value={lastname}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-check form-check-inline col-md-2.5">
                    <label for="email">Email </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="JohnDoe@yahoo.com"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-check form-check-inline col-md-2.5">
                    <label for="cell">Number</label>
                    <input
                      type="input"
                      className="form-control"
                      name="number"
                      placeholder="603-568-3995"
                      value={number}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info"
                    disabled={!(firstname && lastname && email && number)}
                  >
                    Add Customer
                  </button>
                </form>
              </Col>
            </Row>
          </Jumbotron>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default businessPage;
