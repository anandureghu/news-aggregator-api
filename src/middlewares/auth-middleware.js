const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).send({
        msg: "please login to continue",
        error: true,
      });
      return;
    } else {
      const tokenData = jwt.decode(token);
      if (tokenData.exp < Date.now() / 1000) 
        res.status(httpStatus.UNAUTHORIZED).send({
          msg: "session expired, please login to continue",
          error: true,
        })
      else{
        req.user = tokenData.data
        next();
      }
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).send({
      msg: "please login to continue",
      error: true,
    });
    return;
  }
};

module.exports = authMiddleware;
