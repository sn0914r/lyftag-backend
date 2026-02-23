const { db, admin } = require("../../configs/firebase.config");
const COLLECTION_NAME = "referralDetails";

/**
 * @desc updates user's referal Details
 */
const manageReferralDetails = async ({ referredBy }) => {
  const timestamp = Date.now();

  const document = {
    totalReferralEarnings: admin.firestore.FieldValue.increment(50),
    totalReferralsCount: admin.firestore.FieldValue.increment(1),
    availableReferralBalanceAmount: admin.firestore.FieldValue.increment(50),

    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return db
    .collection(COLLECTION_NAME)
    .doc(referredBy)
    .set(document, { merge: true });
};

/**
 * @desc gets a specific user's referral details
 */
const getReferralDetails = async (referredBy) => {
  const snapshot = await db.collection(COLLECTION_NAME).doc(referredBy).get();
  return snapshot.exists ? snapshot.data() : {};
};

module.exports = { manageReferralDetails, getReferralDetails };
