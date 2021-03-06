var async = require('async');
var config = require('./config');
var read = require('./update/read');
var save = require('./model/index');
var debug = require('debug')('blog:update:all');


var classList;
var articleList = {};

async.series([
	// 获取文章分类列表
	function (done) {
	    read.classList(config.newsUrl.classList, function (err, list) {
	      classList = list;
	      done(err);
	    });
	},

	// 保存文章分类
	function (done) {
	    save.classList(classList, done)
	},
	// 依次获取所有文章分类下的文章列表
	function (done) {
	    async.eachSeries(classList, function (c, next) {
	      read.articleList(c.url, function (err, list) {
	        articleList[c.id] = list;
	        next(err);
	      });

	    }, done);
	},
	 // 保存文章列表
	function (done) {
	    async.eachSeries(Object.keys(articleList), function (classId, next) {
	      save.articleList(classId, articleList[classId], next);
	    }, done);
	},

	// 依次读取文章的详细内容，并保存
	function (done) {
		var list = [];
		console.log('开始合并数组;')
		for(var key in articleList){
			list = list.concat(articleList[key])
		}
		console.log('合并完成');
		console.log(list.length)
	    async.eachSeries(list, function (item, next) {
	    	if(item.url.split('.')[1] != 'psp') return next();
	      save.isAericleExists(item.id, function (err, exists) {
	        if (err) return next(err);

	        if (exists) {
	          debug('文章已存在：%s', item.url);
	          return next();
	        }

	        read.articleDetail(item.url, function (err, ret) {
	          if (err) return next(err);
	          save.articleDetail(item.id, ret.content, function (err) {
	            if (err) return next(err);
	            return next();
	          });
	        });
	    });
	}, done);
	}

], function (err) {
  if (err) console.error(err.stack);

  console.log('完成');
  process.exit(0);
})
