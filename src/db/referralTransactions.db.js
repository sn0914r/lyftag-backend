const { db } = require("../configs/firebase.config");

const COLLECTION_NAME = "refferalTransactions";

const addTransaction = async ({
  referrerUid,
  referredUid,
  orderId,
  rewardAmount,
}) => {
  const transactionDocument = await db.collection(COLLECTION_NAME).add({
    referrerUid,
    referredUid,
    orderId,
    rewardAmount,
    createdAt: Date.now(),
  });
  return transactionDocument.id;
};

module.exports = { addTransaction };
