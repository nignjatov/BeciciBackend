module.exports = {
  'MODULE_NOT_FOUND': {
    httpCode: 500,
    message: 'Oops! Something went wrong :(',
    errorSeverity: 3
  },
  'SYSTEM_ERROR': {
    httpCode: 500,
    message: 'Oops! Something went wrong :(',
    errorSeverity: 3
  },
  'MONGO_ERROR': {
    httpCode: 500,
    message: 'Oops! Something went wrong :(',
    errorSeverity: 3
  },
  'AUTHORIZATION_ERROR': {
    httpCode: 403,
    message: 'You are not authorized',
    errorSeverity: 2
  },
  'FILE_FORMAT_ERROR': {
    httpCode: 500,
    message: 'Wrong file format!',
    errorSeverity: 2
  },
  'EMAIL_ERROR': {
    httpCode: 500,
    message: 'Wrong file format!',
    errorSeverity: 2
  }
};
