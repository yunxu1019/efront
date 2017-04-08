/* 
 * 不枝雀
 * 2017-3-19 15:52:23
 */

// 修改路径基地址，或修改文件后缀
const set_path = (pre = "./", aft = "") => {
    pre = pre && pre.replace(/\/*$/, "/");
    aft = aft && aft.replace(/^\/+/, "/");
    const build = (path) => {
        if (typeof path === "string") {
            path = pre && path[0] !== '/' && path[1] !== ':' ? pre + path : path;
            path = aft ? path.replace(/\/*$/, "") + aft : path;
            return path;
        }
        if (path instanceof Array) {
            path = [];
        } else if (typeof path === "object") {
            path = Object.create(path.__proto__);
        }
        for (let k in path) {
            path[k] = build(path[k]);
        }
        return path;
    };
    return build;
};
const read = function () {
    var fs = require("fs");
    var readdir = function (dir, callback) {
        fs.readdir(dir, function (error, dirs) {
            if (error) {
                return callback(false);
            }
            let result = {};
            dirs.forEach(d => result[d.replace(/\.js$/, '')] = null);
            callback(result);
        });
    };
    var readfile = function (dir, callback) {
        fs.readFile(dir, function (error, result) {
            if (error)
                return callback(false);
            callback(String(result));
        });
    };
    return function (dir, callback) {
        if (!fs.existsSync(dir)) {
            return callback(false);
        }
        var stat = fs.lstatSync(dir);
        if (stat.isDirectory()) {
            readdir(dir, callback);
        } else {
            readfile(dir, callback);
        }
    };
}();
const seek = function (...dirs) {
    var result = this;
    for (let dir of arguments) {
        if (!result) {
            if (result !== null) {
                throw "不存在路径" + dirs.join("/");
            }
            return null;
        }
        result = result[dir];
    }
    return result;
};
const sum = function (private_key) {
    var src = new Array(0x7f - 0x20);
    -function () {
        for (var cx = 0, dx = src.length; cx < dx; cx++)
            src[cx] = cx + 0x20;
    }();
    var chaos = function (arr, start, end) {
        arr.push.apply(arr, arr.splice(start, end - start).reverse());
        return arr;
    };
    var runner = function (arr, str) {
        var m = str.length, n = arr.length;
        for (var cx = 0, dx = m > n ? m : n; cx < dx; cx++) {
            var tmp = str.charCodeAt(cx % m) % n;
            var p1, p2;
            if (tmp > cx) {
                p1 = cx;
                p2 = tmp;
            } else {
                p1 = tmp;
                p2 = cx;
            }
            chaos(arr, p1, p2);
        }
    };
    runner(src, "" + private_key);
    return function (str) {
        var arr = new Array(src.length);
        for (var cx = 0, dx = arr.length; cx < dx; cx++) {
            arr[cx] = cx;
        }
        runner(arr, String(str && str.length));
        runner(arr, str);
        for (var cx = 0, dx = arr.length; cx < dx; cx++) {
            arr[cx] = src[arr[cx]];
        }
        return String.fromCharCode.apply(null, arr.slice(arr.length - 13));
    };
}();
const init = function (string, module) {
    //每个文件一个独立的作用域
    //未声明的变量自动注入
    //以文件名命名的变量为最终导出结果
    var esprima = require('esprima');
    var ast = esprima.parse(string);
    var args = {};
    var g = function (a, p) {
        var vars = {}, _args = [];
        p.forEach(a => vars[a] = 1);
        if (a instanceof Object) {
            for (let k in a) {
                let v = a[k];
                switch (k) {
                    case "params":
                        vars[v.name] = 1;
                        break;
                    case "declarations":
                        v.forEach(v => {
                            vars[v.id.name] = 1;
                        });
                        break;
                    case "expression":
                        if (!vars[v.name] && v.type === 'Identifier') {
                            _args.push(v.name);
                        }
                        break;
                }
            }
            _args.forEach((arg) => {
                if (!vars[arg]) {
                    args[arg] = 1;
                }
            });
            for (let k in a) {
                g(a[k], Object.keys(args));
            }
        }
    };
    g(ast, []);
    args = Object.keys(args);
    return [new Function(...args, string + "\r\n;return " + module + ";"), args];
};
var fRequire = function (FUNCTION_PATH) {
    //加载函数
    let tree;
    const waitting = [];
    const get = function (name) {
        var keys = name.replace(/[A-Z]/g, (match) => "/" + match.toLowerCase()).split("/");
        if (!keys[0]) {
            var tmp = this;
            let key0 = keys[1];
            while (tmp && tmp[key0] === undefined) {
                tmp = tmp.__parent__;
            }
            if (!tmp) {
                throw "找不到" + name;
            }
            keys.splice(0, 1);
            return [tmp, keys];
        }
        return [tree, keys];
    };
    const build = function (name, onfinish = () => {}){
        const then = function (callback) {
            onfinish = callback;
        };
        if (!tree) {
            waitting.push([name, function (f) {
                    onfinish && onfinish(f);
                }]);
            return then;
        }
        const that = this;
        const [object, keeys] = get.apply(that, [name]);
        setTimeout(() => {
            var realize = seek.apply(object, keeys);
            if (realize !== null) {
                return onfinish(realize);
            }
            const key = keeys.splice(keeys.length - 1)[0];
            const _init = () => {
                const parent = seek.apply(object, keeys);
                let path = set_path(parent.__path__, ".js")(key);
                let start = function (data) {
                    if (typeof data === "string") {
                        let [f, base] = init(data, key);
                        if (base instanceof Array) {
                            //单例模式
                            let count = base.length;
                            let relay = base.map(a => a);
                            if (count === 0) {
                                var res = f.apply(that, base);
                                res.__creator__ = f.toString();
                                res.__require__ = relay;
                                finish(parent, key, res);
                                onfinish(res);
                            }
                            base.forEach((b, cx) => {
                                build(b)((res) => {
                                    base[cx] = res;
                                    if (count-- !== 1) {
                                        return;
                                    }
                                    var data = f.apply(that, base);
                                    data.__creator__ = f.toString();
                                    data.__require__ = relay;
                                    finish(parent, key, data);
                                    onfinish(res);
                                });
                            });
                        } else {
                            //常量模式
                            finish(parent, key, f);
                            onfinish(f);
                        }
                    } else {
                        finish(parent, key, data);
                        onfinish(data);
                    }

                };
                read(path, function (data) {
                    if (data === false) {
                        path = set_path(parent.__path__)(key);
                        read(path, function (data) {
                            start(data);
                        });
                    } else {
                        start(data);
                    }
                });
            };
            if (seek.apply(object, keeys) instanceof Object) {
                return _init();
            } else {
                return build(keeys.join("/"))(_init);
            }
        }, 0);
        return then;
    };
    const finish = function (parent, key, data) {
        data.__parent__ = parent;
        data.__path__ = set_path(parent.__path__, "")(key);
        data.__root__ = tree;
        parent[key] = data;
    };
    read(FUNCTION_PATH, function (data) {
        tree = data;
        tree.__path__ = FUNCTION_PATH;
        waitting.splice(0).forEach((args) => {
            build.apply(null, args);
        });
    });
    return build;
}("process");

fRequire.export = function (name, onfinish = () => {}) {
    var body = {};
    var deepget = function (name, callback) {
        fRequire(name)(function (o) {
            body[o.__path__] = o;
            var count = o.__require__.length;
            if (!count) {
                callback();
            }
            o.__require__.forEach(function (n) {
                deepget(n, function () {
                    count--;
                    if (!count) {
                        callback();
                    }
                });
            });
        });
    };
    deepget(name,function(){
        console.log(body)
    });
    var then = function (callback) {
        onfinish = callback;
    };
    return then;
};
fRequire.import = function () {

}();
module.exports = fRequire;