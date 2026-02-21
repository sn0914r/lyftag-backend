const Joi = require("joi");

const refferalCodeSchema = Joi.object({
  referredBy: Joi.string().allow("", null).optional().default("NO_REFERRAL"),
});

module.exports = { refferalCodeSchema };
