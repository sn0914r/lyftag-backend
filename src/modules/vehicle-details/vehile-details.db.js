const { db } = require("../../configs/firebase.config");

const COLLECTION_NAME = "vehicleDetails";

/**
 * @desc adds vehicle info
 *
 * @returns {Promise<void>}
 */
const addVehicleInfo = async ({ uid, vehicleDetails, qrId }) => {
  const timestamp = Date.now();

  const userProfileDoc = {
    ...vehicleDetails,
    qrId,
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

/**
 * @desc gets vehicle info by QR Id
 *
 * @return {Promise<object>} vehicle details
 */
const getVehicleInfoByQRId = async (qrId) => {
  const doc = await db
    .collection(COLLECTION_NAME)
    .where("qrId", "==", qrId)
    .get();
  if (doc.empty) return null;
  return { id: doc.docs[0].id, ...doc.docs[0].data() };
};

module.exports = {
  addVehicleInfo,
  getVehicleInfo,
  updateUserProfile,
  getVehicleInfoByQRId,
};
