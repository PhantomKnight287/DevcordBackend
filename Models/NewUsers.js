const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
    default: uuid(),
    unique: true,
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
});
const model = mongoose.models.users || mongoose.model("users", schema);
module.exports = model
