const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const connectDb = require("./config/databse");
dotenv.config()
connectDb()
  .then(() => {
    console.log("Connected to the Databse");
  })
  .catch((err) => console.log(err));

app.listen(8000, "127.0.0.1", () => {
  console.log("Listening tot the server on the port 8000");
});
