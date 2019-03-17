import React, { Component } from "react";
import Nav from "../components/Nav/index";
import buttons from "../components/ButtonLayout/signupBtn.json";
import { Redirect } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal";
import "./signUpPage.css";
import Tooltip from '@material-ui/core/Tooltip';

const pStyle = {
  color: 'red'
};


class signUpPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    number: "",
    toLoginPage: false,
    showModal: false,
    signUpError: false,
    signUpErrorMessage: '',
    buttons
  };
  // modal navigation / logic below
  showModal = async () => {
    await this.setState({showModal: true})
    setTimeout(this.hideModal, 2000);
  }

  hideModal = async () => {
    await this.setState({showModal: false})
    await this.setState({ toLoginPage: true });

  }

  takenUserOrEmail = async (err) => {
    await this.setState({signUpError: true, signUpErrorMessage: err.message})    
    setTimeout(this.hideError, 3500);
  }

  hideError = () =>{ // setTimeout function - set for 5 seconds
    this.setState({signUpError: false});
  }
  // modal /error logic above


  onSubmit = async event => { //we need this to log the form data to our DB
    event.preventDefault();
    const { firstname, lastname, password, email, number} = this.state;
    try{
    const results = await api.call('post', 'auth/register', {firstname, lastname, password, email, number})
    console.log(results);
    if (results.id) this.showModal()
    
    } catch(err) {
      console.log(err);
      err.message ="Email already taken.  Please login to existing account or use a different email address"
      this.takenUserOrEmail(err);
    }
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });
  
  render() {
    const { toLoginPage, firstname, lastname, password, email, number, buttons, 
      showModal, signUpError, signUpErrorMessage } = this.state;

    if (toLoginPage) {
      return <Redirect to='/login' />
    }

    if(showModal){
      return  <Modal 
      show={showModal}
      onClose={this.hideModal}
      > Account Created! Please login
      </Modal>
    }

    return (
      <div>
        <Nav buttons={buttons} />

        <div className="container">
          <h1 className='text-center'>Sign Up for SaveMySpot</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="John"
                value={firstname}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label for="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Doe"
                value={lastname}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label for="email">Email address</label>
              <Tooltip title="We will never share your email with anyone else" placement="top">
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
                value={email}
                onChange={this.onChange}
              />
              </Tooltip>
              {/* <small style={pStyle} id="emailHelp" className="form-text text-info" >
                We will never share your email with anyone else.
              </small> */}
            </div>
            <div className="form-group">
              <label for="number">Cell Number</label>
              <Tooltip title="Number is for reminder texts only" placement="top">
              <input
                type="input"
                className="form-control"
                name="number"
                placeholder="6038675309"
                value={number}
                onChange={this.onChange}
              />
              </Tooltip>
              {/* <small id="emailHelp" className="form-text text-info"   >
                Number is for reminder texts only
              </small> */}
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!(firstname && lastname && password && email && number)}
            >
              Submit
            </button>
            {(signUpError) ? <span className='text-warning' id={signUpError?'fadeIn':'fadeOut'}>{signUpErrorMessage}</span> : null}
          </form>
        </div>
      </div>
    );
  }
}



export default signUpPage;