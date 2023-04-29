const newsService = require("../services/news-service");

const GetAllNews = async (req, res) => {
  newsService.getAllNews().then((result) => {
    res.send(result);
  });
};

module.exports = {
  GetAllNews,
};
