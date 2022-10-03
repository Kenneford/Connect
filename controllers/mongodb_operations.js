const mongoose = require("mongoose");
const User = require("../model/user");
// const bcrypt = require('bcrypt');

const mongodbConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/test`;
// const mongodbConnection = `mongodb+srv://sensosachatapp2022:MynameisKenn88.@cluster0.eahgm4e.mongodb.net/test`;
mongoose.connect(mongodbConnection);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection failed"));

// User Helper Function
function _makeUser(dbUser) {
  return {
    id: dbUser._id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    username: dbUser.username,
    email: dbUser.email,
    password: dbUser.password,
    yearGraduated: dbUser.yearGraduated,
  };
}

//Adding a User
async function addUser(update) {
  const newUser = User.create({
    firstName: update.firstName,
    lastName: update.lastName,
    username: update.username,
    email: update.email,
    password: update.password,
    yearGraduated: update.yearGraduated,
  });
  return newUser;
}

//Fetching All Users
async function getUsers() {
  const users = await User.find({});
  return users.map((dbUser) => _makeUser(dbUser));
  //   return users;        ======Return users will give same endPoint result
}

//Fetching A User By ID
async function getUserByID(id) {
  const user = await User.findById(id);
  return _makeUser(user);
}

//Deleting A User By ID
async function deleteUserByID(id) {
  const user = await User.deleteOne({ _id: id });
  return _makeUser(user);
}

module.exports = {
  addUser,
  getUsers,
  getUserByID,
  deleteUserByID,
};
