const { db, admin } = require("../../configs/firebase.config");
const COLLECTION_NAME = "referralDetails";

/**
 * @desc updates user's referal Details
 */
const manageReferralDetails = async ({ uid }) => {
  const timestamp = Date.now();

  const document = {
    totalReferralEarnings: admin.firestore.FieldValue.increment(50),
    totalReferralsCount: admin.firestore.FieldValue.increment(1),
    availableReferralBalanceAmount: admin.firestore.FieldValue.increment(50),

    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return db.collection(COLLECTION_NAME).doc(uid).set(document, { merge: true });
};

/**
 * @desc gets a specific user's referral details
 */
const getReferralDetails = async (uid) => {
  const snapshot = db.collection(COLLECTION_NAME).doc(uid).get();
  return snapshot.exists ? snapshot.data() : null;
};

module.exports = { manageReferralDetails, getReferralDetails };
