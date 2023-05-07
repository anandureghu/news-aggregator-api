const { Cache } = require("../cache/cache");

let news = [];
const cache = new Cache();

const getAllNews = (params) => {
  return getNews(params);
};

const getNews = async (params) => {
  return cache.get(params);
};

module.exports = {
  getAllNews,
};
