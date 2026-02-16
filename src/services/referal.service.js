const UsersDB = require("../db/user.db");
const ReferralTransactionsDB = require("../db/referralTransactions.db");
const AppError = require("../errors/AppError");

const referralService = async (referredBy, orderId) => {
  if (!referredBy || referredBy === "NO_REFERRAL") return;

  const user = await UsersDB.getUserByReferredByCode(referredBy);
  if (!user) throw new AppError("User not found", 404);

  await UsersDB.updateUser(user.uid, {
    totalReferralEarnings: user.totalReferralEarnings + 50,
    totalReferralsCount: user.totalReferralsCount + 1,
    availableReferralBalanceAmount: user.availableReferralBalanceAmount + 50,
  });

  await ReferralTransactionsDB.addTransaction({
    referrerUid: user.uid,
    referredBy,
    orderId: orderId,
    rewardAmount: 50,
  });

  return user;
};

module.exports = { referralService };
