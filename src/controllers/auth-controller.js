const httpStatus = require("http-status");
const authService = require("../services/auth-service");

const login = (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };
  authService.login(params).then((data) => {
    if (data.hasOwnProperty("error")) {
      if (data.error === true) {
        res.status(data.code || httpStatus.BAD_REQUEST).send({
          msg: data.msg,
          data: data.data || [],
        });
      }
    } else {
      res.status(httpStatus.CREATED).send(data);
    }
  });
};

const register = (req, res) => {
  authService.register(req.body).then((data) => {
    if (!data) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        msg: "user registration failed",
      });
      return;
    } else if (data.error) {
      res.status(httpStatus.BAD_REQUEST).send({
        msg: data.msg,
        data: data.data || [],
      });
      return;
    } else {
      const user = data;
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
