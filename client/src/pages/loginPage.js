import React, { Component } from "react";
import Nav from "../components/Nav/index";
import buttons from "../components/loginBtn.json";
import { Link, Redirect } from "react-router-dom";
import api from '../services/api';

class loginPage extends Component {
  state = { loggedIn: false, username: "", password: "", buttons };

  // baseState = this.state //grabs a 'snapshot' of empty state object

  onSubmit = event => { //we need this to log the form data to our DB
    const { loggedIn, username, password } = this.state;
    event.preventDefault();
    api.call('post', 'auth/login', { username, password })
      .then((results) => {
        console.log(results);
        api.setToken(results.token);
        sessionStorage.setItem('token', results.token);
        sessionStorage.setItem('userInfo', JSON.stringify(results));
        if (results.token) {
          this.setState({ loggedIn: true });
        }
      })
      .catch((err) => {
        err.message = 'Invalid Username or Password';
        alert(err.message);
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  }


  render() {

    const { loggedIn, username, password } = this.state;

    if (loggedIn) {
      alert("Login Successful - Redirecting to User Page");
      return <Redirect to='/user' />
    }

    return (
      <div>
        <Nav buttons={this.state.buttons} />

        <div className="container">
          <h1 className='text-center'>Welcome Back to SaveMySpot</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="firstname">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={username}
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
              Login - (User Route)
            </button>

            <Link to="/business">
              <button type="submit" className="btn btn-primary">
                Login - (Business Route)
            </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default loginPage;