/**
 * Created by huzhengwei on 15/1/26.
 * form http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
 */
'use strict';

var Q = require('q');


function myGet(url) {
    var req = new XMLHttpRequest();
    var deferred = Q.defer();

    req.open('GET', url, true);

    req.onload = onload;
    req.onerror = onerror;
    req.send();

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

    return deferred.promise;
    //xmlDoc.onreadystatechange = function() {
    //    if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
    //        callback(xmlDoc.status, JSON.parse(xmlDoc.responseText));
    //    }
    //};
    //xmlDoc.send();
}

//function myPost(url, data, callback) {
//    var xmlDoc = getXmlDoc();
//
//    data = JSON.stringify(data);
//    xmlDoc.open('POST', url, true);
//    xmlDoc.setRequestHeader("Content-type", "application/json");
//
//    xmlDoc.onreadystatechange = function() {
//        if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
//            callback(xmlDoc.status);
//        }
//    };
//
//    xmlDoc.send(data);
//}

module.exports = {
    //post: myPost,
    get: myGet
};