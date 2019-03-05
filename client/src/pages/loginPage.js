import React, { Component } from "react";
import Nav from "../components/Nav/index";
import Form from "../components/Form/index";
import buttons from "../components/loginBtn.json";
import { Link } from "react-router-dom";
import api from "../services/api";

class signUpPage extends Component {
  state = {
    username: "",
    password: "",
    buttons
  };

  baseState = this.state //grabs a 'snapshot' of empty state object

  onSubmit = event => { //we need this to log the form data to our DB
    const {username, password, buttons} = this.state;
    event.preventDefault();
    
    
    const results = api.call('post', 'auth/login', {
      username,
      password
    }).then((results) => console.log(results));
    
    this.setState(this.baseState)
    
  };


  onChange = event => this.setState({[event.target.name] : event.target.value});


  render() {

    const {username, password, buttons} = this.state;

    return (
      <div>
        <Nav buttons={buttons} />
        
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

            {/* <Link to="/user">   */}
            <button 
            type="submit" 
            className="btn btn-primary"
            disasbled={!(username && password)}
            >
              Login - (User Route)
            </button>
            {/* </Link> */}
            
            {/* <Link to="/business">   */}
            <button 
            type="submit" 
            className="btn btn-primary"
            disasbled={!(username && password)}
            >
              Login - (Business Route)
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    );
  }
}

export default signUpPage;


