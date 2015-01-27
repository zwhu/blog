/**
 * Created by huzhengwei on 15/1/27.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var AuthAction = require('../actions/AuthAction');
var assign = require('object-assign');
var ajax = require('../utils/ajax');

var CHANGE_EVENT = 'change';
var _isLogin = false;

function signin(data) {
    ajax.post('/login', data, function(status) {
        if(status === 200)
            AuthAction.signinSuccess(data);
    });

}

function isLogin() {
    _isLogin = !_isLogin;
    AuthStore.emitChange();
}

var AuthStore = assign({}, EventEmitter.prototype, {
    isLogin: function() {
        return _isLogin;
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
        case AppConstants.AUTH_SIGNIN:
            signin(action.data);
            break;
        case AppConstants.AUTH_SIGNIN_SUCCESS:
            isLogin();
            break;
        default:
            return true;
    }
    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AuthStore;
