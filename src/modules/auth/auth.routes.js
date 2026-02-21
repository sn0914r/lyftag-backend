const { validateBody } = require("../../middlewares/validation.middleware");
const { verifyAuth } = require("../../middlewares/verifyAuth.middleware");
const { syncUserController } = require("./auth.controller");
const { refferalCodeSchema } = require("./auth.schema");

const router = require("express").Router();

router.post(
  "/sync-user",
  verifyAuth,
  validateBody(refferalCodeSchema),
  syncUserController,
);

module.exports = router;
