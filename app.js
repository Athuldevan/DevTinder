const express = require("express");
const authRouter = require('./routes/authRouter')
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1", authRouter)





module.exports = app;
