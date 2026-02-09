const AuthServices = require("../services/auth.service");

const syncUserController = async (req, res) => {
  const {
    uid,
    email,
    name,
    firebase: { sign_in_provider: provider },
  } = req.user;
  const referredBy = req.body?.referredBy || "NO_REFERRAL";

  const user = await AuthServices.syncUser({
    uid,
    email,
    name,
    provider,
    referredBy,
  });

  res.status(200).json(user);
};

module.exports = { syncUserController };
