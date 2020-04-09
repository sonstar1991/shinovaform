const Form = require("../models/index")["Form"];
const User = require("../models/index")["User"];
const jwt = require("jsonwebtoken");


module.exports = class FormsService {
  async findAll(userId) {
    return await Form.findAll({ where: { userId } });
  }

  async findOne(id) {
    return await Form.findOne({ where: { id } });
  }

  async create(form) {
    // const user = User.findOneById({where: {id}})
    return await Form.create(form);
  }

  async deleteOne(id) {
    return await Form.destroy({ where: { id } });
  }

  
};
