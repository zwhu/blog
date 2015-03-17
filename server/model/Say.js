/**
 * Created by huzhengwei on 15/3/17.
 */

var dbConfig = require('./../../db');
var MongoClient = dbConfig.MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = dbConfig.url;

var assign = require('object-assign');

function Say() {
}

//存储一篇文章及其相关信息
Say.prototype.post = function (content, callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    //要存入数据库的文档
    var post = {
        time: time,
        content: content
    };
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('say', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            //将文档插入 posts 集合
            collection.insert(post, {
                safe: true
            }, function (err) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                return callback(null);//返回 err 为 null
            });
        });
    });
};

//读取文章及其相关信息
Say.prototype.get = function (callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('say', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            //根据 query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};

//读取文章及其相关信息
Say.prototype.getLast = function (callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('say', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            //根据 query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).limit(1).toArray(function(err, doc) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, doc);
            });
        });
    });
};



Say.prototype.delete = function(id, callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('say', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            if (id) {
                query._id = new ObjectID(id);
            } else {
                db.close();
                return callback('id 不存在!');
            }
            //根据 query 对象查询文章
            collection.remove(query, function(err) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);
            });
        });
    });
};

module.exports = Say;
