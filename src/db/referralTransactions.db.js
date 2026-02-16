const { db } = require("../configs/firebase.config");

const COLLECTION_NAME = "refferalTransactions";

const addTransaction = async ({
  refferedBy,
  referredUid,
  orderId,
  rewardAmount,
}) => {
  const transactionDocument = await db.collection(COLLECTION_NAME).add({
    refferedBy,
    referredUid,
    orderId,
    rewardAmount,
    createdAt: Date.now(),
  });
  return transactionDocument.id;
};

module.exports = { addTransaction };
