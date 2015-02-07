/**
 * Created by huzhengwei on 15/2/7.
 */

var ajax = require('./ajax');
var AuthServerActionCreators = require('../actions/AuthServerActionCreators');

module.exports = {
    signin : function(data) {
        ajax.post('/login', data).then(function() {
            AuthServerActionCreators.signinSuccess();
        }, function(error) {
            AuthServerActionCreators.signinFail(error);
        });
    }

};