const bcrypt = require("bcrypt");
const { validateUserRegistration } = require("../validators/user-validator");
const { users } = require("../utils/data");

const login = () => {};
const register = async (params) => {
  const user = {
    username: params.username ? params.username : "",
    password: params.password ? params.password : "",
    confirmPassword: params.confirmPassword ? params.confirmPassword : "",
    email: params.email ? params.email : "",
  };
  const errors = validateUserRegistration(user);
  if (errors.length) {
    return {
      error: true,
      msg: "inavlid details provided",
      data: errors,
    };
  } else {
    if (user.password !== user.confirmPassword) {
      return {
        error: true,
        msg: "password and confirm password not matching",
      };
    } else {
      delete user.confirmPassword;
      const saltRounds = 10;

      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash;
        users.push(user);
      });

      return user;
    }
  }
};

module.exports = {
  login,
  register,
};
