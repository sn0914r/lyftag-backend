const AuthServices = require("./auth.service");

/**
 * @desc syncs user details from firebase to our database
 */
const syncUserController = async (req, res) => {
  const {
    uid,
    email,
    firebase: { sign_in_provider: provider },
  } = req.user;
  const referredBy = req.body?.referredBy || "NO_REFERRAL";
  const name = req.body?.name || "User";

  const user = await AuthServices.syncUser({
    uid,
    email,
    name,
    provider,
    referredBy,
  });

  res.status(200).json({
    success: true,
    message: "User synced successfully",
    data: user,
  });
};

module.exports = { syncUserController };
