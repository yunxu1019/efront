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
var crc = require("../process/crc");
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
var versionTree = {};
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

    fs.exists(fullpath, function (exists) {
        if (exists) {
            fs.stat(fullpath, function (error, stat) {
                if (error) throw new Error(`读取文件信息出错${url}`);
                if (!stat.isFile()) throw new Error(`源路径不存在文件${url}`);
                fs.readFile(fullpath, function (error, buffer) {
                    if (error) throw new Error("加载" + url + "出错！");
                    var responseText = builder(buffer, name + extt, fullpath, []);
                    responseTree[url] = responseText;
                    versionTree[url] = crc([].map.call(responseText, e => e.charCodeAt(0))).toString(36) + (+stat.mtime).toString(36);
                    flush(url);
                });
            });
        } else {
            if (!window[name]) throw new Error(`没有发现文件：${url}`);
            else console.warn(`${url} will be replaced by the global variables`);
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
        if (!text && typeof text !== "string")
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
        functionBody = functionBody.replace(/^(?:\s*(["'])user? strict\1;?[\r\n]*\s*)?/i, "\"use strict\";\r\n");
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

var requires_count = 1;
var is_commponent_package;
var public_app = path.resolve(comms_root, PUBLIC_APP);
if (fs.existsSync(public_app) && fs.statSync(public_app).isFile()) {
    //导出组件
    is_commponent_package = true;
    var hook = function () {
        if (requires_count === 0) build([public_app]);
    };
    requires_count++;
    init("[].map", replaceArrayMap);
} else {
    //导出项目
    public_app = pages_root;
    if (fs.existsSync(public_app) && fs.statSync(public_app).isDirectory()) {
        is_commponent_package = false;
    } else {
        throw new Error(`要发布或打包的源路径不存在:${public_app}`);
    }
    var hook = function (requires_count) {
        if (requires_count === 0) {
            init("zimoli", function (zimoli) {
                modules.go = modules.zimoli = zimoli;
                build([pages_root, ccons_root]);
            });
        }
    };
    requires_count++;
    init("promise", replacePromise);
    requires_count++;
    init("[].map", replaceArrayMap);
    requires_count++;
    init("fastclick", replaceClickEvent);
}
modules.put = function (name, module) {
    modules[name] = module;
};
modules.responseTree = responseTree;
modules.loaddingTree = loaddingTree;
modules.setGetMethod = function (_get) {
    get = _get;
};
modules.renderPixelRatio = 1;
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




var build = function (files) {
    var file = files.shift();
    new Promise(function (ok, oh) {
        fs.exists(file, function (exists) {
            if (!exists) return oh(`路径${file}不存在`);
            fs.stat(file, function (error, stat) {
                if (error) return oh(error);
                if (stat.isFile()) {
                    if (/\.png$/i.test(file)) {
                        var name = path.relative(ccons_root, file).replace(/[\\\/]+/g, "/");
                        init("$" + name, ok);
                    } else if (/\.[tj]sx?$/i.test(file)) {
                        if (/^.*?\/?coms/i.test(file)) {
                            var name = path.relative(comms_root, file).replace(/[\\\/]+/g, "/");
                            init(name, ok);
                        }
                        else if (/^.*?\/?apps/i.test(file)) {
                            var name = path.relative(pages_root, file).replace(/[\\\/]+/g, "/");
                            init("/" + name, ok);
                        }
                        else {
                            var name = path.relative(aapis_root, file).replace(/[\\\/]+/g, "/");
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
        else build(files);
    });
};
var public = function () {
    console.info("编译完成，正在写入文件..");
    if (is_commponent_package) {
        writeComponent();
    } else if (PUBLIC_APP.endsWith("/")) {
        writeSingleHtmlFile();
    } else {
        writeApplication();
    }
};

var writeComponent = function () {
    var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
    if (/(apis|coms|cons|data|process|server|tester|tools|apps)$/i.test(path.relative("./", PUBLIC_PATH))) return console.error("请不要在源码文件夹生成目标代码！");
    if (fs.existsSync(public_path) && fs.statSync(public_path).isDirectory()) return console.error(`目标位置存在文件夹${public_path}`);
    var resultMap = {}, result = [];
    var needmap = false;
    for (var k in responseTree) {
        var v = responseTree[k];
        var needs = modules[v];
        if (/\.map($|\(|\s\.\)\]\}\,)/.test(v)) {
            needmap = true;
        }
    }
    var array_map = responseTree["[].map"];
    delete responseTree["[].map"];
    for (var k in responseTree) {
        result.push([k].concat(modules[k]));
    }
    var dest = [], last_result_length = result.length;
    var $$_efront_map_string_key = "$$_efront_map_const_string_key__";
    var escodegen = require("../process/escodegen/escodegen");
    var esprima = require("../process/esprima/esprima");
    var esmangle = require("../process/esmangle/esmangle");
    var scanner = require("../process/compile/scanner");

    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, ...module_body] = result[cx];
            var ok = true;
            module_body.slice(0, module_body.length >> 1).forEach(function (k) {
                if (!resultMap[k] && responseTree[k]) ok = false;
                if (!responseTree[k] && !resultMap[k]) resultMap[k] = dest.length + 1, dest.push(k);
            });
            if (ok) {
                var this_module_params = {};
                var setMatchedConstString = function (match, type, k) {
                    if (/user?\s+strict/.test(k) || k.length < 3) return match;
                    k = k.replace(/^(['"])(.*?)\1$/g, function (match, qoute, string) {
                        if (/['"]/.test(string)) return match;
                        return "\"" + string + "\"";
                    });
                    var key = k.replace(/[^\w]/g, a => "$" + a.charCodeAt(0).toString(36) + "_");
                    var $key = $$_efront_map_string_key + key;
                    if (!resultMap[$key]) {
                        dest.push(type === "." ? "\"" + k + "\"" : k);
                        resultMap[$key] = dest.length;
                    }
                    if (!this_module_params[$key]) {
                        this_module_params[$key] = true;
                        module_body.splice(module_body.length >> 1, 0, $key);
                        module_body.splice(module_body.length - 1, 0, $key);
                    }
                    return type === "." ? `[${$key}]` : " " + $key + " ";
                };
                var setMatchedConstRegExp = function (match, type, k) {
                    var key = k.replace(/[^\w]/g, a => "$" + a.charCodeAt(0).toString(36) + "_")
                    var $key = $$_efront_map_string_key + key;
                    if (!resultMap[$key]) {
                        dest.push(k.toString());
                        resultMap[$key] = dest.length;
                    }
                    if (!this_module_params[$key]) {
                        this_module_params[$key] = true;
                        module_body.splice(module_body.length >> 1, 0, $key);
                        module_body.splice(module_body.length - 1, 0, $key);
                    }
                    return type + " " + $key + " ";
                }
                var module_string = module_body[module_body.length - 1]
                // .replace(/(["'])(|.*?[^\\])\1/g, setMatchedConstString)
                // .replace(/([^<])(\/.*?[^\\]\/[igmy]+)/g, setMatchedConstRegExp)
                // .replace(/(\.)([\$_a-zA-Z][\$_\w]{2,})/g, setMatchedConstString);
                var code_blocks = scanner(module_string);
                module_string = code_blocks.map(function (block) {
                    var block_string = module_string.slice(block.start, block.end);
                    if (block.type === block.single_quote_scanner || block.type === block.double_quote_scanner) {
                        return setMatchedConstString(block_string, "", block_string);
                    }
                    if (block.type === block.regexp_quote_scanner) {
                        return setMatchedConstRegExp(block_string, "", block_string);
                    }
                    return module_string.slice(block.start, block.end);
                }).join("").replace(/(\.)\s*((?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_a-z\u0100-\u2027\u2030-\uffff])(?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_\w\u0100-\u2027\u2030-\uffff])*)/ig, setMatchedConstString);

                var module_code = esprima.parse(`function ${k.replace(/([\$_a-z]\w*)\.[tj]sx?$/ig, "$1")}(${module_body.slice(module_body.length >> 1, module_body.length - 1)}){${module_string}}`);
                module_code = esmangle.optimize(module_code, null);
                module_code = esmangle.mangle(module_code);
                module_string = escodegen.generate(module_code, {
                    format: {
                        renumber: true,
                        hexadecimal: true, //十六进位
                        escapeless: true,
                        compact: true, //去空格
                        semicolons: false, //分号
                        parentheses: false //圆括号
                    }
                }).replace(/^function\s+[\$_A-Za-z][\$_\w]*\(/, "function(");
                dest.push(`[${module_body.slice(0, module_body.length >> 1).map(a => resultMap[a]).concat(module_string)}]`);
                resultMap[k] = dest.length;
                result.splice(cx, 1);
            }
        }
        if (last_result_length === result.length) throw new Error(`处理失败！`);
        last_result_length = result.length;
    }

    var template = `this["${PUBLIC_APP.replace(/([a-zA-Z_\$][\w\_\$]*)\.js$/, "$1")}"]=([].map||function(){${array_map}}.call(this)).call([${dest}],function(a,c){return this[c+1]=a instanceof Array?a[a.length-1].apply(this[0],a.slice(0,a.length-1).map(function(a){return this[a]},this)):a},[this])[${dest.length - 1}]`;
    var tester_path = path.join(comms_root, PUBLIC_APP.replace(/\.[tj]sx?$/, "_test.js"));
    if (fs.existsSync(tester_path)) {
        try {
            let vm = require("vm");
            let globals = require("../tester/core/suit");
            let context = vm.createContext(globals);
            vm.runInContext(template, context);
            vm.runInContext(fs.readFileSync(tester_path).toString(), context);
        } catch (e) {
            console.error(e);
        }
    }
    fs.writeFileSync(public_path, template);
    finish();
};

var writeSingleHtmlFile = function () {
    var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
    if (/(apis|coms|cons|data|process|server|tester|tools|apps)$/i.test(path.relative("./", PUBLIC_PATH))) return console.error("请不要在源码文件夹生成目标代码！");
    if (!fs.existsSync(public_path)) fs.mkdirSync(public_path);
    if (!fs.statSync(public_path).isDirectory()) return console.error(`目标位置存在文件${public_path}`);
    var process_env_public_path = process.env.PUBLIC_PATH;
    process.env.PUBLIC_PATH = "./apps";
    var getpagefile = require("../process/getfile");
    var indexHtml = getpagefile("index.html").toString();
    env.PUBLIC_PATH = process_env_public_path;
    var code = JSON.stringify(responseTree, null, "\t")//.replace(/[<>]/g, s => "\\x" + `0${s.charCodeAt(0).toString(16)}`.slice(-2));
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
}
var writeApplication = function () {
    var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
    if (/(apis|coms|cons|data|process|server|tester|tools|apps)$/i.test(path.relative("./", PUBLIC_PATH))) return console.error("请不要在源码文件夹生成目标代码！");
    if (!fs.existsSync(public_path)) fs.mkdirSync(public_path);
    if (!fs.statSync(public_path).isDirectory()) return console.error(`目标位置存在文件${public_path}`);
    var process_env_public_path = process.env.PUBLIC_PATH;
    process.env.PUBLIC_PATH = "./apps";
    var getpagefile = require("../process/getfile");
    var indexHtml = getpagefile("index.html").toString();
    env.PUBLIC_PATH = process_env_public_path;
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
        var code = JSON.stringify(versionTree, null, "\t")//.replace(/[<>]/g, s => "\\x" + `0${s.charCodeAt(0).toString(16)}`.slice(-2));
        var mainScript = commbuilder(fs.readFileSync("./coms/zimoli/main.js"), "main.js", "./coms/zimoli/main.js", []).toString();
        var versionTreeName = /\.versionTree\s*=\s*(.*?)[,;$]/m.exec(mainScript)[1];
        code = mainScript.replace(/(['"])post\1/ig, "$1get$1").replace(/\.send\(.*?\)/g, ".send()").replace(new RegExp(versionTreeName + "(\s*)=(\s*)\{.*?\}"), function (m, s1, s2) {
            return versionTreeName + `${s1}=${s2}${code}`;
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





hook(--requires_count);