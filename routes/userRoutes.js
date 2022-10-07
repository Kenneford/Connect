const express = require("express");
const router = express.Router();

const {
  userSignup,
  getSignedUpUsers,
  getUserByID,
  deleteUserByID,
  validateUser,
  authenticateToken,
} = require("../controllers/mongodb_operations");

function sendErrorOutput(err, res) {
  res.status(400).send({
    errors: [err.message],
  });
}

router.post("/signup", (req, res) => {
  userSignup(req.body);
  res.sendStatus(201);
});

// router.post("/login", (req, res) => {
//   const token = validateUser(req.body);
//   if (token) {
//     res.send({
//       status: "OK",
//       sessionToken: token,
//     });
//   } else {
//     res.status(403).send({
//       status: "ERROR",
//       message: "username or password is not correct",
//     });
//   }
// });
router.post("/login", async (req, res) => {
  const token = await validateUser(req.body);
  if (!token) {
    res.status(403).send({ error: "Authentication failed" });
    return;
  }
  res.send(token);
});

router.get("/", async (req, res) => {
  res.send(await getSignedUpUsers());
});

// router.get("/", authenticateToken, async (req, res) => {
//   res.send(await getSignedUpUsers());
// });

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
