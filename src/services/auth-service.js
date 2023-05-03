const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { validateUserLogin, validateUserRegistration } = require("../validators/user-validator");
const { users } = require("../utils/data");
const apiConfig = require("../config/api-config");

const login = async (params) => {
  const errors = validateUserLogin(params);
  if (errors.length) {
    return {
      error: true,
      msg: "inavlid details provided",
      data: errors,
    };
  } else {
    const user = users.find((user) => user.username === params.username);
    if (!user) {
      return {
        code: httpStatus.NOT_FOUND,
        error: true,
        msg: "user not exists please register first",
      };
    } else {
      const match = bcrypt.compareSync(params.password, user.password);
      if (match === true) {
        const tokenData = {
          userId: user.id,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // one hour
            data: tokenData,
          },
          apiConfig.JWT_SECRET
        );
        return {
          msg: "successfully logged in",
          token,
        };
      } else {
        return {
          code: httpStatus.UNAUTHORIZED,
          error: true,
          msg: "invalid password",
        };
      }
    }
  }
};

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
        user.preferences = [];
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
