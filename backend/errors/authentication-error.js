//401 error

module.exports = class AuthenticationError {
  constructor(message) {
    this.message = message;
  }
};
