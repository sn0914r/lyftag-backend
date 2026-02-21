const Joi = require("joi");

const userDetailsSchema = Joi.object({
  ownerName: Joi.string().required(),
  bloodGroup: Joi.string().required(),
  ownerPhoneNumber: Joi.string().required(),
  vehicleRegistrationNumber: Joi.string().required(),
});

module.exports = { userDetailsSchema };
