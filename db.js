var app = require('express')();

module.exports = {
    MongoClient: require('mongodb').MongoClient,
    url: app.get('env') === 'test'  ? 'mongodb://localhost:27017/blog' : 'mongodb://localhost:27017/test-blog',
    db: app.get('env') === 'test'  ? 'blog' : 'test-blog',
    host: 'localhost',
    port: 27017
};