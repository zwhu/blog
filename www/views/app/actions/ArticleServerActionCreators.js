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
    }
};


module.exports = ArticleServerActionCreators;