const { users } = require("../utils/data");

const getUserPreferences = (id) => {
  return users.find((user) => user.id === id).preferences;
};

const updateUserPreferences = (params) => {
  let updatedUser;
  users.forEach((user) => {
    if (user.id === params.id) {
      user.preferences = params.preferences;
      updatedUser = {
        ...user,
      };
    }
  });
  return updatedUser;
};

module.exports = {
  getUserPreferences,
  updateUserPreferences,
};
