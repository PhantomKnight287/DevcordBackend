const bcrypt = require("bcrypt");
const userModel = require("../Models/NewUsers");
const Router = require("express").Router();
Router.post("/", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res
      .status(404)
      .send({ message: "User with Given Email Address not found!" });
    return;
  }
  const result = await bcrypt.compare(req.body.password, user.password);
  if (result) {
    const obj = {};
    obj.email = user.email;
    obj._id = user._id;
    obj.photoUrl = user.imageUrl;
    obj.username = user.username;
    res.status(200).send(obj);
  } else {
    res.status(403).send({ message: "The User Enter Wrong Password!" });
  }
});
module.exports = Router;
