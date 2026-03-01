const AppError = require("../errors/AppError");

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    const appError = new AppError("Validation failed", 400, "VALIDATION_ERROR");
    appError.errors = errors;
    throw appError;
  }
  
  req.body = value;
  next();
};

module.exports = { validateBody };
