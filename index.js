const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/msgRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const crypto = require("crypto");
crypto.randomBytes(64);

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.use("/user", userRoutes);
app.post("/user", userRoutes);
app.post("/user", userRoutes);
app.delete("/user", userRoutes);
app.use("/message", msgRoutes);
app.use("/room", roomsRoutes);

app.listen(port, () => console.log(`Server listening at port ${port}`));
