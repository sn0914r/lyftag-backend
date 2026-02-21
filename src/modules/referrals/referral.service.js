const UsersDB = require("../auth/auth.db");
const ReferralTransactionsDB = require("./referralTransactions.db");
const ReferralDetailsDB = require("./referralDetails.db");
const AppError = require("../../errors/AppError");

/**
 * @desc handles referral logic
 *
 * Side Effects
 *  - Saves the referral transaction
 *  - Adjusts the referral amount
 *
 * @returns {Promise<string>} Transaction Id
 */
const referralService = async ({ referredBy, orderId, userId }) => {
  if (!referredBy || referredBy === "NO_REFERRAL") return;

  const referralDetails =
    await ReferralDetailsDB.getReferralDetails(referredBy);

  const transactionId = await ReferralTransactionsDB.createTransaction({
    referredBy,
    uid: userId,
    orderId,
    rewardAmount: 50,
  });

  await ReferralDetailsDB.manageReferralDetails({
    uid: referredBy,
  });

  return transactionId;
};

module.exports = { referralService };
