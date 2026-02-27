const express = require("express");
const app = express();

const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const paymentRoutes = require("./modules/payment-orders/payment-order.routes");
const qrRoutes = require("./modules/qr/qr.routes");
const vehicleRoutes = require("./modules/vehicle-details/vehicle-details.routes");
const referralRoutes = require("./modules/referrals/referral.routes");

const errorHandler = require("./middlewares/error.middleware");

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/payments", paymentRoutes);
app.use("/vehicle-details", vehicleRoutes);
app.use("/qr", qrRoutes);
app.use("/referral", referralRoutes);

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use(errorHandler);
module.exports = app;
