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

var WebpackDevServer = require('webpack-dev-server');

var watch = false;

// clean
gulp.task('clean', function (cb) {
  del(['./public/bundle/', './public/javascripts/**.*', './public/stylesheets/**.css'], cb);
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

    console.log(stats.toString({
      colors: $.util.colors.supportsColor,
      hash: verbose,
      version: verbose,
      timings: verbose,
      chunks: verbose,
      chunkModules: verbose,
      cached: verbose,
      cachedAssets: verbose
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

// watch
gulp.task('watch', function (cb) {
  watch = true;
  runSequence('bundle', 'livereload', cb);
});

// liveload
gulp.task('livereload', function() {
  var server = $.livereload();
  gulp.watch(__dirname + '/public/', function() {
    server.changed(file.path);
  });

});


//// 合并
//gulp.task('concat', ['bundle'], function () {
//  gulp.src('./public/javascripts/*.js')
//    .pipe($.concat('app.js'))
//    .pipe(gulp.dest('./public/javascripts'))
//});

// 压缩 js
gulp.task('minify-js', ['bundle'], function () {
  gulp.src('./public/bundle/bundle.js')
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.rename('app.min.js'))
    .pipe($.sourcemaps.write('../javascripts'))
    .pipe(gulp.dest('./public/javascripts'));
});

// 压缩 css
gulp.task('minify-css', function () {
  gulp.src('./public/stylesheets/style.css')
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe($.rename('style.min.css'))
    .pipe(gulp.dest('./public/stylesheets/'))
});

// 测试
gulp.task('test', function () {
  process.env.NODE_ENV = 'test';
  return gulp.src('./server/model/test/*.js')
    .pipe(mocha({}));
});

// 默认任务
gulp.task('default', function (cb) {
  runSequence(['watch'], cb);
});

// build
gulp.task('build', function (cb) {
  runSequence(['clean', 'bundle', 'minify-js', 'minify-css'], cb);
});
