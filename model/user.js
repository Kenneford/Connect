const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  hashPassword: String,
  yearGraduated: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuthUser", userSchema);
