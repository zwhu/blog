'use strict';

// 引入 gulp
var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// 引入组件
//var jshint     = require('gulp-jshint');
//var concat     = require('gulp-concat');
//var uglify     = require('gulp-uglify');
//var gutil      = require('gulp-util');
//var rename     = require('gulp-rename');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var minifyCSS  = require('gulp-minify-css');
var del        = require('del');
var mocha      = require('gulp-mocha');

//var argv = require('minimist')(process.argv.slice(2));

var webpack = require('webpack');


var watch = true;


// TODO: live load

// clean
gulp.task('clean', function (cb) {
    del(['./public/build/', './public/javascripts/*.js', './public/stylesheets/style.min.css'], cb)
});


gulp.task('minify-css', function () {
    gulp.src('./public/stylesheets/style.css')
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe($.rename('style.min.css'))
        .pipe(gulp.dest('./public/stylesheets/'))
});


// Bundle
gulp.task('bundle', function(cb) {
    var started = false;
    var config = require('./webpack.config.js');
    var bundler = webpack(config);
    //var verbose = !!argv.verbose;

    function bundle(err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }

        console.log(stats.toString({
            colors: $.util.colors.supportsColor,
            //hash: verbose,
            //version: verbose,
            //timings: verbose,
            //chunks: verbose,
            //chunkModules: verbose,
            //cached: verbose,
            //cachedAssets: verbose
        }));

        if (!started) {
            started = true;
            return cb();
        }
    }

    if (watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});





// react
//gulp.task('browserify', function () {
//    return browserify({
//        entries: './www/views/app.jsx',
//        transform: [reactify]
//    }).bundle()
//        .on('error', $.util.log.bind($.util, 'Browserify Error'))
//        //Pass desired output filename to vinyl-source-stream
//        .pipe(source('bundle.js'))
//        // Start piping stream to tasks!
//        .pipe(gulp.dest('./public/build/'));
//});

// 合并
gulp.task('concat', ['browserify'], function () {
    gulp.src('./public/build/*.js')
        .pipe($.concat('all.js'))
        .pipe(gulp.dest('./public/javascripts'))
});

// 压缩js
gulp.task('minify-js', ['concat'], function () {
    gulp.src('./public/javascripts/all.js')
        .pipe($.uglify())
        .pipe($.rename('all.min.js'))
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('test', function () {
    process.env.NODE_ENV = 'test';
    return gulp.src('./server/model/test/*.js')
        .pipe(mocha({}));
});

// 默认任务
gulp.task('default', function () {
    gulp.run('minify-js', 'minify-css');
});

gulp.task('watch', function () {
    // 监听文件变化
    gulp.watch('./www/views/**/*.js*', function () {
        gulp.run('webpack');
    });
});


gulp.task('webpack', function () {
    webpack(require("./webpack.config.js"), function (err) {
        if (err) $.util.log(err)
    })
});