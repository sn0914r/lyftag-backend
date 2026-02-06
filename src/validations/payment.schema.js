const Joi = require("joi");

const planIdSchema = Joi.object({
  planId: Joi.string().required().valid("BASIC", "PREMIUM"),
});

const verifyOrderSchema = Joi.object({
  razorpayOrderId: Joi.string().required(),
  razorpayPaymentId: Joi.string().required(),
  razorpaySignature: Joi.string().required(),
});

module.exports = { planIdSchema, verifyOrderSchema };
