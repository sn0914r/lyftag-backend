const router = require("express").Router();
const { verifyAuth } = require("../../middlewares/verifyAuth.middleware");
const ReferralController = require("./referral.controller");

router.get("/", verifyAuth, ReferralController.getReferralInfoController);

module.exports = router;
