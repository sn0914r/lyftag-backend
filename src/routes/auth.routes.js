const { syncUserController } = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validation.middleware");
const { verifyAuth } = require("../middlewares/verifyAuth.middleware");
const { syncUserSchema } = require("../validations/auth.schema");

const router = require("express").Router();

router.post(
  "/auth/sync-user",
  verifyAuth,
  validateBody(syncUserSchema),
  syncUserController,
);

module.exports = router;
