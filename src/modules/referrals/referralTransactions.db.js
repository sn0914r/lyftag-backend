const { db } = require("../../configs/firebase.config");

const COLLECTION_NAME = "referralTransactions";

/**
 * @desc creates a transaction document
 */
const createTransaction = async ({
  referredBy,
  uid,
  orderId,
  rewardAmount,
}) => {
  const transactionDocument = await db.collection(COLLECTION_NAME).add({
    referredBy,
    uid,
    orderId,
    rewardAmount,

    createdAt: Date.now(),
  });
  return transactionDocument.id;
};

/**
 * @desc gets refferal transactions by referral code
 */
const getTransactions = async (referralCode) => {
  const snapshot = await db
    .collection(COLLECTION_NAME)
    .where("referredBy", "==", referralCode)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

module.exports = { createTransaction, getTransactions };
