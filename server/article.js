'use strict';

const fs = require('fs');
const winston = require('winston');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);

module.exports = {
  readArticleList: () => {
    return readFile('./server/article-list.json')
    .then(articleListData => {
      return JSON.parse(articleListData);
    })
    .catch(err => {
      winston.error(err);
      throw err;
    });
  },
};
