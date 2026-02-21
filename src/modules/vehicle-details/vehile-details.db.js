const { db } = require("../../configs/firebase.config");

const COLLECTION_NAME = "userProfiles";

/**
 * @desc adds vehicle info
 *
 * @returns {Promise<void>}
 */
const addVehicleInfo = async ({ uid, vehicleDetails }) => {
  const timestamp = Date.now();

  const userProfileDoc = {
    ...vehicleDetails,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await db.collection(COLLECTION_NAME).doc(uid).set(userProfileDoc);
  return;
};

/**
 * @desc gets vehicle info
 *
 * @returns {Promise<object>} vehicle details
 */
const getVehicleInfo = async (uid) => {
  const doc = await db.collection(COLLECTION_NAME).doc(uid).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

/**
 * @desc updates vehicle details
 *
 * @returns {Promise<void>}
 */
const updateUserProfile = async ({ uid, updates }) => {
  const docRef = db.collection(COLLECTION_NAME).doc(uid);

  await docRef.update({
    ...updates,
    updatedAt: Date.now(),
  });
};

module.exports = { addVehicleInfo, getVehicleInfo, updateUserProfile };
