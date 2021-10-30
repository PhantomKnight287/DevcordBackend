const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  authorNickName: {
    type: String,
    required: false,
    default: "",
  },
  messageContent: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: false,
    default: "",
  },
  messageTimeStamp: {
    type: String,
    required: false,
    default: new Date(),
  },
});
module.exports =
  mongoose.models.message || mongoose.model("message", messageSchema);
