const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const userRouter = require("express").Router();
userRouter.use(authMiddleware);

userRouter.get("/preferences", userController.GetUserPreferences);
userRouter.put("/preferences", userController.UpdateUserPreferences);

module.exports = userRouter;
