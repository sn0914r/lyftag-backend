/**
 * @desc generates a random referral code
 */
const generateReferralCode = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "LYF";
  for (let i = 0; i < length; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return referralCode;
};

module.exports = { generateReferralCode };
