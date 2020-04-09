const Joi = require("@hapi/joi");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      name: DataTypes.STRING,
      abn: DataTypes.INTEGER,
      address: DataTypes.STRING
    },
    {}
  );
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};

module.exports.CompanyValidationSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  address: Joi.string()
    .alphanum()
    .min(3)
    .required(),

  abn: Joi.number().required()
});
