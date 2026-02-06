const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use(cors());

app.use(authRoutes);

app.get("/health", (req, res) => res.status(200).send("OK"));
app.use(errorHandler);
module.exports = app;
