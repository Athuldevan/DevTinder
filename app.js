const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("hello from the server");
  console.log("Hello from the server");
});

app.listen(8000, "127.0.0.1", () => {
  console.log("Listening tot the server on the port 8000");
});
