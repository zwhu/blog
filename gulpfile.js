// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

// TODO: live load

// clean
gulp.task('clean', function(cb) {
    del(['./public/build/', './public/javascripts/*.js'], cb)
});


// react
gulp.task('browserify', function() {
    return browserify({
        entries: './www/views/app.jsx',
        transform: [reactify]
    }).bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./public/build/'));
});

// 合并，压缩文件
gulp.task('scripts', ['browserify'],  function() {
    gulp.src('./public/build/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/javascripts'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('browserify', 'scripts');
    // 监听文件变化
    gulp.watch('./www/views/**/*.jsx', function() {
        gulp.run('browserify', 'scripts');
    });
});
