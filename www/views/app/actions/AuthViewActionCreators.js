/**
 * Created by huzhengwei on 15/1/27.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var webApiUtils = require('../utils/webApiUtils');


var AuthViewActionCreators = {
    signin: function(data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SIGNIN,
            data: data
        });
        webApiUtils.signin(data);
    }
};


module.exports = AuthViewActionCreators;