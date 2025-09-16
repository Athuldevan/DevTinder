const express = require("express");
const connectDb = require("./config/databse");
const app = express();

connectDb()
  .then(() => {
    console.log("Connected to the Databse");
    app.listen(8000, "127.0.0.1", () => {
      console.log("Listening tot the server on the port 8000");
    });
  })
  .catch((err) => console.log(err));
