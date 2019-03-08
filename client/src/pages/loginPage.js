import React, { Component } from "react";
import Nav from "../components/Nav/index";
import buttons from "../components/loginBtn.json";
import { Link, Redirect } from "react-router-dom";
import api from '../services/api';

class loginPage extends Component {

  state = { loggedIn: false, bizLoggedIn: false, email: "", password: "", buttons };

  
  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    api.call('post', 'auth/login', { email, password })
      .then((results) => {
        console.log(results);
        api.setToken(results.token);
        sessionStorage.setItem('token', results.token);
        sessionStorage.setItem('userInfo', JSON.stringify(results));
        if (results.token && results.businessUser) {
          this.setState({ bizLoggedIn: true });
        }
        if (results.token) {
          this.setState({loggedIn: true})
        }
      })
      .catch((err) => {
        console.log(err);
        err.message = 'Invalid Email or Password';
        alert(err.message);
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  }


  render() {

    const { bizLoggedIn, loggedIn, email, password } = this.state;
    
    if (bizLoggedIn) {
      alert("Login Successful - Redirecting to Business Page");
      return <Redirect to='/business' />
    }
    if (loggedIn) {
      alert("Login Successfull - Redirecting to User Page")
      return <Redirect to= '/user' />
    }

    return (
      <div>
        <Nav buttons={this.state.buttons} />

        <div className="container">
          <h1 className='text-center'>Welcome Back to SaveMySpot</h1>
          <form onSubmit={this.onSubmit}>
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
            </div>
            <div className="form-group">
              <label for="lastname">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login 
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default loginPage;