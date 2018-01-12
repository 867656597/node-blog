// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host:     '192.168.226.137',   // 数据库IP
  port:     3306,          // 数据库端口
  database: 'tz-news',   // 数据库名称
  user:     'root',        // 数据库用户名
  password: '123456',            // 数据库密码
});

// 博客配置
exports.newsUrl = {
  url: 'http://111.3.64.179',  // 博客首页地址
  classList: 'http://111.3.64.179/_s58/639/list.psp'
};