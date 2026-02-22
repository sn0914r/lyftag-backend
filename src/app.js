const express = require("express");
const app = express();

const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const paymentRoutes = require("./modules/payment-orders/payment-order.routes");
const qrRoutes = require("./modules/qr/qr.routes");
const vehicleRoutes = require("./modules/vehicle-details/vehicle-details.routes");

const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);
app.use("/vehicle-details", vehicleRoutes);
app.use("/qr", qrRoutes);

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use(errorHandler);
module.exports = app;
