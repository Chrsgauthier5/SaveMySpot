import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


const Nav = props => (
      <nav className="navbar navbar-expand-lg navbar-light bg-success rounded">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h1>SaveMySpot</h1>
          </a>
          <div className="text-right">

          {props.buttons.map(btn => (
              <Link to={btn.link} >
              <button className={`btn btn-${btn.color} btn-lg`} style={{display: btn.display ? "initial" : "none"}}>{btn.name}</button>
              </Link>
          ))}
          </div>
        </div>
      </nav>
    );

export default Nav;
