var Say = require('../Say');


//TODO: 构建测试环境
// 1. before 向数据库中插入数据
// 2. after 将插入的数据清除
describe('Say 测试', function () {
    var say = new Say();
    var _id;

    var posts = {
        content : '这是我的第一篇文章，我一定写的很酷的，你信不信呢',
    };

    it('Say.post 测试, 应该不返回错误信息', function (done) {
        say.post(posts, function(err) {
            if(err) {
                return done(err);
            }
            done();
        });

    });


    it('Say.getLast 测试, 应该返回最后一条 say 的基本信息', function (done) {
        say.getLast(function(err, docs) {
            if(err) {
                return done(err);
            } else {
                if(docs.length === 1) {
                    _id = docs[0]._id;
                    done();
                }
            }
        });
    });


    it('Say.get 测试, 应该返回 say 的基本信息', function (done) {
        say.get(function(err, docs) {
                if(err) {
                    return done(err);
                } else {
                    if(docs.length) {
                        done();
                    }
                }
            });

    });


    it('Say.delete 测试, 应该不返回错误信息', function (done) {
        say.delete(_id, function(err) {
            if(err) {
                return done(err);
            } else {
                done();
            }
        });

    });

});