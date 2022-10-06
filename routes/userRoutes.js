const express = require("express");
const router = express.Router();

const {
  addUser,
  getUsers,
  getUserByID,
  deleteUserByID,
  validatePassword,
} = require("../controllers/mongodb_operations");

function sendErrorOutput(err, res) {
  res.status(400).send({
    errors: [err.message],
  });
}

router.post("/", (req, res) => {
  addUser(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => sendErrorOutput(err, res));
});

router.post("/", (req, res) => {
  const token = validatePassword(req.body);
  if (token) {
    res.send({
      status: "OK",
      sessionToken: token,
    });
  } else {
    res.status(403).send({
      status: "ERROR",
      message: "username or password is not correct",
    });
  }
});

router.get("/", (req, res) => {
  getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => sendErrorOutput(err, res));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  getUserByID(id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => sendErrorOutput(err, res));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteUserByID(id)
    .then((users) => {
      res.json({
        message: "User deleted sucessfully!",
      });
    })
    .catch((err) => sendErrorOutput(err, res));
});

module.exports = router;
