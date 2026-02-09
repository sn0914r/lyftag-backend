const { db } = require("../configs/firebase.config");
const AppError = require("../errors/AppError");

const COLLECTION_NAME = "users";

const addUser = async ({
  uid,
  email,
  name,
  provider,
  referralCode,
  referredBy,
}) => {
  const timestamp = Date.now();
  const userDocument = {
    uid,
    email,
    name,
    provider,

    referralCode,
    referredBy: referredBy || "",

    totalReferralEarnings: 0,
    totalReferralsCount: 0,
    availableReferralBalanceAmount: 0,

    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return db.collection(COLLECTION_NAME).doc(uid).set(userDocument);
};

const getUser = async (uid) => {
  const userDocument = await db.collection(COLLECTION_NAME).doc(uid).get();
  return userDocument.data();
};

const getUserByReferredByCode = async (referredBy) => {
  const userDocument = await db
    .collection(COLLECTION_NAME)
    .where("referralCode", "==", referredBy)
    .get();
  if (userDocument.empty) throw new AppError("User not found", 404);

  const doc = userDocument.docs[0];
  return { uid: doc.id, ...doc.data() };
};

const updateUser = async (uid, data) => {
  return db.collection(COLLECTION_NAME).doc(uid).update(data);
};

module.exports = { addUser, getUser, getUserByReferredByCode, updateUser };
