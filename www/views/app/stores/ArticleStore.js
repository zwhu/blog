/**
 * Created by huzhengwei on 15/2/2.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var ajax = require('../utils/ajax');


var CHANGE_EVENT = 'change';

var articles = [];
var postStatus = false;

function getArticles() {
    ajax.get('/posts', function(status, data) {
        if(status === 200) {
            articles = data;
            ArticleStore.emitChange();
        }
    });
}

function postArticle(data) {
    ajax.post('/posts', data, function(status) {
        if(status === 200) {
            postStatus = true;
            ArticleStore.emitChange();
        }
    });
}


var ArticleStore = assign({}, EventEmitter.prototype, {
    getArticles: function() {
        return articles;
    },
    getPostStatus: function() {
        return postStatus;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});


// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.GET_ARTICLES:
            getArticles();
            break;
        case AppConstants.POST_ARTICLES:
            postArticle(action.data);
            break;
        default:
            break;
    }
    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ArticleStore;