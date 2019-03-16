import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../components/Nav/index";
import buttons from "../components//ButtonLayout/loginBtn.json";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
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
    showModal: false,
    loginIncorrect: false,
    loginErrMsg: '',
    buttons
  };

  async componentDidMount() {
    const jwt = await sessionStorage.getItem("token");
    this.setState({ jwt: jwt });

    const userInfo = await sessionStorage.getItem("userInfo");
    this.setState({ userInfo: JSON.parse(userInfo)});

  (this.state.jwt && this.state.userInfo) ? this.alreadyLoggedInFunc() : this.setState({isLoaded: true});
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try{
    const results = await api.call("post", "auth/login", { email, password })
    console.log(results)
    await api.setToken(results.token);
    await sessionStorage.setItem("token", results.token);
    await sessionStorage.setItem("userInfo", JSON.stringify(results));
    if (results.token && results.businessUser) this.setState({ bizLoggedIn: true });
    if (results.token) this.showModal();
    }
    
    catch(err) {
        console.log(err);
        await this.setState({loginErrMsg: "Invalid Email or Password"}); 
        await this.setState({loginIncorrect: true});
        setTimeout(this.hideError, 3500);
      }
  };

  hideError = () =>{ // setTimeout function - set for 5 seconds
    this.setState({loginIncorrect: false});
  }

  showModal = () => {
    this.setState({showModal: true})
    setTimeout(this.hideModal, 1500);
  }

  hideModal = async () => {
    await this.setState({showModal: false})
    await this.setState({ loggedIn: true });

  }
  alreadyLoggedInFunc = () => { //triggers modal when user tries to go to login page & are already logged in
    this.setState({alreadyLoggedIn: true})
    setTimeout(this.alreadyLoggedInModal, 1500);
  }

  alreadyLoggedInModal = () => { // method called when they close the already logged in Modal - redirects to user page
    this.setState({alreadyLoggedIn: false, loggedIn: true})
    
  }

  render() {
    const { alreadyLoggedIn, bizLoggedIn, loggedIn, email, password, 
      showModal, loginIncorrect, loginErrMsg} = this.state; //destructure state

    // conditional modals redirects start
    if(alreadyLoggedIn) { 
      return  <Modal 
      show={this.state.alreadyLoggedIn}
      onClose={this.alreadyLoggedInModal}
      > You are already logged in - bringing you to home page!
      </Modal>
    }

    if (bizLoggedIn) {
      alert("Login Successful - Redirecting to Business Page");
      return <Redirect to="/business" />;
    }
    if (loggedIn) {
      return <Redirect to="/user" />;
    }
    if(showModal){
      return  <Modal 
      show={this.state.showModal}
      onClose={this.hideModal}
      > Login Successful!
      </Modal>
    }
    // conditional modals / redirects end

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
              {(loginIncorrect) ? <span className='text-warning'>{loginErrMsg}</span> : null}
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
