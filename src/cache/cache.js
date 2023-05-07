const { default: axios } = require("axios");
const { ENDPOINT } = require("../utils/constants");
const { API_KEY } = require("../config/api-config");

class Cache {
  #cache = {};

  async get(params) {
    const key = JSON.stringify(params);
    if (this.#cache.hasOwnProperty(key)) {
      return this.#cache[key];
    } else {
      const result = await this.update(params);
      return result;
    }
  }

  add(key, data) {
    this.#cache[key] = data;
  }

  async update(params) {
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
          const key = JSON.stringify(params);
          // limiting cache storage
          if (params.articlesCount <= 25) {
            this.add(key, result);
          }
          resolve(result);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = {
  Cache,
};
