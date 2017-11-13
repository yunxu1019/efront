var fs = require("fs"),
    path = require("path"),
    enrich = require("../process/enrich");

var src_path = "E:\\";
var filesystem = enrich({
    path(full_path) {
        this._full_path = full_path;
    },
    exists(full_path = this._full_path) {
        console.log("exists", full_path);
        return new Promise(function (ok, oh) {
            fs.exists(full_path, ok);
        });
    },
    stat(full_path = this._full_path) {
        console.error(full_path, "stat");
        return new Promise(function (ok, oh) {
            fs.stat(full_path, function (error, stats) {
                if (error) return oh(error);
                ok(stats);
            });
        });
    },
    readdir(full_path = this._full_path) {
        console.error("readdir", full_path);
        return new Promise(function (ok, oh) {
            fs.readdir(full_path, function (error, directories) {
                if (error) return oh(error);
                ok(directories);
            })
        });
    },
    getfiles(full_path = this._full_path) {
        console.error(full_path, "getfiles");
        if (!this._files_map) this._files_map = {};
        var that = this;
        if (full_path instanceof Array) {
            console.error(full_path, "getfiles1");
            return Promise.all(full_path.map(function (full_path) {
                console.error(full_path, "getfiles2");
                return that.getfiles(full_path);
            })).then(function (stats) {
                var _dirs = {}, _files = {};
                stats.filter(a => a).forEach(function ({ dirs, files }) {
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
            console.error(full_path, "getfiles3", that);
            return that.exists(full_path).then(function (exists) {
                console.error(full_path, "getfiles4");
                return exists && that.stat(full_path).then(function (stat) {
                    if (stat.isFile()) {
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
            console.error(full_path, full_path.length, file_map);
            if (!full_path.length) return file_map;
            console.error(full_path, full_path.length, "readtree");
            return that.getfiles(full_path).then(function (result) {
                if (!result) return [];
                var { dirs, files } = result;
                console.error(full_path, dirs, files);
                Object.keys(files).forEach(function (key) {
                    var file_stat = files[key];
                    var hash = file_stat.size;
                    if (!file_map[hash]) file_map[hash] = {};
                    var map = file_map[hash];
                    map[file_stat] = key;
                });
                var nexts = [];
                return Promise.all(Object.keys(dirs).map(function (key) {
                    return that.readdir(key).then(function (names) {
                        names.map(function (name) {
                            nexts.push(path.join(key, name));
                        });
                    });
                })).then(function (dirs) {
                    return nexts;
                });
            }).then(reader);
        };
        return reader(full_path);
    }
});
function find(full_path) {
    return filesystem.path(full_path);
}
module.exports = find;