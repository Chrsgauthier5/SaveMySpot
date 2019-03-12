import React, { Component } from "react";
import Nav from "../components/Nav/index";
import buttons from "../components/ButtonLayout/signupBtn.json";
import { Redirect } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal";

class signUpPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    toLoginPage: false,
    showModal: false,
    errorModal: false,
    errorModalMessage: '',
    buttons
  };

  takenUserOrEmail = async (err) => await this.setState({errorModal: true, errorModalMessage: err.message})    
  
  showModal = async () => {
    await this.setState({showModal: true})
  }

  hideModal = async () => {
    await this.setState({showModal: false})
    await this.setState({ toLoginPage: true });

  }

  hideErrorModal = async () => {
    await this.setState({errorModal: false})
  }

  onSubmit = async event => { //we need this to log the form data to our DB
    event.preventDefault();
    const { firstname, lastname, password, email} = this.state;
    try{
    const results = await api.call('post', 'auth/register', {firstname: firstname, lastname: lastname, password: password, email: email})
    console.log(results);
    if (results.id) this.showModal()
    
    } catch(err) {
      console.log(err);
      err.message ="Email already taken.  Please login to existing account or use a different email address"
      this.takenUserOrEmail(err);
    }
  };


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  }


  render() {
    const { toLoginPage, firstname, lastname, password, email, buttons, showModal, errorModal, errorModalMessage } = this.state;

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
    if(errorModal){
      return  <Modal 
      show={errorModal}
      onClose={this.hideErrorModal}
      > {errorModalMessage}
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
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
                value={email}
                onChange={this.onChange}
              />
              <small id="emailHelp" className="form-text text-info" >
                We'll never share your email with anyone else.
              </small>
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
              disabled={!(firstname && lastname && password && email)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default signUpPage;
