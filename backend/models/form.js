const Joi = require("@hapi/joi");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    "Form",
    {
      title: DataTypes.STRING,
      fields: DataTypes.STRING,
      type: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
    },
    {}
  );
  Form.associate = function (models) {
    // associations can be defined here
  };
  return Form;
};

module.exports.FormValidationSchema = Joi.object().keys({
  title: Joi.string().alphanum().min(3).max(30).required(),
  fields: Joi.string().required(),
  type: Joi.number().positive(),
  userId: Joi.number().positive().required(),
  companyId: Joi.number().positive(),
  clientId: Joi.number().positive(),
});
