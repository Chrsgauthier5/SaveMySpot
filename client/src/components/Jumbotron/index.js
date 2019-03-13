import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ minHeight: 500, clear: "both", paddingTop: 50, textAlign: "center", margin: 20}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
