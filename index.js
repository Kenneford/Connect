const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const msgRouter = require("./routes/msgRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8083;

app.use("/user", userRoutes);
app.post("/user", userRoutes);
app.delete("/user", userRoutes);
app.use("/message", msgRouter);

app.listen(port, () => console.log(`Server listening at port ${port}`));
