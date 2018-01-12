var request = require('request');
var cheerio = require('cheerio');
var api = require('./../api');
var debug = require('debug')('node-blog:update');

debug('读取新闻列别列表');


var page_list = function(url,pageList,callback){
	var nextHref;
	request(url,function(err,res){
		if(err) return console.log('error:'+err)

		var $ = cheerio.load(res.body.toString());

		$('.wp_article_list li').each(function(index){
			if(true){
				var linkDom = $(this).find('.Article_Title a').eq(0);
				var title = linkDom.attr('title');
				var url = linkDom.attr('href');
				var item = {
					title: title,
					url: url
				}
				pageList.push(item);
			}
		})
		//判断是否有下一页
		nextHref = $('.page_nav .next').attr('href'); 
		if(nextHref&&nextHref.indexOf('javascript')=='-1'){
			page_list(api.pulicUrl + nextHref,pageList,callback);
		}else{
			callback(null,pageList)
		}
	})

}

exports.page_list = page_list

