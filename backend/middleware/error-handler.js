const chalk = require("chalk");
const ValidationError = require("../errors/error-types").ValidationError;
const AuthenticationError = require("../errors/error-types").AuthenticationError;
const AccessDeniedError = require("../errors/error-types").AccessDeniedError;


function errorLogger(err, req, res, next) {
  if (err.message) {
    console.log(chalk.red(err.message));
  }
  if (err.stack) {
    console.log(chalk.red(err.message));
  }
  next(err);
}

function validationError(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.sendStatus(400);
  }
  next(err);
}

function authenticationError(err, req, res, next) {
  if (err instanceof AuthenticationError) {
    return res.sendStatus(401);
  }
  next(err);
}

function accessDeniedError(err, req, res, next) {
  if (err instanceof AccessDeniedError) {
    return res.sendStatus(403);
  }
  next(err);
}

//when library or default error or js obj error && internal server
function genericErrorHandler(err, req, res, next) {
  res.sendStatus(500);
  next(err);
}

module.exports = function ErrorHandlerMiddleware(app) {
  app.use([
    errorLogger,
    authenticationError,
    validationError,
    accessDeniedError,
    genericErrorHandler
  ]);
};
