const newsService = require("../services/news-service");
const userService = require("../services/user-service");

const GetAllNews = async (req, res) => {
  const user = req.user;
  const params = {
    lang: "eng"
  }
  params.keyword = userService.getUserPreferences(user.userId) || []
  params.articlesCount = req.params.count ? req.params.count : 10;

  newsService.getAllNews(params).then((result) => {
    res.send(result);
  });
};

module.exports = {
  GetAllNews,
};
