/**
 * Created by huzhengwei on 15/2/7.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var webApiUtils = require('../utils/webApiUtils');

var ArticleViewActionCreators = {
    getArticles: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_ARTICLES
        });
        webApiUtils.getArticles();
    },
    getArticle: function(id) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_ARTICLE,
            id: id
        });
        webApiUtils.getArticle(id);
    },
    postArticle: function(data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.POST_ARTICLE,
            data: data
        });
        webApiUtils.postArtilces(data);
    },
    getTags: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_TAGS
        });
        webApiUtils.getTags();
    },
    getByTag: function(tag) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_BY_TAG
        });
        webApiUtils.getByTag(tag);
    }
};


module.exports = ArticleViewActionCreators;
