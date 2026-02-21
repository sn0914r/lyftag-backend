const userProfileDB = require("../db/userProfiles.db");
const userDB = require("../db/user.db");
const AppError = require("../errors/AppError");

const addUserProfile = async ({ uid, userDetails }) => {
  const userDetailsId = await userProfileDB.addUserProfile({
    uid,
    details: userDetails,
  });

  return userDetailsId;
};

const getUserProfile = async (uid) => {
  const user = await userDB.getUser(uid);

  if (!user) throw new AppError("User not found", 404);

  const userProfile = await userProfileDB.getUserProfile(uid);
  if (!userProfile) throw new AppError("User profile not found", 404);

  if (userProfile.uid !== uid) {
    throw new AppError("Unauthorized access to user profile", 403);
  }

  return { user, userProfile };
};

const updateUserProfile = async ({ uid, updates }) => {
  const user = await userDB.getUser(uid);
  if (!user) throw new AppError("User not found", 404);

  const userProfile = await userProfileDB.getUserProfile(uid);
  if (!userProfile) throw new AppError("User profile not found", 404);

  const updatedProfile = await userProfileDB.updateUserProfile(uid, updates);
  return updatedProfile;
};

module.exports = { addUserProfile, getUserProfile, updateUserProfile };
