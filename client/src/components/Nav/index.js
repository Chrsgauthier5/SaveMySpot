import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Button from "../Button/index";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-success rounded">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h1>SaveMySpot</h1>
          </a>
          <div className="text-right">
            <Link to="/login">
              <Button buttonName={"Login"} />
            </Link>
            <Link to="/signUp">
              <Button buttonName={"Sign Up"} />
            </Link>
            <Link to="/">
              <Button buttonName={"Home"} />
            </Link>
            <Link to="/">
              <Button buttonName={"Logout"} />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
