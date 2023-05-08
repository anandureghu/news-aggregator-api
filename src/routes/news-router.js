const newsController = require("../controllers/news-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const newsRouter = require("express").Router();
newsRouter.use(authMiddleware)

newsRouter.get("/", newsController.GetAllNews);

module.exports = newsRouter;
