const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
    default: "",
  },
  serversJoined:{
    type:Array,
    required:false,
    default:[],
  }
});
const model = mongoose.models.users || mongoose.model("users", schema);
module.exports = model
