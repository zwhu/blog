var express = require('express');
var app =express();
var router = express.Router();
var markdown = require( "markdown" ).markdown;

var User = require('../model/User');
var Article = require('../model/Article');


var config = {
    development: {
        title: '一起离职吧！',
        link: '/stylesheets/style.css',
        src: '/javascripts/all.js'
    },
    production: {
        title: 'zwhu',
        link: '/stylesheets/style.min.css',
        src: '/javascripts/all.min.js'
    }
};

function getToken() {
    return Math.random().toString(36).substring(7);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', config[app.get('env') || 'development']);
});

router.post('/login', function(req, res, next) {
    var user = new User();
    user.get(req.body.name, function(e, v) {
        if (!e &&  v && v.password === req.body.password) {
            var token = Math.random().toString(36).substring(7);
            user.setToken(req.body.name, token, function(err) {
                if(!err) {
                    return res.
                        cookie('user', 'zwhu', { maxAge: 24 * 60 * 60 * 10000}).
                        cookie('token', token, { maxAge: 24 * 60 * 60 * 10000, httpOnly: true }).
                        status(200).
                        end();
                } else {
                    return res.status(404).end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

//TODO: 获取所有帖子的缩略信息
//TODO： 根据id获取帖子的详细信息
//TODO: 对错误统一处理

router.get('/articles/:id', function(req, res, next) {
    var article = new Article();
    article.get(req.id, function(e, v) {
        if (!e) {
            return res.json(v);
        }
        //TODO: 以后要对HTTP的请求返回错误做出规范
        return res.status(404).end();
    });
});

router.get('/posts', function(req, res, next) {
    var article = new Article(req.article);

    // 取所有
    article.get(null, function(e, v) {
        if (!e) {
            return res.json(v);
        }
        //TODO: 以后要对HTTP的请求返回错误做出规范
        return res.status(404).end();
    });
});

router.post('/posts', function(req, res, next) {

    // 从数据库中取出token
    if(!req.cookies.token) {
        return res.status(404).end();
    }

    var user = new User();

    user.get(req.cookies.user, function(e, v) {
        if(v && v.token !== req.cookies.token) {
            return res.status(404).end();
        }

        if(!req.body) {
            return res.status(404).end();
        }

        req.body.displayContent = markdown.toHTML(req.body.content);

        var article = new Article();
        article.post(req.body, function(e) {
            if (!e) {
                return res.status(200).end();
            }
            //TODO: 以后要对HTTP的请求返回错误做出规范
            return res.status(404).end();
        });
    });
});

module.exports = router;
