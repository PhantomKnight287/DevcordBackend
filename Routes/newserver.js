const Router = require("express").Router();
const serverModel = require("../Models/NewServer");
const userModel = require("../Models/NewUsers");
Router.post("/", async (req, res) => {
  const newServer = new serverModel({
    serverName: req.body.serverName,
    photoUrl: req.body.photoUrl,
    members: [req.body.serverAdmin],
    serverAdmin: req.body.serverAdmin,
  });
  const newServerData = await newServer.save();
  res.status(200).send({ message: "New Server Created Successfully" });
  const user = await userModel.findOne({ email: req.body.serverAdmin.email });
  const newServerRecord = [
    ...user.serversJoined,
    {
      serverName: newServerData.serverName,
      photoUrl: newServerData.photoUrl,
      serverId: newServerData._id,
    },
  ];
  await userModel.findOneAndUpdate(
    { email: req.body.serverAdmin.email },
    { serversJoined: newServerRecord }
  );
});
module.exports = Router;
