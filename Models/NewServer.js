const mongoose = require("mongoose");
const newserverSchema = new mongoose.Schema({
  serverName: {
    type: String,
    required: true,
  },
  serverIcon: {
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
  serverAdminId: {
    type: String,
    required: true,
  },
});
module.exports =
  mongoose.models.server || mongoose.model("server", newserverSchema);
