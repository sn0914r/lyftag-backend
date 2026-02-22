const router = require("express").Router();
const QrController = require("./qr.controller");

router.get("/:publicId", QrController.getVehicleInfoController);

module.exports = router;
