const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// routes
const toursRoute = require("./routes/tours.routes");
const tourRoute = require("./routes/tour.routes");

app.get("/", (req, res) => {
  res.send("Travel route is working!");
});

// posting to database
app.use("/tours", toursRoute);
app.use("/tour", tourRoute);

module.exports = app;
