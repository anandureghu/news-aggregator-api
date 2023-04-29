const { users } = require("../utils/data");

const validateUserRegistration = (user) => {
  const errors = [];
  const requiredFields = ["username", "password", "confirmPass", "email"];
  requiredFields.forEach((field) => {
    if (!validRequiredField(user[field])) {
      errors.push({
        field,
        msg: `${field} is required`,
      });
    }
  });

  const uniqueFields = ["username", "email"];
  uniqueFields.forEach((field) => {
    users.forEach((u) => {
      if (u[field] === user[field]) {
        errors.push({
          field,
          msg: `user with ${field} already exists`,
        });
      }
    });
  });

  return errors;
};

const validRequiredField = (value) => {
  if (typeof value === "string") {
    if (!value || value === "" || value === " ") {
      return false;
    }
  }

  return true;
};

module.exports = {
  validateUserRegistration,
};
