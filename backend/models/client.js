const Joi = require("@hapi/joi");

("use strict");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      formId: DataTypes.INTEGER
    },
    {}
  );
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};

module.exports.ClientValidationSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  userId: Joi.number()
    .positive()
    .required(),

  companyId: Joi.number()
    .positive()
    .required(),

  formId: Joi.number()
    .positive()
    .required()
});
