const { db } = require("../../configs/firebase.config");
const COLLECTION_NAME = "users";

/**
 * @desc upload user details
 */
const addUser = async ({ uid, email, name, referralCode, referredBy }) => {
  const timestamp = Date.now();
  const userDocument = {
    uid,
    email,
    name,

    referralCode,
    referredBy: referredBy || "",

    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return db.collection(COLLECTION_NAME).doc(uid).set(userDocument);
};

/**
 * @desc updates user
 */
const updateUser = async (uid, updates) => {
  const docRef = await db.collection(COLLECTION_NAME).doc(uid);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    return null;
  }
  await docRef.update(updates);
  return true;
};

/**
 * @desc checks if user exists
 */

const isUserExists = async (uid) => {
  const doc = await db.collection(COLLECTION_NAME).doc(uid).get();
  return doc.exists;
};

/**
 * @desc gets user
 */
const getUser = async (uid) => {
  const doc = await db.collection(COLLECTION_NAME).doc(uid).get();
  return doc.exists ? doc.data() : null;
};

module.exports = { addUser, updateUser, isUserExists, getUser };
