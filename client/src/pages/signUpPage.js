import React, { Component } from "react";
import Nav from "../components/Nav/index";
import Form from "../components/Form/index";
import buttons from "../components/signupBtn.json";
import { Link } from "react-router-dom";
import api from "../services/api";



class signUpPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    buttons
  };
  
  
baseState = this.state

// componentDidMount() {
//   console.log(this.state);
  
// }


onSubmit = event => { //we need this to log the form data to our DB
    
    event.preventDefault();
    
    console.log(this.state);
    
    const results = api.call('post', 'auth/register', {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }).then((results) => console.log(results));
    
  
    
    
    
    this.setState(this.baseState)
    
  };


  onChange = event => {
      this.setState ({[event.target.name] : event.target.value});
      
  }


  render() {
    return (
      <div>
        <Nav buttons={this.state.buttons} />
        
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
                value={this.state.firstname}
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
                value={this.state.lastname}
                onChange={this.onChange}
              />
              </div>
              <div className="form-group">
              <label for="username">Desired Username</label>
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
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
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
                value={this.state.email}
                onChange={this.onChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            {/* <Link to="/login"> */}
            <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!(this.state.firstname && this.state.lastname && this.state.username && this.state.password && this.state.email)}
            >
              Submit
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    );
  }
}

export default signUpPage;


