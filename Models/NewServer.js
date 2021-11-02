const mongoose = require("mongoose");
const newserverSchema = new mongoose.Schema({
  serverName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
    default: "",
  },
  members: {
    type: Array,
    required: false,
    default: [],
  },
  serverAdmin: {
    type: Object,
    required: true,
  },
});
module.exports =
  mongoose.models.server || mongoose.model("server", newserverSchema);
