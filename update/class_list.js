var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('node-blog:update');

debug('读取新闻列别列表');

const class_list = (url,callback) => {
	var classList = [];

	request(url,function(err,res){
		if(err) return console.log(err);

		var $ = cheerio.load(res.body.toString());


		console.log($('.wp_nav li').length)
		$('.wp_nav li').each(function(index){
			if(index != 0){
				var title = $(this).find('.item-name').eq(0).text();
				var url = $(this).find('a').eq(0).attr('href');
				var item = {
					title: title,
					url: url
				}
				classList.push(item);
			}
		})

		callback(null,classList)
	})
}

exports.class_list = class_list

