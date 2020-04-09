const User = require("../models/index")["User"];
const jwt = require("jsonwebtoken");
const PasswordHasher = require("./password-service");

module.exports = class UsersService {
  constructor() {
    this.passwordHasher = new PasswordHasher();
  }

  async create(user) {
    user.password = await this.passwordHasher.hash(user.password);
    user = await User.create(user);
    return this.generateAccessToken(user);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async signIn(email, password) {
    let user = await this.findByEmail(email);
    // console.log(email, "success");
    if (!user) {
      return null;
    }
    if ((await this.passwordHasher.check(password, user.password)) === true) {
      return this.generateAccessToken(user);
    } else {
      return null;
    }
  }

  generateAccessToken(user) {
    if (!user) {
      throw new Error("Invalid User");
    }
    //stringfy user object
    let userInfo = user.toJSON();
    delete userInfo.password;
    let payload = {
      user: userInfo,
    };
    // console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "3600",
      subject: `${user.id}`,
    });
    console.log(user);
    return token;
  }

  async findOne(email) {
    return await User.findOne({ where: { email } });

  }

  // async deleteOne(id) {}
};
