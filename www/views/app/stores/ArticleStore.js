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
var _errMsg = '';
var _status = '';

var ArticleStore = assign({}, EventEmitter.prototype, {
    getArticles: function () {
        return articles;
    },
    getStatus: function () {
        return _status;
    },
    getErrorMsg: function() {
        return _errMsg;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});


AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case AppConstants.GET_ARTICLES:
            _status = 'loading';
            break;
        case AppConstants.GET_ARTICLES_SUCCESS:
            _status = 'success';
            articles = action.data;
            break;
        case AppConstants.GET_ARTICLES_FAIL:
            _status = 'fasle';
            _errMsg = action.errMsg;
            break;
        case AppConstants.POST_ARTICLES:
            _status = 'loading';
            break;
        case AppConstants.POST_ARTICLES_SUCCESS:
            _status = 'success';
            break;
        case AppConstants.POST_ARTICLES_FAIL:
            _status = 'fasle';
            _errMsg = action.errMsg;
            break;
        default:
    }
    ArticleStore.emitChange();
    return true;
});

module.exports = ArticleStore;