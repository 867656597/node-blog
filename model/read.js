var debug = require('debug')('blog:model:read');
var db = require('./../config').db;
var async = require('async');
var moment = require('moment'); //日期格式化模块



function getBeginAndEnd(size,code){
	if(!size){
		return {
			begin: 0,
			end: 10
		}
	}
	if(!code){
		return {
			begin: 0,
			end: size
		}
	}
	var size = Number(size);
	var code = Number(code);
	return {
		begin: code*size+1,
		end: (code+1)*size
	}
}
/**
 * 读取文章分类
 *
 * @param {Function} callback
 */
exports.getClassList = function (callback) {
  debug('获取所有文章分类列表');

    // 查询分类是否已存在
    db.query('SELECT * FROM `class_list`', function(err,data){
    	callback(err,data)
    });
};

/**
 * 根据分类id读取文章列表
 *
 * @param {string} id
 * @param {string} pageSize
 * @param {string} pageCode
 * @param {Function} callback
 */
exports.getArticleList = function (id,pageSize,pageCode,callback) {
  debug('获取id为 %d 的文章列表',id);
  	var page = getBeginAndEnd(pageSize,pageCode);
    // 查询分类是否已存在
    db.query('SELECT * FROM `article_list` where `class_id`=? ORDER BY `news_time` DESC LIMIT ?,?', [id,page.begin,page.end] ,function(err,data){
    	callback(err,data)
    });
};


exports.getArticleContent = function (id,callback) {
	console.log(id);
  debug('获取id为%s的文章内容',id);
    // 查询分类是否已存在
    db.query('select T1.*, T2.* from article_detail as T1 inner join article_list as T2 on T1.id = T2.id where T1.id=?', [id] ,function(err,data){
    	callback(err,data)
    });
};
