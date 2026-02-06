const { db } = require("../configs/firebase.config");

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

module.exports = { addUser, getUser };
