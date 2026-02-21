const Joi = require("joi");

const AddVehicleDetailsSchema = Joi.object({
  ownerName: Joi.string().required(),
  bloodGroup: Joi.string().required(),
  ownerPhoneNumber: Joi.string().required(),
  vehicleRegistrationNumber: Joi.string().required(),
});

const updateVehicleDetailsSchema = Joi.object({
  ownerName: Joi.string().optional(),
  bloodGroup: Joi.string().optional(),
  ownerPhoneNumber: Joi.string().optional(),
  vehicleRegistrationNumber: Joi.string().optional(),
}).min(1);

module.exports = { AddVehicleDetailsSchema, updateVehicleDetailsSchema };
