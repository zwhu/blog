/**
 * Created by huzhengwei on 15/1/27.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AuthServerActionCreators = {
    signinSuccess: function() {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.SIGNIN_SUCCESS
        });
    },
    signinFail: function(errMsg) {
        AppDispatcher.handleServerAction({
            actionType: AppConstants.SIGNIN_FAIL,
            errMsg: errMsg
        });
    }

};


module.exports = AuthServerActionCreators;