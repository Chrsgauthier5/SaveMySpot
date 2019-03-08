import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../components/Nav/index";
import buttons from "../components//ButtonLayout/loginBtn.json";
import Loading from "../components/Loading";
import api from "../services/api";

class loginPage extends Component {
  state = {
    isLoaded: false,
    alreadyLoggedIn: false,
    loggedIn: false,
    bizLoggedIn: false,
    jwt: null,
    userInfo: null,
    email: "",
    password: "",
    buttons
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    this.setState({ userInfo: JSON.parse(userInfo)});

  (this.state.jwt && this.state.userInfo) ? this.setState({alreadyLoggedIn: true}) : this.setState({isLoaded: true});
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    api
      .call("post", "auth/login", { email, password })
      .then(results => {
        console.log(results);
        api.setToken(results.token);
        sessionStorage.setItem("token", results.token);
        sessionStorage.setItem("userInfo", JSON.stringify(results));
        if (results.token && results.businessUser)
          this.setState({ bizLoggedIn: true });
        if (results.token) this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        err.message = "Invalid Email or Password";
        alert(err.message);
      });
  };

  render() {
    const { alreadyLoggedIn, bizLoggedIn, loggedIn, email, password } = this.state;

    if(alreadyLoggedIn) return <Redirect to="/user" />;

    if (bizLoggedIn) {
      alert("Login Successful - Redirecting to Business Page");
      return <Redirect to="/business" />;
    }
    if (loggedIn) {
      alert("Login Successfull - Redirecting to User Page");
      return <Redirect to="/user" />;
    }

    if (this.state.isLoaded) {
      return (
        <div>
          <Nav 
          buttons={this.state.buttons} 
          />

          <div className="container">
            <h1 className="text-center">Welcome Back to SaveMySpot</h1>
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!(password && email)}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
    }
    else {
      return <Loading />
    }
  }
}

export default loginPage;
