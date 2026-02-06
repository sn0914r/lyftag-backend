const UserDB = require("../db/user.db");
const AppError = require("../errors/AppError");
const { generateReferralCode } = require("../utils/generateReferralCode");

const syncUser = async ({ uid, email, name, provider, referredBy }) => {
  let user = await UserDB.getUser(uid);

  if (user) throw new AppError("User already exists", 400);

  const referralCode = generateReferralCode();

  user = await UserDB.addUser({
    uid,
    email,
    name,
    provider,
    referredBy,
    referralCode,
  });

  return user;
};

module.exports = { syncUser };
