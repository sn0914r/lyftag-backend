const Joi = require("joi");

const refferalCodeSchema = Joi.object({
  referredBy: Joi.string().allow("", null).optional().default("NO_REFERRAL"),
  name: Joi.string().required()
});

module.exports = { refferalCodeSchema };
