const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// middleware
app.use(express.json());
app.use(cors());

// routes
const toursRoute = require("./routes/tours.routes");
const tourRoute = require("./routes/tour.routes");
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connection is successful`.red.bold);
});

// posting to database
app.use("/tours", toursRoute);
app.use("/tour", tourRoute);

// server
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Travel route is working!");
});
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

module.exports = app;
