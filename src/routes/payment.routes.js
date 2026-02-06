const {
  createOrderController,
  verifyOrderController,
} = require("../controllers/payment.controller");
const { validateBody } = require("../middlewares/validation.middleware");
const { verifyAuth } = require("../middlewares/verifyAuth.middleware");
const {
  planIdSchema,
  verifyOrderSchema,
} = require("../validations/payment.schema");

const router = require("express").Router();

router.post(
  "/payments/create-order",
  verifyAuth,
  validateBody(planIdSchema),
  createOrderController,
);
router.post(
  "/payments/verify-order",
  verifyAuth,
  validateBody(verifyOrderSchema),
  verifyOrderController,
);

module.exports = router;
