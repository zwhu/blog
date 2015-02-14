var app = require('express')();

module.exports = {
    MongoClient: require('mongodb').MongoClient,
    url: app.get('env') === 'test'  ? 'mongodb://localhost:27017/test-blog' : 'mongodb://localhost:27017/blog',
    db: app.get('env') === 'test'  ? 'test-blog' : 'blog',
    host: 'localhost',
    port: 27017
};