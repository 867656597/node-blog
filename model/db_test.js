var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var debug = require('debug')('node-blog:update');
var config = require('./../config')


debug('开始连接数据库');

// 创建数据库连接
var db = config.db;

// 显示所有数据表
db.query('show tables', function (err, tables) {
  if (err) {
    console.error(err.stack);
  } else {
    console.log(tables);
  }

  // 关闭连接
  db.end();
});
