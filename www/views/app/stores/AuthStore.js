/**
 * Created by huzhengwei on 15/1/27.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var ajax = require('../utils/ajax');

var CHANGE_EVENT = 'change';

var _errMsg;
var _signing = false;

 function _getToken() {
     var token;
     var ms = document.cookie.match(/user=(.+)/);
     if(ms) {
         token = ms[1];
     }
     return token;
 }

var AuthStore = assign({}, EventEmitter.prototype, {
    getToken: function() {
        return _getToken();
    },
    getErrorMsg: function() {
        return _errMsg;
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


AppDispatcher.register(function(payload) {
    var action = payload.action;
    // handle view
    switch(action.actionType) {
        case AppConstants.SIGNIN:
            _signing  = true;
            break;
        case AppConstants.SIGNIN_SUCCESS:
            AuthStore.emitChange();
            break;
        case AppConstants.SIGNIN_FAIL:
            _errMsg = action.errMsg;
            AuthStore.emitChange();
            break;
        default:
            return true;
    }
    return true;
});

module.exports = AuthStore;
