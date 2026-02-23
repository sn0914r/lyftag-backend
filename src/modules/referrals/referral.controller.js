const ReferralService = require("./referral.service");

const getReferralInfoController = async (req, res) => {
  const { uid } = req.user;
  const referralInfo = await ReferralService.getReferralInfoService(uid);
  return res.status(200).json(referralInfo);
};

module.exports = { getReferralInfoController };
