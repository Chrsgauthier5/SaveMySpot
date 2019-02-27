require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const db = require('./models') // looks in models folder for index.js where we opened DB connection
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here



// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.use((req, res, next) =>{
//   const err = new Error('Endpoint Not Found');
//   err.status = 404;

//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 5000).json({
//     err: err.message || 'Something went wrong'
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
