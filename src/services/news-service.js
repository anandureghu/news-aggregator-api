const httpStatus = require("http-status");

const data = require("../utils/data");
const { default: axios } = require("axios");
const { ENDPOINT } = require("../utils/constants");
const { API_KEY } = require("../config/api-config");

let news = [];

const getAllNews = () => {
  const params = {
    keyword: "kerala",
    articlesCount: 5,
  };
  return getNews(params)
};

const getNews = async (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(ENDPOINT, {
        apiKey: API_KEY,
        action: "getArticles",
        lang: "eng",
        ...params,
      })
      .then((data) => {
        let result = data.data.articles;
        resolve(result);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = {
  getAllNews,
};
