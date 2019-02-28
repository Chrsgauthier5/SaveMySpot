import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


const Nav = props => (
      <div className="header">
      <div className="buttons"> 
          {props.buttons.map(btn => (
              <Link to={btn.link} >
              <button className={`btn btn-${btn.color} btn-lg`} style={{display: btn.display ? "initial" : "none"}}>{btn.name}</button>
              </Link>
          ))}
          </div>
        {/* <div className="container"> */}
          {/* <a className="navbar-brand" href="#"> */}
          <div className="bg-image"></div>
            <h1>Save My Spot</h1>
          {/* </a> */}
          {/* <div className="text-right"> */}      
       
          {/* </div> */}
        {/* </div> */}
      
      </div>
    );

export default Nav;
