const newsService = require("../services/news-service");

const GetAllNews = async (req, res) => {
  const user = req.user;
  const params = {
    lang: "eng"
  }
  params.keyword = user.preferences || []
  params.articlesCount = req.params.count ? req.params.count : 10;

  newsService.getAllNews(params).then((result) => {
    res.send(result);
  });
};

module.exports = {
  GetAllNews,
};
