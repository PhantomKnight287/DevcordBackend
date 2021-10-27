const bcrypt = require("bcrypt");
const express = require("express");
const Router = express.Router();
const userModel = require("../Models/NewUsers");

Router.post("/", async (req, res) => {
  const isOldUser = await userModel.findOne({ email: req.body.email });
  if (isOldUser) {
    res
      .status(409)
      .send({ message: "User With This Email Address Already Exist" });
    return;
  } else {
    const psd = await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => hash)
      .catch((err) => {
        res.status(500).send({ error: `${err.message}` });
        return;
      });
    console.log(psd);
    try {
      const user = new userModel({
        username: req.body.username,
        password: psd,
        email: req.body.email,
      });
      const response = await user.save();
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ error: `${error.message}` });
    }
  }
});
module.exports = Router;
