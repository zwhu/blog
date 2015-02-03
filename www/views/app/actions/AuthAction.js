/**
 * Created by huzhengwei on 15/1/27.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var AuthActions = {
    signin: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.AUTH_SIGNIN,
            data: data
        });
    },
    signinSuccess: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.AUTH_SIGNIN_SUCCESS,
            data: data
        });
    }
};


module.exports = AuthActions;