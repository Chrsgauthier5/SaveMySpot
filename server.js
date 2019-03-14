require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const twilio = require('twilio');

// const accountSid = 'ACfb5a18b4c27c1f25e60837306a798aeb'
// const authToken = '7c2161b3b9bf99c9321943ddde40eb89'
// const client = (accountSid, authToken);

const db = require('./models') // looks in models folder for index.js where we opened DB connection
const routes = require('./routes');

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
app.use('/api/auth', routes.auth); //handles all the auth routes
app.use('/api/business', routes.business);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`?? ==> API server now on port ${PORT}!`);
});
