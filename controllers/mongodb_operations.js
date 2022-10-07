const mongoose = require("mongoose");
const AuthUser = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
// async function addUser(update) {
//   // bcrypt.hash(update.password, 10, (err, hash) => {
//   //   if (err) {
//   //     return update.status(500).json({
//   //       error: err,
//   //     });
//   //   } else {
//   const newUser = await AuthUser.create(_makeUser(update));
//   return { newUser };
//   // }
//   // });
// }

const userSignup = ({
  firstName,
  lastName,
  username,
  email,
  password,
  yearGraduated,
}) => {
  console.log("username", username);
  console.log("password", password);
  console.log("email", email);
  console.log("yearGraduated", yearGraduated);
  const hashPassword = bcrypt.hashSync(password, 10);
  console.log("username", username);
  console.log("password", password);
  AuthUser.create({
    firstName,
    lastName,
    username,
    email,
    hashPassword,
    yearGraduated,
  });
};

//Fetching All Users
// async function getUsers() {
//   const users = await AuthUser.find({});
//   return users.map((dbUser) => _makeUser(dbUser));
//   return users;        ======Return users will give same endPoint result
// }

const getSignedUpUsers = async () => {
  return AuthUser.find({});
};

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

// User Validation
const validateUser = async ({ username, email, password }) => {
  const user = await AuthUser.findOne({ username, email });
  console.log(user);
  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, user.hashPassword);
  } catch (error) {
    return null;
  }
  if (!isValid) {
    return null;
  }
  return { status: "success", token: generateAccessToken(username) };
};

//Fetching A User By ID
async function getUserByID(id) {
  const user = await AuthUser.findById(id);
  return _makeUser(user);
}

//Deleting A User By ID
async function deleteUserByID(id) {
  const user = await AuthUser.deleteOne({ _id: id });
  return _makeUser(user);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = {
  userSignup,
  getSignedUpUsers,
  getUserByID,
  deleteUserByID,
  validateUser,
  authenticateToken,
};
