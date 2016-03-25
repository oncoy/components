/**
 * Created by xcp on 2016/3/25.
 *
 * 读取一个目录下的所有.md文件，并将其转化为html
 */

var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;

function Parse(config) {
    this._defaultConfig = {
        basePath: process.cwd(),
        from: './components',
        to: './docs',
        type: '.md'
    };
    this._config = Object.assign(this._defaultConfig, config);
}

Parse.prototype.start = function () {
    this.read(path.join(this._config.basePath, this._config.from))
};

Parse.prototype.read = function (p) {
    var self = this;

    fs.stat(p, function (err, stats) {
        if (err) return;

        if (stats.isFile())
            self.readFile(p);

        if (stats.isDirectory())
            self.readDir(p);
    })
};

Parse.prototype.readFile = function (p) {
    if (!this.isMarkDown(p)) return;
    var toPath = this.getParseFilePath(p);
    var self = this;
    // 判断toPath是否存在
    self.mkdirs(toPath, function () {
        self.writeFile(p, toPath)
    });
};

Parse.prototype.mkdirs = function (toPath, callback) {
    // 目录只能一级一级的创建
    var sep = path.dirname(toPath).split(path.sep);
    console.log(toPath, 'toPath');

    if (typeof callback !== 'function') {
        callback = function () {
        };
    }

    var __inner = function (cur) {
        fs.stat(cur, function (err, stats) {
            if (err) {
                // 报错肯定是表示没有该目录
                // 所以可以直接创建
                fs.mkdir(cur, function (e) {
                    if (e) throw e;
                    else if (sep.length)__inner(path.join(cur, sep.shift()));
                    else callback()
                });
            }
            // 如果不报错，说明已经存在【暂不考虑是否是一个目录的问题】
            else if (sep.length) {
                __inner(path.join(cur, sep.shift()))
            } else {
                callback()
            }
        })
    };

    sep.length && __inner(sep.shift())
};

Parse.prototype.writeFile = function (from, to) {
    var readStream = fs.createReadStream(from, 'utf8');
    fs.open(to, 'w', function (err, fd) {
        if (err) throw err;

        var writeStream = fs.createWriteStream(to, {
            fd: fd,
            encoding: 'utf8'
        });

        readStream.pipe(writeStream);
    });

};

Parse.prototype.getParseFilePath = function (p) {
    // 截取文件相对于根目录的目录
    var conf = this._config;
    var dir = p.replace(path.join(conf.basePath, conf.from), '');
    var dirname = path.dirname(dir);
    var basename = path.basename(dir, this._config.type);
    return path.join(conf.basePath, conf.to, dirname, '/' + basename + '.html');
};

Parse.prototype.readDir = function (p) {
    var self = this;

    fs.readdir(p, function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function (name) {
            self.read(path.join(p, name))
        })
    })
};

Parse.prototype.isMarkDown = function (p) {
    return this._config.type === path.extname(p);
};

//var args = process.argv.splice(2);
//var config = {};
//
//if(args[0]) {
//    config.from = args[0]
//}
//
//if(args[1]){
//    config.to = args[1]
//}

var parse = new Parse();
parse.start();