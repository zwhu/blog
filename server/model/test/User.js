var dbConfig =  require('../../../db');
var MongoClient = dbConfig.MongoClient;
var url = dbConfig.url;

var User = require('../User');

describe('user 测试', function() {
    var user = new User();

    before(function(done) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                return done(err);
            }
            db.collection('user', function (err, collection) {
                if (err) {
                    db.close();
                    return done(err);
                }
                collection.insert({
                    name: 'test',
                    password: '123456'
                }, {
                    safe: true
                }, function (err) {
                    db.close();
                    if (err) {
                        return done(err);//失败！返回 err
                    }
                    done();//返回 err 为 null
                });
            });
        });
    });


    after(function(done) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                return done(err);
            }
            db.collection('user', function(err, collection) {
                if (err) {
                    db.close();
                    return done(err);
                }
                collection.remove(function(err) {
                    db.close();
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });
        });
    });


    it('user.get 测试, 应该返回user的基本信息', function(done){
       user.get('test', function(err, obj) {
           if(err) {
               return done(err);
           } else {
               if(obj.name === 'test') {
                   done();
               }
           }
       });
    });

    it('user.setToken 测试', function(done) {
        user.setToken('test', 'token12345', function(err) {
            if(err) {
                return done(err);
            } else {
                user.get('test', function(err, obj) {
                    if(err) {
                        return done(err);
                    } else {
                        if(obj.token === 'token12345') {
                            done();
                        }
                    }
                });
            }
        });
    })

});