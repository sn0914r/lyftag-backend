const AppError = require("../../errors/AppError");

const VehicleDB = require("./vehile-details.db");
const AuthDB = require("../auth/auth.db");

const { nanoid } = require("nanoid");

/**
 * @desc adds vehicle info
 *
 * Side Effects:-
 *  - Adds vehicle info to DB
 *
 * @returns {Promise<object>} vehicle details
 */
const addVehicleInfo = async ({ uid, userDetails }) => {
  const qrId = nanoid(10);

  await VehicleDB.addVehicleInfo({
    uid,
    vehicleDetails: userDetails,
    qrId,
  });

  const vehicleDetails = await VehicleDB.getVehicleInfo(uid);
  return vehicleDetails;
};

/**
 * @desc gets vehicle info
 *
 * @returns {Promise<object>} vehicle details
 */
const getVehicleInfo = async (uid) => {
  const isUserExists = await AuthDB.isUserExists(uid);
  if (!isUserExists) throw new AppError("User not found", 404);

  const vehicleDetails = await VehicleDB.getVehicleInfo(uid);
  if (!vehicleDetails) throw new AppError("Vehicle details not found", 404);

  return vehicleDetails;
};

/**
 * @desc updates vehicle details
 *
 * @returns {Promise<object>} updated vehicle details
 */
const updateVehicleInfo = async ({ uid, updates }) => {
  if (!AuthDB.isUserExists(uid)) throw new AppError("User not found", 404);

  const vehicleDetails = await VehicleDB.getVehicleInfo(uid);
  if (!vehicleDetails) throw new AppError("Vehicle details not found", 404);

  await VehicleDB.updateUserProfile({ uid, updates });

  const updatedVehicleDetails = await VehicleDB.getVehicleInfo(uid);
  return updatedVehicleDetails;
};

module.exports = { addVehicleInfo, getVehicleInfo, updateVehicleInfo };
