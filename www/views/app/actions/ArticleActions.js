/**
 * Created by huzhengwei on 15/2/2.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var AuthActions = {
    getArticles: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.GET_ARTICLES
        });
    },
    postArticle: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.POST_ARTICLES,
            data: data
        })
    }
};


module.exports = AuthActions;