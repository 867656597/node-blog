// MySQL数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  // host:     '111.230.227.212',   // 线上数据库IP
  host:     '192.168.226.137',   // 本地数据库IP
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

// 定时更新
exports.autoUpdate = '* * */12 * *';  // 任务执行规则，参考 cron 语法