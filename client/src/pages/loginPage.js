import React, { Component } from "react";
import Nav from "../components/Nav/index";
import Form from "../components/Form/index";
import buttons from "../components/Buttons.json";
import { Link } from "react-router-dom";

class signUpPage extends Component {
  state = {
    username: "",
    password: "",
    buttons
  };

  baseState = this.state //grabs a 'snapshot' of empty state object

  onSubmit = event => { //we need this to log the form data to our DB
    event.preventDefault();
    console.log(event);
    this.setState(this.baseState) //clears out the fields
  };


  onChange = event => {
      this.setState ({[event.target.name] : event.target.value});
      console.log(this.state);
      console.log(this.baseState)
  }


  render() {
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
                value={this.state.username}
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
                value={this.state.password}
                onChange={this.onChange}
              />
              </div>

            <Link to="/user">  
            <button type="submit" className="btn btn-primary">
              Login - (User Route)
            </button>
            </Link>
            
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

export default signUpPage;


