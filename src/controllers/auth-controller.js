const httpStatus = require("http-status");
const authService = require("../services/auth-service");

const login = (req, res) => {};
const register = (req, res) => {
  authService.register(req.body).then((data) => {
    if (!data) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        msg: "user registration failed",
      });
      return
    } else if (data.error) {
      res.status(httpStatus.BAD_REQUEST).send({
        msg: data.msg,
        data: data.data || [],
      });
      return
    } else {
      const user = data
      delete user.password;
      delete user.confirmPass;
      res.status(httpStatus.CREATED).send({
        msg: "user registration success",
        data: user,
      });
    }
  });
};

module.exports = {
  login,
  register,
};
