var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var ArticleServerActionCreators = {
    getArticlesSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES_SUCCESS,
            data: data
        });
    },
    getArticlesFail: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES_FAIL
        });
    },
    getArticleSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLE_SUCCESS,
            data: data
        });
    },
    getArticleFail: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES_FAIL
        });
    },
    postArticleSuccess: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.POST_ARTICLE_SUCCESS
        })
    },
    postArticleFail: function(errMsg) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.POST_ARTICLE_FAIL,
            errMsg: errMsg
        })
    },
    getTagsSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_TAGS_SUCCESS,
            data: data
        })
    },
    getTagsFail: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_TAGS_FAIL
        })
    },
    getByTagSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_BY_TAG_SUCCESS,
            data: data
        })
    },
    getByTagFail: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_BY_TAG_FAIL
        })
    }
};


module.exports = ArticleServerActionCreators;