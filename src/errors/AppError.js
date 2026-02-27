class AppError extends Error {
  constructor(message, statusCode = 400, errorCode = "INTERNAL_ERROR") {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

module.exports = AppError;
