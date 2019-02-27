import React, { Component } from "react";
import { Link } from "react-router-dom";


const Form = props => (
  <form onSubmit={() => props.handleSubmit()}>
  <label>
    Name:
    <input type="text" value={this.state.value} onChange={this.handleChange} />
  </label>
  <input type="submit" value="Submit" />
</form>
    );

export default Form;
