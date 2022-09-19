const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// routes
const travelRoute = require("./routes/travel.routes");

app.get("/", (req, res) => {
  res.send("Travel route is working!");
});

// posting to database
app.use("/tours", travelRoute);

module.exports = app;
