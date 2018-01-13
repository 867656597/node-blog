// 定时执行更新任务
var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;
var config = require('./config');
var path = require('path')








//定时任务
var job = new cronJob(config.autoUpdate, function () {
  console.log('开始执行定时更新任务');
  var update = spawn(process.execPath, [path.resolve(__dirname, 'model/db_test.js')]);
  update.stdout.pipe(process.stdout);
  update.stderr.pipe(process.stderr);
  update.on('close', function (code) {
  	console.log('更新任务结束，代码=%d', code);
  });
});
job.start();