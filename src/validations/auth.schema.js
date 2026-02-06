const Joi = require("joi");

const syncUserSchema = Joi.object({
  referredBy: Joi.string().optional().default(""),
});

module.exports = { syncUserSchema };
