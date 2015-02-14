/**
 * Created by huzhengwei on 15/1/26.
 */
'use strict';

var Q = require('q');


function myGet(url) {
    var req = new XMLHttpRequest();
    var deferred = Q.defer();

    function onload() {
        if (req.status === 200) {
            deferred.resolve(JSON.parse(req.responseText));
        } else {
            deferred.reject(new Error("Status code was " + req.status));
        }
    }

    function onerror() {
        deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
    }

    req.open('GET', url, true);
    req.onload = onload;
    req.onerror = onerror;
    req.send();

    return deferred.promise;
}

function myPost(url, data) {
    var req = new XMLHttpRequest();
    var deferred = Q.defer();

    data = JSON.stringify(data);
    function onload() {
        if (req.status === 200) {
            deferred.resolve();
        } else {
            deferred.reject(new Error("Status code was " + req.status));
        }
    }

    function onerror() {
        deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
    }

    req.open('POST', url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = onload;
    req.onerror = onerror;
    req.send(data);

    return deferred.promise;
}

module.exports = {
    post: myPost,
    get: myGet
};