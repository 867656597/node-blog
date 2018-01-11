var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('node-blog:update');

debug('读取新闻列别列表');

var url = 'http://111.3.64.179';
var pageOneUrl = '/_s58/639/list1.psp';


var classList = [];

var getCurrentList = function(pageUrl){
	var nextHref;
	console.log(pageUrl)
	request(url + pageUrl,function(err,res){
		if(err) return console.log('error:'+err)

		var $ = cheerio.load(res.body.toString());

		$('.wp_article_list li').each(function(index){
			if(index != 0){
				var linkDom = $(this).find('.Article_Title a').eq(0);
				var title = linkDom.attr('title');
				var url = linkDom.attr('href');
				var item = {
					title: title,
					url: url
				}
				classList.push(item);
			}
		})
		//判断是否有下一页
		nextHref = $('.page_nav .next').attr('href');
		if(nextHref.indexOf('javascript')=='-1'){
			getCurrentList(nextHref);
		}else{
			console.log(classList)
		}
		//console.log(classList)
	})

}
getCurrentList(pageOneUrl);

