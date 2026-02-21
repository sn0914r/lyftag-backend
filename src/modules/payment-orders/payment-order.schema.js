const Joi = require("joi");

const PlanIdSchema = Joi.object({
  plan: Joi.string().required().valid("BASIC", "PREMIUM"),
});

const PaymentVerificationDetailsSchema = Joi.object({
  razorpayOrderId: Joi.string().required(),
  razorpayPaymentId: Joi.string().required(),
  razorpaySignature: Joi.string().required(),
});

module.exports = { PlanIdSchema, PaymentVerificationDetailsSchema };
