const express = require("express");
const userModel = require("../Models/NewUsers");
const Router = express.Router();
Router.post("/", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).send({ servers: [] });
  } else {
    res.status(200).send({ servers: user.serversJoined });
  }
});
module.exports = Router;
