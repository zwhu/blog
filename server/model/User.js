/**
 * Created by huzhengwei on 15/1/27.
 */
var dbConfig = require('./../../db');
var MongoClient = dbConfig.MongoClient;
var url = dbConfig.url;

function User() {
};

//读取用户信息
User.prototype.get = function (name, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }

        //读取 users 集合
        db.collection('user', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.findOne({
                name: name
            }, function (err, user) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, user);//成功！返回查询的用户信息
            });
        });
    });

};

//设置token
User.prototype.setToken = function (name, token, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }

        //读取 users 集合
        db.collection('user', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.update({
                name: name
            }, {
                $set: {
                    token: token
                }
            }, function (err) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null);
            });
        });
    });

};


module.exports = User;
