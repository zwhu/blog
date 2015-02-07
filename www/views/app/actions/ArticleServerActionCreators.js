var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var ArticleServerActionCreators = {
    getArticlesSuccess: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES_SUCCESS
        });
    },
    getArticlesFail: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES_FAIL
        });
    },
    postArticleSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.POST_ARTICLE_SUCCESS,
            data: data
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