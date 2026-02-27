const { auth } = require("../configs/firebase.config");
const AppError = require("../errors/AppError");

const verifyAuth = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];

  if (!token)
    throw new AppError("Authorization token is required", 401, "UNAUTHORIZED");

  const decodedToken = await auth.verifyIdToken(token);
  req.user = decodedToken;
  next();
};

module.exports = { verifyAuth };
