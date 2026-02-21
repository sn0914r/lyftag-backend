const { validateBody } = require("../../middlewares/validation.middleware");
const { verifyAuth } = require("../../middlewares/verifyAuth.middleware");
const PaymentSchema = require("./payment-order.schema");
const PaymentController = require("./payment-order.controller");

const router = require("express").Router();

router.post(
  "/create-order",
  verifyAuth,
  validateBody(PaymentSchema.PlanIdSchema),
  PaymentController.createOrderController,
);
router.post(
  "/verify-order",
  verifyAuth,
  validateBody(PaymentSchema.PaymentVerificationDetailsSchema),
  PaymentController.verifyOrderController,
);

module.exports = router;
