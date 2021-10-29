const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(`${process.env.mongodbUrl}`);
const connection = mongoose.connection;
connection.on("open", () => {
  console.log("Connected To Db");
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.use("/signup", require("./Routes/SignUp"));
app.use("/login", require("./Routes/Login"));
app.listen(4000, () => {
  console.log("Server Started at Port 4000");
});
module.exports = {
  connection,
};
