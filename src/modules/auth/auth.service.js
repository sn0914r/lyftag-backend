const authDB = require("./auth.db");
const AppError = require("../../errors/AppError");
const Utils = require("./auth.utils");

/**
 * @desc Saves user details
 *
 * Side Effects:-
 *  - Adds user to DB
 *
 * Fails when:-
 *  - User already exists
 *
 * @returns {object} user
 */
const syncUser = async ({ uid, email, name, referredBy }) => {
  if (await authDB.isUserExists(uid)) throw new AppError("User already exists", 400);

  const referralCode = Utils.generateReferralCode();

  await authDB.addUser({
    uid,
    email,
    name,
    referredBy,
    referralCode,
  });

  const user = authDB.getUser(uid);
  if (!user) throw new AppError("User not found", 404);

  return user;
};
module.exports = { syncUser };
