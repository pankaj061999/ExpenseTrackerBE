class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errorCode: string;

  constructor(
    statusCode: number,
    message: string,
    errorCode: string = "",
    isOperational: boolean = true,
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode === "" ? String(statusCode) : errorCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
