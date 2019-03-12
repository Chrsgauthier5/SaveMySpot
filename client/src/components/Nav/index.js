import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


function handleButtonClick(event) {
    console.log(event.target.id);
    if (event.target.id === 'Logout'){
        sessionStorage.clear();
    }
}

const Nav = props => (
      <div className="header">
      
      <div className="buttons">
      {(props.userInfo)? <p id='greeting'>Hello {props.userInfo.firstname}</p> : null}
          {props.buttons.map(btn => (
              <Link to={btn.link} >
              <button id={btn.name} onClick={handleButtonClick} className={`btn btn-${btn.color} btn-lg`} style={{display: btn.display ? "initial" : "none"}}>{btn.name}</button>
              </Link>
          ))}
          
          </div>
        
          <div className="bg-image"></div>
            <h1>Save My Spot</h1>
      </div>
    );

export default Nav;