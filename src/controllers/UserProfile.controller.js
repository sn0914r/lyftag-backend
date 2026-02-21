const UserProfileService = require("../services/userProfile.service");

const addUserProfileController = async (req, res) => {
  const { ownerName, vehicleRegistrationNumber, bloodGroup, ownerPhoneNumber } =
    req.body;
  const { uid } = req.user;

  console.log(req.body);
  console.log(uid);

  const userDetailsId = await UserProfileService.addUserProfile({
    uid,
    userDetails: {
      ownerName,
      vehicleRegistrationNumber,
      bloodGroup,
      ownerPhoneNumber,
    },
  });

  return res.status(201).json({
    message: "User profile added successfully",
    userDetailsId,
  });
};

const getUserProfileController = async (req, res) => {
  const { uid } = req.user;

  const { user, userProfile } = await UserProfileService.getUserProfile(uid);

  return res.status(200).json({
    message: "User profile fetched successfully",
    user,
    userProfile,
  });
};

const updateUserProfileController = async (req, res) => {
  const { uid } = req.user;
  const updates = req.body;
  const updatedProfile = await UserProfileService.updateUserProfile({
    uid,
    updates,
  });

  return res.status(200).json({
    message: "User profile updated successfully",
    userProfile: updatedProfile,
  });
};

module.exports = {
  addUserProfileController,
  getUserProfileController,
  updateUserProfileController,
};
