const AppError = require("../../errors/AppError");
const AuthService = require("../auth/auth.db");

const checkSubscription = async (req, res, next) => {
  const { uid } = req.user;
  const user = await AuthService.getUser(uid);
  if (!user) {
    throw new AppError("User not found", 404, "NOT_FOUND");
  }

  if (!user.planStatus) {
    throw new AppError("User is not subscribed", 400, "NOT_SUBSCRIBED");
  }
  if (user.planExpiryDate < Date.now()) {
    throw new AppError("User plan is expired", 400, "PLAN_EXPIRED");
  }
  next();
};

module.exports = { checkSubscription };
