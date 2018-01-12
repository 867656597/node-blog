var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var debug = require('debug')('node-blog:update');


debug('开始连接数据库');

// 创建数据库连接
var db = mysql.createConnection({
  host:     '192.168.226.137',   // 数据库IP
  port:     3306,          // 数据库端口
  database: 'lanxi1',   // 数据库名称
  user:     'root',        // 数据库用户名
  password: '123456',            // 数据库密码
});

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
