const express = require("express");
const router = express.Router();

const {
  addUser,
  getUsers,
  getUserByID,
  deleteUserByID,
} = require("../controllers/mongodb_operations");

function sendErrorOutput(err, res) {
  res.status(400).send({
    errors: [err.message],
  });
}

router.post("/", (req, res) => {
  addUser(req.body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => sendErrorOutput(err, res));
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
