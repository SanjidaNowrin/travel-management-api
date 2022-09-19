const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");
const { MongoClient } = require("mongodb");
// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj11r.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "travel-management",
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// routes
const toursRoute = require("./routes/tours.routes");
const tourRoute = require("./routes/tour.routes");

app.get("/", (req, res) => {
  res.send("Travel route is working!");
});

// posting to database
app.use("/tours", toursRoute);
app.use("/tour", tourRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
//module.exports = app;
