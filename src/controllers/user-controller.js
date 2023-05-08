const httpStatus = require("http-status");
const userService = require("../services/user-service");

const GetUserPreferences = (req, res) => {
  const id = req.user.userId;
  const preferences = userService.getUserPreferences(id);
  res.status(httpStatus.OK).send({
    msg: "successfully collected preferences",
    data: preferences,
  });
};

const UpdateUserPreferences = (req, res) => {
  const params = {};
  params.id = req.user.userId;
  params.preferences = req.body.preferences;
  const updatedUSer = userService.updateUserPreferences(params);
  delete updatedUSer.password
  res.status(httpStatus.CREATED).send(updatedUSer);
};

module.exports = {
  GetUserPreferences,
  UpdateUserPreferences,
};
