const mongoose = require("mongoose");
const app = require("./app");
const connectDb = require("./config/databse");

connectDb()
  .then(() => {
    console.log("Connected to the Databse");
    app.listen(8000, "127.0.0.1", () => {
      console.log("Listening tot the server on the port 8000");
    });
  })
  .catch((err) => console.log(err));
