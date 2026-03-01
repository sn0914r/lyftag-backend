const AppError = require("../errors/AppError");

const errorHandler = (err, _req, res, _next) => {
  const isProduction = process.env.NODE_ENV === "production";
  const status = err.statusCode || err.status || 500;

  console.error(err);

  if (!isProduction) {
    const body = {
      success: false,
      message: err.message || "Something went wrong",
      errorCode: err.errorCode || "INTERNAL_ERROR",
      stack: err.stack,
    };
    
    if (err.errors) body.errors = err.errors;
    return res.status(status).json(body);
  }

  if (err instanceof AppError) {
    const body = {
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    };
    if (err.errors) body.errors = err.errors;
    return res.status(status).json(body);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    errorCode: "INTERNAL_ERROR",
  });
};

module.exports = errorHandler;
