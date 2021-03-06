/**
 * Created by huzhengwei on 15/2/7.
 */

var ajax = require('./ajax');
var AuthServerActionCreators = require('../actions/AuthServerActionCreators');
var ArticleServerActionCreators = require('../actions/ArticleServerActionCreators');

module.exports = {
    signin : function(data) {
        ajax.post('/login', data).then(function() {
            AuthServerActionCreators.signinSuccess();
        }, function(error) {
            AuthServerActionCreators.signinFail(error);
        });
    },
    getArticles: function() {
        ajax.get('/posts').then(function(data) {
            ArticleServerActionCreators.getArticlesSuccess(data);
        }, function(error) {
            ArticleServerActionCreators.getArticlesFail(error);
        });
    },
    getArticle: function(id) {
        ajax.get('/articles/' + id).then(function(data) {
            ArticleServerActionCreators.getArticleSuccess(data);
        }, function(error) {
            ArticleServerActionCreators.getArticleFail(error);
        });
    },
    postArtilces: function(data) {
        ajax.post('/posts', data).then(function() {
            ArticleServerActionCreators.postArticleSuccess();
        }, function(error) {
            ArticleServerActionCreators.postArticleFail(error);
        });
    },
    getTags: function() {
        ajax.get('/tags').then(function(data) {
            ArticleServerActionCreators.getTagsSuccess(data);
        }, function(error) {
            ArticleServerActionCreators.getTagsFail(error);
        });
    },
    getByTag: function(tag) {
        ajax.get('/tags/' + tag).then(function(data) {
            ArticleServerActionCreators.getByTagSuccess(data);
        }, function(error) {
            ArticleServerActionCreators.getByTagFail(error);
        });
    }

};