const Joi = require("@hapi/joi");

("use strict");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};

module.exports.UserValidationSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),

  type: Joi.number().positive(),

  password: Joi.string().min(4).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  companyId: Joi.number().positive(),
});

module.exports.UserLoginValidationSchema = Joi.object().keys({
  password: Joi.string().required(),

  email: Joi.string().required(),
});
