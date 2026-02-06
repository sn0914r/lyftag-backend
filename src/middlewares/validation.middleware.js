const AppError = require("../errors/AppError");

const validateBody = (schema) => (req, res, next) => {
  console.log(req.body)
  const { error, value } = schema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  req.body = value;
  next();
};

module.exports = { validateBody };
