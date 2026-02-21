const {
  addUserProfileController,
  getUserProfileController,
  updateUserProfileController,
} = require("../controllers/UserProfile.controller");
const { validateBody } = require("../middlewares/validation.middleware");
const { verifyAuth } = require("../middlewares/verifyAuth.middleware");
const { userDetailsSchema } = require("../validations/userProfile.schema");

const router = require("express").Router();

router.post(
  "/user/details",
  verifyAuth,
  validateBody(userDetailsSchema),
  addUserProfileController,
);

router.get("/user/details", verifyAuth, getUserProfileController);
router.patch("/user/details", verifyAuth, updateUserProfileController);

module.exports = router;
