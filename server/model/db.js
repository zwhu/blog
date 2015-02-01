var app = require('express')();
module.exports = {
    MongoClient: require('mongodb').MongoClient,
    url: app.get('env') === 'production'  ? 'mongodb://localhost:27017/blog' : 'mongodb://localhost:27017/test-blog'
};