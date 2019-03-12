import React, { Component } from "react";
import PropTypes from "prop-types";
import './style.css'



export default class Modal extends Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e)
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            // <div>
            //     {this.props.children}
            //     <div>
            //         <button onClick={(e) => {this.onClose(e)}}> Close </button>
            //     </div>
            // </div>
            <div class="modal-content">
            <span class="close" onClick={(e) => {this.onClose(e)}}>Close</span>
                <div class="modal-header">
                    
                    <h2>Success!</h2>
                </div>
                <div class="modal-body">
                    <h6>{this.props.children}</h6>
                </div>
                <div class="modal-footer">
                    <h3>SaveMySpot</h3>
                </div>
            </div>

        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}