var originRequest = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update:read');
var config = require('./../config');

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request (url, callback) {
  originRequest(url, callback);
}

/**
 * 获取文章分类列表
 *
 * @param {String} url
 * @param {Function} callback
 */
exports.classList = function (url, callback) {
  debug('读取文章分类列表：%s', url);

  request(url, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取博文类别列表
    var classList = [];
    $('.wp_nav li').each(function(index){
		if(index != 0){
			var title = $(this).find('.item-name').eq(0).text(),
				url = $(this).find('a').eq(0).attr('href'),
				item = {
				title: title,
				url: url
			};
			item.id = item.url&&item.url.split('/')[2];
			classList.push(item);
		}
	})
    // 返回结果
    callback(null, classList);
  });
};

/**
 * 获取分类页面博文列表
 *
 * @param {String} url
 * @param {Function} callback
 */
exports.articleList = function (url, callback) {
  debug('读取博文列表：%s', url);
  var url = config.newsUrl.url + url;
  request(url, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取博文列表
    var articleList = [];
    $('.wp_article_list li').each(function(index){
		var linkDom = $(this).find('.Article_Title a').eq(0);
		var title = linkDom.attr('title');
		var url = linkDom.attr('href');
		var item = {
			title: title,
			url: url,
		}
		item.id = item.url&&item.url.split('/')[4];
    if(item.id&&item.id.length>0) articleList.push(item);
	})

    // 检查是否有下一页
   
    var nextUrl = $('.page_nav .next').attr('href'); 
	if(nextUrl&&nextUrl.indexOf('javascript')=='-1'){
      // 读取下一页
      exports.articleList(nextUrl, function (err, articleList2) {
        if (err) return callback(err);
        // 合并结果
        callback(null, articleList.concat(articleList2));
      });
    } else {
      // 返回结果
      callback(null, articleList);
    }
  });
};

/**
 * 获取博文页面内容
 *
 * @param {String} url
 * @param {Function} callback
 */
exports.articleDetail = function (url, callback) {
  debug('读取博文内容：%s', url);

  var url = config.newsUrl.url + url;
  request(url, function (err, res) {
    if (err) return callback(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

   
	var $ = cheerio.load(res.body.toString());
	var articleDetail = {
		author:'',
		department: '',
		date: ''
	}
	

	var remarksList = $('.arti_metas>span');
	
	articleDetail.author = remarksList.eq('0').text().split('：')[1];
	articleDetail.department = remarksList.eq('2').text().split('：')[1];
	articleDetail.date = remarksList.eq('3').text().split('：')[1];

    // 获取文章内容
    articleDetail.content = $('.entry').html();

    // 返回结果
    callback(null, articleDetail);
  });
};