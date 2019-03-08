import React, { Component } from "react";
import Nav from "../components/Nav/index";
import buttons from "../components/signupBtn.json";
import { Redirect } from "react-router-dom";
import api from "../services/api";

class signUpPage extends Component {
  state = {
    toLoginPage: false,
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    buttons
  };

  takenUserOrEmail = (err) => {
    alert(err.message);
  }

  onSubmit = event => { //we need this to log the form data to our DB
    event.preventDefault();
    const { firstname, lastname, password, email} = this.state;

    api.call('post', 'auth/register', {
      firstname: firstname, lastname: lastname, password: password, email: email})
      .then((results) => (results.id) ? this.setState({ toLoginPage: true }) : console.log('username or email already in use'))
      .catch((err)=> {
      console.log(err);
      err.message ="Email already taken.  Please change and try again"
      this.takenUserOrEmail(err);
    });
  };


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  }


  render() {
    const { toLoginPage, firstname, lastname, password, email, buttons } = this.state;

    if (toLoginPage) {
      alert("Account Successfully Created - Please login");
      return <Redirect to='/login' />
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
              <small id="emailHelp" className="form-text text-muted">
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
