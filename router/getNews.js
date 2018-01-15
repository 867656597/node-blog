var express = require('express');
var router = express.Router();
var read = require('./../model/read');


// 获取分类列表
router.get('/getClassList', function(req, res) {
	read.getClassList(function(err,data){
		 res.send(data);
	})
});


// 根据分类列表获取文章列表
router.get('/getArticleList', function(req, res) {
	var id = req.query.id;
	if(!id){
		res.send([]);
		return false;
	}
	read.getArticleList(id,'10','0',function(err,data){
		res.send(data);
	})
});


// 根据文章id获取文章内容
router.get('/getArticleContent', function(req, res) {
	var id = req.query.id;
	if(!id){
		res.send({});
		return false;
	}
	read.getArticleContent(id,function(err,data){
		res.send(data);
	})
});
module.exports = router;