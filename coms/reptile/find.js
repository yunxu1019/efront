"use strict";
var fs = require("fs"),
    path = require("path");

var src_path = "E:\\";
var filesystem = enrich({
    path(full_path) {
        this._full_path = full_path;
    },
    mkdir(full_path = tihs._full_path) {
        return new Promise(function (ok, oh) {
            fs.mkdir(full_path, function (error) {
                if (error) oh(error);
                else ok();
            });
        });
    },
    exists(full_path = this._full_path) {
        return Promise.resolve(fs.existsSync(full_path));
    },
    stat(full_path = this._full_path) {
        return new Promise(function (ok, oh) {
            fs.stat(full_path, function (error, stats) {
                if (error) return oh(error);
                ok(stats);
            });
        });
    },
    readdir(full_path = this._full_path) {
        return new Promise(function (ok, oh) {
            fs.readdir(full_path, function (error, directories) {
                if (error) return oh(error);
                ok(directories);
            })
        });
    },
    getfiles(full_path = this._full_path) {
        if (!this._files_map) this._files_map = {};
        var that = this;
        var searcher = this.searcher;
        if (full_path instanceof Array) {
            return queue.call(function (full_path) {
                return that.getfiles(full_path);
            }, full_path).then(function (stats) {
                var _dirs = {}, _files = {};
                stats.filter(a => !!a).forEach(function ({ dirs, files }) {
                    for (var k in dirs) {
                        if (!_dirs[k]) _dirs[k] = dirs[k];
                    }
                    for (var k in files) {
                        if (!_files[k]) {
                            _files[k] = files[k];
                        }
                    }
                });
                return { dirs: _dirs, files: _files };
            });
        } else {
            return that.exists(full_path).then(function (exists) {
                return exists && that.stat(full_path).then(function (stat) {
                    if (stat.isFile()) {
                        if (searcher instanceof Function) {
                            return Promise.resolve(searcher.call(that, full_path, stat)).then(function (res) {
                                if (res === false) {
                                    return false;
                                }
                                return { files: { [full_path]: stat }, dirs: {} };
                            });
                        }
                        return { files: { [full_path]: stat }, dirs: {} };
                    } else {
                        return { dirs: { [full_path]: stat }, files: {} };
                    }
                });
            });
        }
    },
    readtree(full_path = this._full_path) {
        var file_map = {};
        var that = this;
        var reader = function (full_path) {
            if (!full_path || !full_path.length) return file_map;
            return that.getfiles(full_path).then(function (result) {
                if (!result) [];
                var { dirs, files } = result;
                Object.keys(files).forEach(function (key) {
                    var file_stat = files[key];
                    var hash = file_stat.size;
                    if (!file_map[hash]) file_map[hash] = [];
                    file_map[hash].push(key);
                });
                var nexts = [];

                return queue.call(function (key) {
                    return that.readdir(key).then(function (names) {
                        names.map(function (name) {
                            nexts.push(path.join(key, name));
                        });
                    });
                }, Object.keys(dirs)).then(function () {
                    return reader(nexts);
                });
            });
        };
        return reader(full_path);
    },
    search(searcher) {
        this.searcher = searcher;
    },
    getmulti(full_path) {
        return this.readtree().then(function (tree) {
            var result = {};
            for (var key in tree) {
                if (tree[key].length > 1) {
                    result[key] = tree[key];
                }
            }
            return result;
        });
    },
});
function find(full_path) {
    return filesystem.path(full_path);
}