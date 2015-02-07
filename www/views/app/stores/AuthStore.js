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

function _signin(data) {
    ajax.post('/login', data).then(function() {
            AuthAction.signinSuccess();
    }, function(error) {
        console.error(error);
    });
}

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

    switch(action.actionType) {
        case AppConstants.SIGNIN:
            _signin(action.data);
            break;
        case AppConstants.SIGNIN_SUCCESS:
            AuthStore.emitChange();
            break;
        default:
            return true;
    }
    return true;
});

module.exports = AuthStore;
