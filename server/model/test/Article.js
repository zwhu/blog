var Article = require('../Article');


//TODO: 构建测试环境
// 1. before 向数据库中插入数据
// 2. after 将插入的数据清除
describe('Article 测试', function () {
    var article = new Article();
    var _id;

    var posts = {
        title : 'test',
        content : '这是我的第一篇文章，我一定写的很酷的，你信不信呢',
        tags : ['test', 'first'],
        titlePic :  '/img/test.png',
        summary : '我的文章一直都写的很酷的'
    };

    it('Article.post 测试, 应该不返回错误信息', function (done) {
        article.post(posts, function(err) {
            if(err) {
                return done(err);
            }
            done();
        });

    });


    it('Article.getAll 测试, 应该返回所有Article的基本信息', function (done) {
        article.get(null, function(err, docs) {
            if(err) {
                return done(err);
            } else {
                if(docs.length) {
                    _id = docs[0]._id;
                    done();
                }
            }
        });
    });


    it('Article.getById 测试, 应该返回article的基本信息', function (done) {
        if(_id) {
            article.get(_id, function(err, docs) {
                if(err) {
                    return done(err);
                } else {
                    if(docs.length) {
                        done();
                    }
                }
            });
        }

    });


    it('Article.update 测试, 应该不返回错误信息', function (done) {
        var _update = {
            title : 'test-test',
            content : '这是我的第一篇文章，我一定写的很酷的，你信不信呢!!!!!!',
            tags : ['test', 'first', 'update'],
            titlePic :  '/img/test.png',
            summary : '我的文章一直都写的很酷的'
        };
        article.update(_id, _update, function(err) {
            if(err) {
                return done(err);
            } else {
                article.get(_id, function(err, docs) {
                    if(err) {
                        return done(err);
                    } else {
                        if(docs[0].title === _update.title) {
                            done();
                        }
                    }
                });
            }
        })

    });

    it('Article.getTags 测试, 应该返回所有的tags', function (done) {
        article.getTags(function(err, tags) {
            if(err) {
                return done(err);
            } else {
                if(tags[2] = 'update') {
                    done();
                }
            }
        });
    });


    it('Article.getByTag 测试, 应该返回符合tags的所有文章信息', function (done) {
        article.getByTag('update', function(err, docs) {
            if(err) {
                return done(err);
            } else {
                if(docs.length > 0) {
                    done();
                }
            }
        });
    });

    it('Article.delete 测试, 应该不返回错误信息', function (done) {
        article.delete(_id, function(err) {
            if(err) {
                return done(err);
            } else {
                article.get(_id, function(err, docs) {
                    if(err) {
                        return done(err);
                    } else {
                        if(!docs.length) {
                            done();
                        }
                    }
                });
            }
        });

    });

});