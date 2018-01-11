var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('node-blog:update');

debug('读取新闻列别列表');

var url = 'http://111.3.64.179';
var currentUrl = url+ '/_s58/52/11/c639a21009/page.psp';

request(currentUrl,function(err,res){
	if(err) return console.log(err);

	var $ = cheerio.load(res.body.toString());
	var obj = {
		author:'',
		department: '',
		date: ''
	}
	

	var remarksList = $('.arti_metas>span');
	
	obj.author = remarksList.eq('0').text().split('：')[1];
	obj.department = remarksList.eq('2').text().split('：')[1];
	obj.date = remarksList.eq('3').text().split('：')[1];


	console.log(obj)
})

