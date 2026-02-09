const Joi = require("joi");

const syncUserSchema = Joi.object({
  referredBy: Joi.string().allow("", null).optional().default("NO_REFERRAL"),
}).unknown(true); // Allow extra fields from frontend

module.exports = { syncUserSchema };
