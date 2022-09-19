const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");
const { MongoClient } = require("mongodb");

const app = require("./index");

// database connection
// DBConnect();
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log(`Database connection is successful`.red.bold);
// });
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj11r.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "travel-management",
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
