var read = require('./update/read');
var config  = require('./config');
var save = require('./model/index');


//测试read模块
// read.classList(config.newsUrl.classList,function(err,classList){
// 	console.log(classList)
// });

// read.articleList('/_s58/641/list.psp',function(err,articleList){
// 	console.log(articleList)
// })

read.articleDetail('/_s58/4a/5e/c640a19038/page.psp',function(err,articleDetail){
	save.articleDetail('c640a19038',articleDetail,function(){
		console.log('插入成功');
	})
})