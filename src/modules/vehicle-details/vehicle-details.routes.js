const { validateBody } = require("../../middlewares/validation.middleware");
const { verifyAuth } = require("../../middlewares/verifyAuth.middleware");
const Schema = require("./vehicle-details.schema");
const Controller = require("./vehicle-details.controller");

const router = require("express").Router();

router.post(
  "/add",
  verifyAuth,
  validateBody(Schema.AddVehicleDetailsSchema),
  Controller.addVehicleInfoController,
);
router.get("/get", verifyAuth, Controller.getVehicleInfoController);
router.patch(
  "/update",
  verifyAuth,
  validateBody(Schema.updateVehicleDetailsSchema),
  Controller.updateVehicleInfoController,
);

module.exports = router;
