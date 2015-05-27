'use strict';

// 引入 gulp
var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// 引入组件
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

var argv = require('minimist')(process.argv.slice(2));

var webpack = require('webpack');

var watch = false;

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
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./webpack.config.js');
  var bundler = webpack(config);
  var verbose = !!argv.verbose;

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (verbose) {
      $.util.log('[webpack]', stats.toString({colors: true}));
    }

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


gulp.task('build:watch', function (cb) {
  watch = true;
  runSequence('bundle', cb);
});


// 合并
gulp.task('concat', ['bundle'], function () {
  gulp.src('./public/javascripts/*.js')
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('./public/javascripts'))
});

// 压缩js
gulp.task('minify-js', function () {
  gulp.src('./public/bundle/bundle.js')
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.rename('app.min.js'))
    .pipe($.sourcemaps.write('../javascripts'))
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
