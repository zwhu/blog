var List = require('term-list');
var gulp = require('gulp');

function gulpGui(envs) {

    var onkeypress = function(ch, key){
        if (!key) return;
        switch (key.name) {
            case 'c':
                key.ctrl && process.exit(0);
                break;
            default:
                break;
        }
    };

    function initEnv() {
        var list = new List({marker: '\033[36m› \033[0m', markerLength: 2});

        envs.forEach(function (v) {
            list.add(v, v);
        });

        list.start();
        list.on('keypress', function (key, item) {
            switch (key.name) {
                case 'return':
                    list.stop();
                    initTasks(item);
                    break;
                default:
                    break;
            }
        });
    }

    function initTasks(env) {
        if(env) {
            process.env.NODE_ENV = env;
        }
        var list  = new List({marker: '\033[36m› \033[0m', markerLength: 2});

        Object.keys(gulp.tasks).forEach(function (v) {
            list.add(v, v);
        });

        list.start();
        list.on('keypress', function (key, item) {
            switch (key.name) {
                case 'return':
                    list.stop();
                    //TODO: 重新开个子进程来 start
                    process.stdin.resume();
                    process.stdin.on('keypress', onkeypress);
                    console.log('Run Gulp Tasks: ' + item + ' in ' + env);
                    gulp.start(item);
                    break;
                case 'z':
                    list.stop();
                    initEnv();
                    break;
                case 'c':
                    key.ctrl && process.exit(0);
                    break;
                default:
                    break;
            }
        });
    }

    // TODO: 判断是否为 数组
    if(envs && envs.length > 0) {
        initEnv();
    } else {
        initTasks();
    }

}


module.exports = gulpGui;