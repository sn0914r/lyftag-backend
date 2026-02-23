const AuthDB = require("../auth/auth.db");
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
    referredBy,
  });

  return transactionId;
};

/**
 * @desc gets referral data by user uid
 */
const getReferralInfoService = async (uid) => {
  const user = await AuthDB.getUser(uid);
  if (!user) throw new AppError("User not found", 404);
  console.log(user, "user");
  const referralCode = user.referralCode;
  console.log("referralCode", referralCode);
  if (!referralCode) return { referralDetails: {}, referralTransactions: [] };

  const referralDetails =
    await ReferralDetailsDB.getReferralDetails(referralCode);
  const referralTransactions =
    await ReferralTransactionsDB.getTransactions(referralCode);

  // if (!referralDetails) throw new AppError("Referral details not found", 404);
  // if (!referralTransactions)
  //   throw new AppError("Referral transactions not found", 404);

  return { referralDetails, referralTransactions };
};

module.exports = { referralService, getReferralInfoService };
