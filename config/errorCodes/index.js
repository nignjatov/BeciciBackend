module.exports = {
  'SYSTEM_ERROR': {
    httpCode: 500,
    message: 'Oops! Something went wrong :(',
    errorServerity: 3
  },
  'MONGO_ERROR': {
    httpCode: 500,
    message: 'Oops! Something went wrong :(',
    errorServerity: 3
  },
  'AUTHORIZATION_ERROR': {
    httpCode: 403,
    message: 'You are not authorized',
    errorServerity: 2
  }
}
