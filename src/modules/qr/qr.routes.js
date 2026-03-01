const router = require("express").Router();
const QrController = require("./qr.controller");
// const { checkSubscription } = require("./payment.middleware");

router.get(
  "/:publicId",
  // checkSubscription,
  QrController.getVehicleInfoController,
);

module.exports = router;
