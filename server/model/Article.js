var dbConfig = require('./../../db');
var MongoClient = dbConfig.MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = dbConfig.url;


var assign = require('object-assign');


function Article() {
}

//存储一篇文章及其相关信息
Article.prototype.post = function (article, callback) {
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
        title: article.title,
        content: article.content,
        tags: article.tags,
        summary: article.tags,
        titlePic: article.titlePic,
        displayContent: article.displayContent
    };
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('articles', function (err, collection) {
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
Article.prototype.get = function (id, callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('articles', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            if (id) {
                query._id = new ObjectID(id);
            }
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


// 除了get方法，其他的article内的方法都必须有权限判断
Article.prototype.update = function(id, update, callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('articles', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            if (id) {
                query._id = id;
            } else {
                db.close();
                return callback('id 不存在!');
            }
            //根据 query 对象查询文章
            var set = assign({}, update);

            collection.update(query, {
                $set : set
            }, function(err) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);
            });
        });
    });
};


Article.prototype.delete = function(id, callback) {
    //打开数据库
    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('articles', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            var query = {};
            if (id) {
                query._id = id;
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

}


module.exports = Article;