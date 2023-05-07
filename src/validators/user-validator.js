const { users } = require("../utils/data");

const validateUserLogin = (user) => {
  const errors = [];
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!validRequiredField(user[field] || "")) {
      errors.push({
        field,
        msg: `${field} is required`,
      });
    }
  });

  return errors;
};

const validateUserRegistration = (user) => {
  const errors = [];
  const requiredFields = ["username", "password", "confirmPass", "email"];
  requiredFields.forEach((field) => {
    if (!validRequiredField(user[field] || "")) {
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
    if (!value || value.trim() === "") {
      return false;
    }
  }

  return true;
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validRequiredField,
};
