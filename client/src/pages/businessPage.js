import React, { Component } from "react";
import buttons from "../components/ButtonLayout/userBtn.json";
import { Col, Row, Container } from "../components/Grid/index";
import Jumbotron from "../components/Jumbotron/index";
import Nav from "../components/Nav/index";
import Loading from "../components/Loading";
import api from "../services/api";

import "./businessPage.css";


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
    waitTime: null,
    recipient: '',
    textmessage: '',
    textSendSuccess: false,
    textSendFailure: false
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

  sendDefaultText = async e => {
    const id = e.target.id
    const user = this.state.businessInfo[0].waitlistUserInfo[id]
    await this.setState({recipient: user.number, textmessage: 'Reminder! Appointment is in 5 minutes'})
    await this.sendText(e)
    
  }

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
        await this.setState({ firstname: '', lastname: '', email: '', number: '' })
      }
    } catch (err) {
      console.log(err);
      err.message = "Could not add this user";
      alert(err.message);
    }
  };



  sendText = async (e) => {
    e.preventDefault();
    const { recipient, textmessage } = this.state;
    try {
      const sendText = await api.call('post', 'business/sendText', {
        recipient,
        textmessage
      });
      if (sendText.dateCreated) this.setState({ textSendSuccess: true })
      this.setState({ recipient: '', textmessage: '' });
      setTimeout(this.hideFeedback, 5000);
    }
    catch (err) {
      console.log(err);
      this.setState({ textSendFailure: true });
      setTimeout(this.hideFeedback, 5000);
    }
  }

  hideFeedback = () => {
    this.setState({ textSendSuccess: false, textSendFailure: false })
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  changeButtons = async () => {
    // do not delete this
    console.log("hello");
  };

  changeWaitTime = async e => {
    e.preventDefault();
    const {waitTime, businessInfo} = this.state;
    try{
      const changeWait = await api.call('put', 'business/changeWait', {
        waitTime,
        businessInfo
      })
      console.log(changeWait);
      const updatedbusinessInfo = await api.call("get", "business/showBis");
      await this.setState({ businessInfo: updatedbusinessInfo, waitTime: null });
    }
    catch (err){
      console.log(err)
    }
  }

  render() {
    const {
      businessInfo,
      isLoaded,
      firstname,
      lastname,
      email,
      number,
      recipient,
      textmessage,
      textSendSuccess,
      textSendFailure,
      waitTime
    } = this.state;
    console.log(businessInfo);

    if (isLoaded) {
      return (
        <div>
          <Nav
            buttons={buttons}
            changeButtons={this.changeButtons}
          />
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
                      <th scope="col">Number</th>
                      <th scope="col">Send Text</th>
                    </tr>
                  </thead>

                  <tbody>

                    {businessInfo[0].waitlistUserInfo.map(
                      function (user, i) {
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
                            <td scope="row" className="align-middle">{i + 1}</td>
                            <td className="align-middle">{user.firstname}</td>
                            <td className="align-middle">{user.lastname}</td>
                            <td className="align-middle">{user.email}</td>
                            <td className="align-middle">{user.number}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                id={i}
                                onClick={this.sendDefaultText}
                              >
                                <i id={i} className="fas fa-envelope" />
                              </button>
                            </td>
                          </tr>
                        );
                      }.bind(this)
                    )}

                  </tbody>

                </table>
              </Col>
            </Row>
          </Jumbotron>

          <Jumbotron>
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
          <Row>
            <Col size="md-6">
              <Jumbotron>
                <form onSubmit={this.sendText}>
                  <div class="form-check form-check-inline col-md-5">
                    <label for="recipient">Number</label>
                    <input
                      type="input"
                      className="form-control"
                      name="recipient"
                      placeholder="#"
                      value={recipient}
                      onChange={this.onChange}
                    />
                  </div>
                  <div class="form-check form-check-inline col-md-5">
                    <label for="textmessage">Message</label>
                    <input
                      type="text"
                      className="form-control"
                      name="textmessage"
                      placeholder="Reminder!"
                      value={textmessage}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info"
                    disabled={!(recipient && textmessage)}
                  >
                    Send Reminder Text
                  </button>
                  {(textSendSuccess) ? <span className='text-success'>Text Message Sent Succesfully</span> : null}
                  {(textSendFailure) ? <span className='text-danger'>Error Sending Text - check #</span> : null}
                </form>
              </Jumbotron>
            </Col>
            <Col size="md-6">
              <Jumbotron>
                <h4>Current Customer Wait Time: {businessInfo[0].waitTime * businessInfo[0].waitlist.length} minutes</h4>
                <h6>Average wait time set at: {businessInfo[0].waitTime} minutes</h6>
                <div>
                  <form onSubmit={this.changeWaitTime}>
                    <label>Change average wait time</label>
                    <input
                      type='number'
                      name='waitTime'
                      placeholder='15'
                      value={waitTime}
                      onChange={this.onChange}
                    />
                    <button
                    type='submit'
                    className='btn btn-info'
                    >Update</button>
                  </form>
                </div>
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
