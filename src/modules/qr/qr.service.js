const AppError = require("../../errors/AppError");
const VehicleDB = require("../vehicle-details/vehile-details.db");

/**
 * @desc creates qr code
 */
const getVehicleInfo = async (publicId) => {
  const vehicleDetails = await VehicleDB.getVehicleInfoByQRId(publicId);
  if (!vehicleDetails) throw new AppError("Vehicle details not found", 404);
  const { createdAt, updatedAt, id, qrId, ...rest } = vehicleDetails;
  return { ...rest };
};

module.exports = { getVehicleInfo };
