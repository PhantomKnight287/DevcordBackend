const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
mongoose.connect(`${process.env.mongodbUrl}`);
const connection = mongoose.connection;
connection.on("open", () => {
  console.log("Connected To Db");
});

setInterval(() => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.log(err.message);
    }

    for (const file of files) {
      fs.unlink(path.join("./public", file), (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
  });
}, 360000); //set interval to clean files from public directory in an hour
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  multer({
    dest: "./public",
  }).single("file")
);
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.use("/signup", require("./Routes/SignUp"));
app.use("/login", require("./Routes/Login"));
app.use("/servers", require("./Routes/Servers"));
app.use("/image", require("./Routes/image"));
app.use("/newserver", require("./Routes/newserver"));
app.listen(4000, () => {
  console.log("Server Started at Port 4000");
});
module.exports = {
  connection,
};
