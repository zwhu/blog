/**
 * Created by huzhengwei on 15/1/26.
 * form http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
 */
'use strict';

function getXmlDoc() {
    var xmlDoc;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlDoc = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlDoc;
}

function myGet(url, callback) {
    var xmlDoc = getXmlDoc();

    xmlDoc.open('GET', url, true);

    xmlDoc.onreadystatechange = function() {
        if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
            callback(xmlDoc.status, xmlDoc.responseText);
        }
    };
    xmlDoc.send();
}

function myPost(url, data, callback) {
    var xmlDoc = getXmlDoc();

    data = JSON.stringify(data);
    xmlDoc.open('POST', url, true);
    xmlDoc.setRequestHeader("Content-type", "application/json");

    xmlDoc.onreadystatechange = function() {
        if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
            callback(xmlDoc.status);
        }
    };

    xmlDoc.send(data);
}

module.exports = {
    post: myPost,
    get: myGet
};