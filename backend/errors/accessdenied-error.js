//403 error

module.exports = class AccessDeniedError {
  constructor(message) {
    this.message = message;
  }
};
