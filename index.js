var class_list = require('./update/class_list');
var page_list = require('./update/page_list');
var async = require('async')
var api = require('./api');


class_list.class_list(api.classList,function(test,classList){
	async.eachSeries(classList, function (item, next) {
		page_list.page_list(api.pulicUrl + item.url,function(err,pageList){
			console.log(pageList)
		})
		next();
	},function (err) {
    	if (err) return console.error(err.stack);
    	console.log('完成');
  })
});