/**
 * Created by huzhengwei on 15/2/2.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var ajax = require('../utils/ajax');

var CHANGE_EVENT = 'change';

function getArticles() {
    ajax.get('/posts', function(status, data) {
        if(status === 200) {
            ArticleStore.emitChange(data);
        }
    });
}



var ArticleStore = assign({}, EventEmitter.prototype, {
    getArticles: function(callback) {
        ajax.get('/posts', function(status, data) {
                return callback(data || null);
        });
    },

    emitChange: function(data) {
        this.emit(CHANGE_EVENT, data);
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
        default:
            break;
    }
    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ArticleStore;