const VehicleDetailsService = require("./vehicle-details.service");

/**
 * @desc add vehicle info
 *
 * Preconditions:-
 *  - request is authenticated
 *  - req.user.uid exists
 *  - req.body contains valid vehicle info
 *
 * @route /vehicle-details/add
 * @access Private
 */
const addVehicleInfoController = async (req, res) => {
  const { ownerName, vehicleRegistrationNumber, bloodGroup, ownerPhoneNumber } =
    req.body;
  const { uid } = req.user;

  const vehicleDetails = await VehicleDetailsService.addVehicleInfo({
    uid,
    userDetails: {
      ownerName,
      vehicleRegistrationNumber,
      bloodGroup,
      ownerPhoneNumber,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Vehicle info added successfully",
    data: vehicleDetails,
  });
};

/**
 * @desc get vehicle info
 *
 * Preconditions:-
 *  - request is authenticated
 *  - req.user.uid exists
 *
 * @route /vehicle-details/get
 * @access Private
 */
const getVehicleInfoController = async (req, res) => {
  const { uid } = req.user;
  const vehicleDetails = await VehicleDetailsService.getVehicleInfo(uid);

  return res.status(200).json({
    success: true,
    message: "Vehicle info fetched successfully",
    data: vehicleDetails,
  });
};

/**
 * @desc update vehicle info
 *
 * Preconditions:-
 *  - request is authenticated
 *  - req.user.uid exists
 *  - req.body contains valid vehicle info
 *
 * @route /vehicle-details/update
 * @access Private
 */
const updateVehicleInfoController = async (req, res) => {
  const { uid } = req.user;
  const updates = req.body;

  const vehicleDetails = await VehicleDetailsService.updateVehicleInfo({
    uid,
    updates,
  });

  return res.status(200).json({
    success: true,
    message: "Vehicle info updated successfully",
    data: vehicleDetails,
  });
};

module.exports = {
  addVehicleInfoController,
  getVehicleInfoController,
  updateVehicleInfoController,
};
