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
  const transactionDocument = await db
    .collection(COLLECTION_NAME)
    .add({
      referredBy,
      uid,
      orderId,
      rewardAmount,

      createdAt: Date.now(),
    });
  return transactionDocument.id;
};

module.exports = { createTransaction };
