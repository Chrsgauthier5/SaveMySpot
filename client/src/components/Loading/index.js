import Spinner from "react-spinner-material";
import React, { Component } from "react";
import "./style.css";

const Loader = props => {
  return (
      <div className="loader">
      <h3>Loading....</h3>
      <br />
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
  );
};

export default Loader;
