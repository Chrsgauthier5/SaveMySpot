const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// This is just an example route, obviously in real routes interface with your database here!
app.get("/api/pokemon", (req, res) => {
  res.json([
    {
      name: "Pikachu",
      type: "Electric",
      level: 5
    },
    {
      name: "Bulbasaur",
      type: "Grass",
      level: 5
    },
    {
      name: "Charizard",
      type: "Fire",
      level: 36
    }
  ]);
});

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
