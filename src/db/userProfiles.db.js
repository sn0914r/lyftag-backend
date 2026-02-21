const { db } = require("../configs/firebase.config");

const COLLECTION_NAME = "userProfiles";

const addUserProfile = async ({ uid, details }) => {
  const timestamp = Date.now();

  const userProfileDoc = {
    uid,
    ...details,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const doc = await db.collection(COLLECTION_NAME).doc(uid).set(userProfileDoc);
  return doc.id;
};

const getUserProfile = async (uid) => {
  const doc = await db.collection(COLLECTION_NAME).doc(uid).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const updateUserProfile = async (uid, updates) => {
  const docRef = db.collection(COLLECTION_NAME).doc(uid);

  await docRef.update({
    ...updates,
    updatedAt: Date.now(),
  });

  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

module.exports = { addUserProfile, getUserProfile, updateUserProfile };
