import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";



export default class Nav extends Component {

    handleButtonClick = (event) => {
        console.log(event.target.id);
        if (event.target.id === 'Logout') {
            sessionStorage.clear();
            this.props.changeButtons()
        }
    }

    render(){
        return (
            <div className="header">

                <div className="buttons">
                    {(this.props.userInfo) ? <p id='greeting'>Hello {this.props.userInfo.firstname}</p> : null}
                    {this.props.buttons.map(btn => (
                        <Link to={btn.link} >
                            <button id={btn.name} onClick={this.handleButtonClick} className={`btn btn-${btn.color} btn-lg`} style={{ display: btn.display ? "initial" : "none" }}>{btn.name}</button>
                        </Link>
                    ))}

                </div>

                <div className="bg-image"></div>
                <h1>Save My Spot</h1>
            </div>
        );
    }
}