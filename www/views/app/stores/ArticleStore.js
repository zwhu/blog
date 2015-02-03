/**
 * Created by huzhengwei on 15/2/2.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var ajax = require('../utils/ajax');

function getArticles() {
    ajax.get('/posts', function(status, data) {
        if(status === 200) {
            ArticleStore.emitChange(data);
        }
    });
}

function postArticle(data) {
    ajax.post('/posts', data, function(status) {
        if(status === 200) {
            ArticleStore.emitChange(status);
        }
    });
}



var ArticleStore = assign({}, EventEmitter.prototype, {
    getArticles: function(callback) {
        ajax.get('/posts', function(status, data) {
                return callback(data || null);
        });
    },
    emitChange: function(CHANGE_EVENT, data) {
        this.emit(CHANGE_EVENT, data);
    },

    addChangeListener: function(CHANGE_EVENT, callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(CHANGE_EVENT, callback) {
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