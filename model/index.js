var debug = require('debug')('blog:update:save');
var db = require('./../config').db;
var async = require('async');

/**
 * 保存文章分类
 *
 * @param {Object} list
 * @param {Function} callback
 */
exports.classList = function (list, callback) {
  debug('保存文章分类列表到数据库中: %d', list.length);

  async.eachSeries(list, function (item, next) {
    // 查询分类是否已存在
    db.query('SELECT * FROM `class_list` WHERE `id`=? LIMIT 1', [item.id], function (err, data) {
      if (err) return next(err);

      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        db.query('UPDATE `class_list` SET `title`=?, `url`=? WHERE `id`=?', [item.title, item.url, item.id], next);
      } else {
        // 分类不存在，添加
        db.query('INSERT INTO `class_list`(`id`, `title`, `url`) VALUES (?, ?, ?)', [item.id, item.title, item.url], next);
      }
    });

  }, callback);
};

/**
 * 保存文章列表
 *
 * @param {Number} class_id
 * @param {Array} list
 * @param {Function} callback
 */
exports.articleList = function (class_id, list, callback) {
  debug('保存文章列表到数据库中: %d, %d', class_id, list.length);

  async.eachSeries(list, function (item, next) {

    // 查询文章是否已存在
    db.query('SELECT * FROM `article_list` WHERE `id`=? AND `class_id`=? LIMIT 1',
      [item.id, class_id], function (err, data) {
      if (err) return next(err);

      // 将发布时间转成时间戳（秒）
      var created_time = new Date(item.time).getTime() / 1000;

      if (Array.isArray(data) && data.length >= 1) {
        // 分类已存在，更新一下
        db.query('UPDATE `article_list` SET `id`=?, `title`=?, `url`=? WHERE `id`=? AND `class_id`=?',
          [item.id,item.title, item.url, item.id, class_id], next);
      } else {
        // 分类不存在，添加
        db.query('INSERT INTO `article_list`(`id`,`title`, `url`, `class_id`) VALUES (?, ?, ?, ?)',
          [item.id,item.title, item.url, class_id], next);
      }
    });

  }, callback);
};


/**
 * 保存文章内容
 *
 * @param {String} id
 * @param {Array} tags
 * @param {String} content
 * @param {Function} callback
 */
exports.articleDetail = function (id, content, callback) {
  debug('保存文章内容: %s', id);

  // 检查文章是否存在
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    if (Array.isArray(data) && data.length >= 1) {
      // 更新文章
      db.query('UPDATE `article_detail` SET `content`=? WHERE `id`=?', [content, id], callback);
    } else {
      // 添加文章
      db.query('INSERT INTO `article_detail`(`id`, `content`) VALUES (?, ?)', [id, content], callback);
    }
  });
};

/**
 * 检查文章是否存在
 *
 * @param {String} id
 * @param {Function} callback
 */
exports.isAericleExists = function (id, callback) {
  db.query('SELECT `id` FROM `article_detail` WHERE `id`=?', [id], function (err, data) {
    if (err) return callback(err);

    callback(null, Array.isArray(data) && data.length >= 1);
  });
};