var setupenv = require("../process/setupenv");
require("../process/console");
var fs = require("fs");
var path = require("path");
if (!process.cwd() === path.dirname(__dirname)) throw new Error("请在项目根目录启动！");
var { PUBLIC_PATH, APP } = process.env;
var PUBLIC_APP = process.argv[2] || APP;
if (!PUBLIC_APP) throw new Error("请输入要发布的项目名称！");
if (!PUBLIC_PATH) throw new Error("请指定输出路径！");
if (!fs.existsSync(PUBLIC_PATH)) fs.mkdirSync(PUBLIC_PATH);
if (fs.statSync(PUBLIC_PATH).isFile()) throw new Error("输出路径已存在，并且不是文件夹！");
fs.watch = function () { return function () { } };
var commbuilder = require("../process/commbuilder");
var iconbuilder = require("../process/iconbuilder");
var aapibuilder = require("../process/aapibuilder");
var env = PUBLIC_APP ? setupenv(PUBLIC_APP) : process.env;
var PAGE = env.PAGE || "zimoli";
var COMM = env.COMM || "zimoli";
var ICON = env.ICON || "zimoli";
var AAPI = env.APIS || "zimoli";
var ccons_root = "./cons/" + ICON;
var comms_root = "./coms/" + COMM;
var pages_root = "./apps/" + PAGE;
var aapis_root = "./apis/" + AAPI;
var loaddingTree = {};
var requestTree = {};
var responseTree = {};
var window = global;
var load = function (url) {
    var match = url.match(/^(.*?)(\/|\$|)(.*?)(?:\.js|\.png)?$/);
    var builder, fullpath;
    if (match) {
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4];
        switch (type) {
            case "":
                builder = commbuilder;
                extt = ".js";
                fullpath = path.join(comms_root, name + extt);
                break;
            case "/":
                builder = commbuilder;
                extt = ".js";
                fullpath = path.join(pages_root, name + extt);
                break;
            case "$":
                builder = iconbuilder;
                extt = ".png";
                fullpath = path.join(ccons_root, name + extt);
                break;
            case "_":
                builder = aapibuilder;
                extt = ".js";
                fullpath = path.join(aapis_root, name + extt);
                break;
            default:
                throw new Error(`not support type ${type}!`);
        }
    } else {
        throw new Error(`Bad Request ${url}!`);
    }
    if (!builder) throw new Error(`build system not support ${type}`);
    console.info(fullpath);

    fs.exists(fullpath, function (exists) {
        if (exists) {
            fs.readFile(fullpath, function (error, buffer) {
                if (error) throw new Error("加载" + url + "出错！");
                var responseText = builder(buffer, name + extt, fullpath, []);
                responseTree[url] = responseText;
                flush(url);
            });
        } else {
            if (!window[name]) throw new Error(`没有发现文件：${url}\r\n`);
            else console.warn(`${url} will be replaced by the global variables\r\n`);
            flush(url);
        }
    });
};
var flush = function (name) {
    var thens = loaddingTree[name];
    delete loaddingTree[name];
    for (var k in thens) {
        var then = thens[k];
        if (then instanceof Function) {
            then(responseTree[name]);
        }
    }
};
var get = function (name, then) {
    if (responseTree[name]) {
        then(responseTree[name]);
    } else if (loaddingTree[name]) {
        loaddingTree[name].push(then);
    } else {
        loaddingTree[name] = [then];
        load(name);
    }
};

function modules() { }
modules.modules = modules;
var pendding = {};
var executer = function (functionBody, argsNames = []) {
    return argsNames.concat([functionBody]);
};
var noop = function (a) {
    return a
};
var broadcast = function (url, exports) {
    modules[url] = exports;
    var thens = pendding[url];
    delete pendding[url];
    for (var cx = 0, dx = thens.length; cx < dx; cx++) {
        thens[cx](exports);
    }
};
var init = function (name, then, prebuild) {
    if (name instanceof Array) {
        return Promise.all(name.map(function (argName) {
            if (prebuild && argName in prebuild) {
                return argName;
            }
            return new Promise(function (ok, oh) {
                init(argName, ok);
            });
        })).then(function (args) {
            (then instanceof Function) && then();
        }).catch(function (e) {
            window.console.error(e, "\r\n");
        });
    }
    if (modules[name]) {
        return then();
    }
    var adapter;
    switch (name.charAt(0)) {
        case "/":
            name = name.replace(/\.[tj]sx?$/, "");
            adapter = executer;
            break;
        case "$":
            name = name.replace(/\.png/, "");
            adapter = noop;
            break;
        default:
            adapter = executer;
    }
    if (modules[name]) {
        return then();
    }
    if (pendding[name]) {
        return pendding[name].push(then);
    }
    pendding[name] = [then];
    // return 
    get(name, function (text) {
        if (!text)
            return broadcast(name, global[name]);
        if (adapter === noop) {
            return broadcast(name, text);
        }
        var functionArgs, functionBody;
        //依赖项名称部分的长度限制为36*36*18=23328
        var doublecount = parseInt(text.slice(0, 3), 36);
        if (doublecount >> 1 << 1 === doublecount) {
            var dependencesCount = doublecount >> 1;
            var perdependenceCount = doublecount - (dependencesCount << 1);
            var dependenceNamesOffset = 3 + dependencesCount;
            var dependenceNames = text.slice(3, dependenceNamesOffset);
            functionArgs = dependenceNames ? dependenceNames.split(",") : [];
            functionBody = text.slice(dependenceNamesOffset);
        } else {
            functionArgs = [];
            functionBody = text;
        }
        functionBody = functionBody.replace(/^(?:"user? strict";?[\r\n]*)?/i, "\"use strict\";\r\n");
        if (!functionArgs.length) {
            var exports = adapter(functionBody);
            return broadcast(name, exports);
        }
        init(functionArgs.slice(0, functionArgs.length >> 1), function () {
            var exports = adapter(functionBody, functionArgs);
            broadcast(name, exports);
        }, prebuild);
    });
};
modules.init = init;
var replacePromise = function (promise) {
    hook(--requires_count);
};
var replaceArrayMap = function (map) {
    hook(--requires_count);
};
var replaceClickEvent = function (fastclick) {
    hook(--requires_count);
};
var requires_count = 0;
if (true) {
    requires_count++;
    init("promise", replacePromise);
    requires_count++;
    init("[].map", replaceArrayMap);
    requires_count++;
    init("fastclick", replaceClickEvent);
}
var hook = function (requires_count) {
    if (requires_count === 0) {
        var hook = function (files) {
            var file = files.shift();
            new Promise(function (ok, oh) {
                fs.exists(file, function (exists) {
                    if (!exists) return oh(`路径${file}不存在`);
                    fs.stat(file, function (error, stat) {
                        if (error) return oh(error);
                        if (stat.isFile()) {
                            if (/\.png$/.test(file)) {
                                var name = path.relative(ccons_root, file).replace(/[\\\/]+/, "/");
                                init("$" + name, ok);
                            } else if (/\.[tj]sx?$/.test(file)) {
                                if (/^.*?\/?apps/i.test(file)) {
                                    var name = path.relative(pages_root, file).replace(/[\\\/]+/, "/");
                                    init("/" + name, ok);
                                }
                                else {
                                    var name = path.relative(aapis_root, file).replace(/[\\\/]+/, "/");
                                    init("_" + name, ok);
                                }
                            } else {
                                ok();
                            }
                        } else {
                            fs.readdir(file, function (error, names) {
                                if (error) return oh(error);
                                names.forEach(function (name) {
                                    files.push(path.join(file, name));
                                });
                                ok();
                            });
                        }
                    });
                });
            }).catch(function (e) {
                console.error(e, "\r\n");
            }).then(function () {
                if (!files.length) public();
                else hook(files);
            });
        };
        var public = function () {
            var process_env_public_path = process.env.PUBLIC_PATH;
            process.env.PUBLIC_PATH = "./apps";
            var getpagefile = require("../process/getfile");
            var indexHtml = getpagefile("index.html").toString();
            env.PUBLIC_PATH = process_env_public_path;
            console.info("编译完成，正在写入文件..");
            var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
            if (!fs.existsSync(public_path)) fs.mkdirSync(public_path);
            if (!fs.statSync(public_path).isDirectory()) return console.error(`目标位置存在文件${public_path}`);
            if (/(apis|coms|cons|data|process|server|tester|tools|apps)$/i.test(path.relative("./", PUBLIC_PATH))) return console.error("请不要在源码文件夹生成目标代码！");
            deeprm(public_path).then(function () {
                return Promise.all(Object.keys(responseTree).map(function (name) {
                    var data = responseTree[name];
                    switch (name.charAt(0)) {
                        case "/":
                            url = "page" + name;
                            break;
                        case "_":
                            url = "aapi/" + name.slice(1).replace(/([A-Z])/g, "/$1").toLowerCase();
                            break;
                        case "$":
                            // delete responseTree[name];
                            url = "ccon/" + name.slice(1);
                            break;
                        default:
                            url = "comm/" + name;
                    }
                    return deepwr(path.join(public_path, url), data);
                }));
            }).then(function () {
                var code = JSON.stringify(responseTree, null, "\t").replace(/[<>]/g, s => "\\x" + `0${s.charCodeAt(0).toString(16)}`.slice(-2));
                var mainScript = commbuilder(fs.readFileSync("./coms/zimoli/main.js"), "main.js", "./coms/zimoli/main.js", []).toString();
                var responseTreeName = /\.responseTree\s*=\s*(.*?)[,;$]/m.exec(mainScript)[1];
                code = mainScript.replace(/(['"])post\1/ig, "$1get$1").replace(/\.send\(.*?\)/g, ".send()").replace(new RegExp(responseTreeName + "(\s*)=(\s*)\{.*?\}"), function (m, s1, s2) {
                    return responseTreeName + `${s1}=${s2}${code}`;
                });
                var html = indexHtml.replace(/<!--[\s\S]*?-->/g, "").replace(/<title>.*?<\/title>/, `<title>${env.TITLE || "http://efront.cc"}</title>`).replace(/<script[\s\w\"\']*>[\s\S]*<\/script>/, function () {
                    return `<script>\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>`;
                });
                if (fs.existsSync(path.join(pages_root, "favicon.ico"))) {
                    var favicon = fs.readFileSync(path.join(pages_root, "favicon.ico"))
                } else if (fs.existsSync("apps/favicon.ico")) {
                    var favicon = fs.readFileSync("apps/favicon.ico");
                }
                fs.writeFile(path.join(public_path, "index.html"), html, function () {
                    if (favicon) fs.writeFile(path.join(public_path, "favicon.ico"), favicon, finish);
                    else finish();
                });
            }).catch(function (e) {
                console.error(e, "\r\n");
            });
        };
        var finish = function () {
            console.info(`完成，用时${process.uptime()}秒。\r\n`);
        };
        var mkkingTree = {};
        var mkdir = function (dir, then) {
            if (mkkingTree[dir]) return mkkingTree[dir].push(then);
            else mkkingTree[dir] = [then];
            fs.mkdir(dir, function (error) {
                setTimeout(function () {
                    var thens = mkkingTree[dir];
                    thens && thens.forEach(e => e(error));
                }, 10);
            });
        };
        var deepwr = function (dir, data) {
            console.info(dir);
            var dirname = path.dirname(dir);
            var paths = [];
            return new Promise(function (ok, oh) {
                var detect = function () {
                    fs.exists(dirname, function (exists) {
                        if (exists) {
                            if (!paths.length) {
                                fs.writeFile(dir, data, function (err) {
                                    if (err) return oh(err);
                                    else ok();
                                });
                            } else {
                                dirname = path.join(dirname, paths.shift());
                                mkdir(dirname, function (err) {
                                    if (err) return oh(err);
                                    else detect();
                                });
                            }
                        } else {
                            if (dirname === ".") return oh();
                            paths.unshift(path.basename(dirname));
                            dirname = path.dirname(dirname);
                            detect();
                        }
                    });
                };
                detect();
            });
        }
        var deeprm = function (dir) {
            return new Promise(function (ok, oh) {
                fs.exists(dir, function (exists) {
                    if (!exists) return ok();
                    fs.stat(dir, function (error, stat) {
                        if (error) return oh(error);
                        if (stat.isDirectory()) {
                            fs.readdir(dir, function (error, names) {
                                if (error) return oh(error);
                                Promise.all(names.map(function (name) {
                                    return deeprm(path.join(dir, name));
                                })).then(function () {
                                    fs.rmdir(dir, function (error) {
                                        if (error) return oh(error);
                                        ok();
                                    });
                                }).catch(oh);
                            });
                        } else {
                            fs.unlink(dir, function (error) {
                                if (error) return oh(error);
                                ok();
                            });
                        }
                    });
                });
            });
        };
        init("zimoli", function (zimoli) {
            modules.go = modules.zimoli = zimoli;
            hook([pages_root, ccons_root]);
        });
    }
};
modules.put = function (name, module) {
    modules[name] = module;
};
modules.responseTree = responseTree;
modules.loaddingTree = loaddingTree;
modules.setGetMethod = function (_get) {
    get = _get;
};
Object.assign(global, {
    navigator: { userAgent: "" },
    globalStorage: {},
    sessionStorage: {},
    localStorage: {},
    window,
    location: {},
    history: {},
    document: {
        createElement() { return {} },
        createEvent() {
            return {};
        },
        documentElement: {
            addBehavior() { }
        }
    },
    state: {},
    screen: {},
    Image: {}
})
modules.load = load;
modules.XHR = function () { };
hook(requires_count);