"use strict";
var { COMMENT, SCOPED, STAMP, STRAP, QUOTED, splice, insertAfter, skipAssignment, VALUE, EXPRESS, SCOPED, SPACE } = require("../compile/common");;
var showMemery = require("./showMemery");
var scanner2 = require("../compile/scanner2");
var breakcode = require("../compile/breakcode");
var strings = require("../basic/strings");
var getEntryName = require("./getEntryName");
var inCom = require("./inCom");
var inPage = require("./inPage");
var fs = require("fs");
var path = require("path");
var memery = require("./memery");
var islive = memery.islive;
var autoiota = require("../compile/autoiota");
var autoeval = require("../compile/autoeval");
var autoenum = require("../compile/autoenum");
var polyfill = require("../compile/polyfill");
var autoConst = require("../compile/auto-const");
var translate = require("../compile/translate");
var $split = require("../basic/$split");
var getMaped = require("../compile/getMaped");
var backEach = require("../basic/backEach");
var downLevel = require("../compile/downLevel");
var isbooted = typeof seek === 'function';
// var downLevel = require("./downLevel");
var skipreg = /^\s*(['"`])use\s+(strict|asm|strip)\1(?:\s*;)?\s*$/;
var breakflag = null;
var bindLoadings = function (reg, data, rootfile, replacer = a => a, deep) {
    var ignoreUse_reg = commbuilder.ignoreUse_reg;
    if (!data) return data;
    var regs = [].concat(reg);
    var regindex = 0;
    if (this && this["?"]) var bindmap = this;
    var run = function (data, fullpath, increase = 0) {
        var reg = regs[regindex];
        data = String(data);
        var loadurls = [];
        data.replace(reg, function (match, quote, relative) {
            if (skipreg.test(match)) return match;
            if (ignoreUse_reg && ignoreUse_reg.test(relative)) return '';
            loadurls.push(relative);
        });
        var trimurl = url => {
            var u = path.join(path.dirname(fullpath), url);
            if (!fs.existsSync(u)) return;
            return path.relative(path.dirname(rootfile), u).replace(/\\/g, '/');
        };
        if (fullpath !== rootfile) {
            data = data.replace(/\b(url|require|init)\(\s*(['"`]|)([^'"`;\:,\u2029\u2028\r\n]+)\2\s*\)/i, function (_, type, quote, url) {
                if (/^(https?|ftp|data):|^[\/\\]/i.test(url)) return _;
                if (!quote && deep !== 0) return _;
                var url = trimurl(url);
                if (!url) return _;
                return `${type}(${quote}${url}${quote})`;
            }).replace(/\b(src|href)\s*=\s*(['"`]|)([^'"`\r\n\u2028\u2029\:;,]+)\2/, function (_, type, quote, url) {
                if (/^(https?|ftp|data):|^[\/\\]/i.test(url)) return _;
                if (!quote && deep !== 0) return _;
                url = trimurl(url);
                if (!url) return _;
                return `${type}=${quote}${url}${quote}`;
            });
        }
        if (!loadurls.length) {
            if (regindex + 1 >= regs.length || increase === 0) return Promise.resolve(data);
            return regindex++, run(data, fullpath, increase);
        }
        return new Promise(function (ok, oh) {
            var pathmap = Object.create(null);
            var accessready = async function () {
                var urls = loadurls.filter(a => pathmap[a])
                var loaded = urls.map(function (key) {
                    var realpath = pathmap[key];
                    if (deep !== false) {
                        return getFileData(realpath).then(a => run(a, realpath));
                    } else {
                        return getFileData(realpath);
                    }
                });
                var datas = await Promise.all(loaded);
                var flags = reg.flags;
                if (flags.indexOf('g') < 0) flags += 'g';
                var reg1 = new RegExp(reg.source, flags);
                var dataMap = Object.create(null);
                datas.forEach((data, cx) => {
                    dataMap[urls[cx]] = data;
                });
                var match1;
                var res = [];
                var lastMatch = 0;
                while (match1 = reg1.exec(data)) {
                    res.push(data.slice(lastMatch, lastMatch = match1.index));
                    var [match, quote, relative] = match1;
                    lastMatch += match.length;
                    if (skipreg.test(match)) {
                        res.push(match);
                        continue;
                    }
                    if (ignoreUse_reg && ignoreUse_reg.test(relative)) {
                        res.push("");
                        continue;
                    }
                    var holder = dataMap[relative];
                    if (holder && relative in pathmap) {
                        var result = await replacer(holder, pathmap[relative], match);
                        if (result !== false && result !== null && result !== undefined) {
                            res.push(result);
                            continue;
                        }
                    }
                    if (deep !== false) console.warn(`没有处理${match} ${fullpath}${/\.[^\/\/\.]+$/.test(match) ? "" : "，可在引用路径中添加扩展名后重试！"}`);
                    res.push(match);
                }
                if (lastMatch < data.length) res.push(data.slice(lastMatch, data.length));
                data = res.join('');
                if (regindex + 1 >= regs.length || increase === 0) ok(data);
                else regindex++, run(data, fullpath, increase).then(ok, oh);
            };
            var loadingcount = loadurls.length;
            if (!loadingcount) accessready();
            else loadurls.forEach(relative => {
                var realPath = path.join(path.dirname(fullpath), relative);
                fs.access(realPath, function (error) {
                    if (error) {
                        if (bindmap && !/^\./.test(relative) && relative in bindmap) {
                            pathmap[relative] = bindmap[relative];
                        }
                    }
                    loadingcount--;
                    if (!error) {
                        pathmap[relative] = realPath;
                    }
                    if (!loadingcount) accessready();
                });
            });
        })
    };
    return run(data, rootfile, 1);
};

var useInternalReg = /^\s*(['"`])(?:use|#?include)\s+(.+?)\1(\s*;)?\s*$/img;
var replaceIncludes = function (data) {
    return data.replace(useInternalReg, function (m, q, p, c) {
        if (/^\s*(['"`])use\s+strict\1/i.test(m)) return m;
        var realName = path.basename(p).replace(/\..*$/, "") || "main";
        realName = realName.replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        return `var ${realName}=require(${q}${p}${q})${c || ''}`;
    });
};
var loadUseBody = async function (source, fullpath, watchurls) {
    var replacer = function (data, realPath) {
        var timer = new Timer;
        watchurls.push(realPath);
        var realName = path.basename(realPath).replace(/\..*$/, "") || "main";
        realName = realName.replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        if (/\.(?:pem|html?|xml|glsl|te?xt|ini|props?|log)$/i.test(realPath)) {
            return `var ${realName}=\`${data.toString()}\`;`;
        }
        if (/\.json$/i.test(realPath)) {
            return `var ${realName}=${data};`;
        }
        if (/\.ya?ml$/i.test(realPath)) {
            data = parseYML(data);
            data = JSON.stringify(data);
            return `var ${realName}=${data};`;
        }
        if (/\.h$/i.test(realPath)) {
            return data;
        }
        if (!/\.([mc]?[jt]sx?)$/.test(realPath)) {
            return `var ${realName}=${JSON.stringify(data)}`;
        }
        data = data.toString();
        data = trimNodeEnvHead(data);
        data = data.replace(/^\s*(["`'])use strict\1\s*;?/, '');
        if (!new RegExp(useInternalReg.source, 'ig').test(source)) {
            var commName = realName;
        }
        if (!commName) commName = realName;
        if (~loadJsBody(data, 'main.js', 'main.js', '', 'main', '').imported.indexOf('module')) {
            var module_reg = /\bmodule(.exports|\[(['"`])exports\1\])\s*=/g;
            if (module_reg.test(data)) {
                data = data.replace(module_reg, commName ? "var " + commName + " =" : "return ");
                watchurls.time += +timer;
                return data;
            }
        }
        watchurls.time += +timer;
        return data;
    };
    source = await bindLoadings(useInternalReg, source, fullpath, replacer);
    if (!isbooted || !memery.AUTOEVAL) return source;
    return bindLoadings(/require\((['"`])([^'"`\)]*?\.json)\1\)\.[\w\.\u007f-\uffff]+/g, source, fullpath, function (data, realpath, match) {
        var json = JSON.parse(data);
        match = match.replace(/^[\s\S]*\)\./, '');
        var data = seek(json, match);
        return typeof data !== 'object' ? JSON.stringify(data) : match;
    })
};
var getRequiredPaths = function (data) {
    var pathReg = /\b(?:go|popup|zimoli)\(\s*(['"`])([^\{\}]+?)\1\s*?[\),]/g;
    var requiredPaths = {};
    var result = pathReg.exec(data);
    while (result) {
        requiredPaths[result[2].replace(/^[@#!]+/, "")] = true;
        result = pathReg.exec(data);
    }
    return Object.keys(requiredPaths);
};

var trimNodeEnvHead = function (data) {
    data = String(data || "").replace(/^\s*\#\!/, '//');
    return data;
};
var removePrequoted = function (code) {
    var o = code.first;
    var prequoted;
    var { QUOTED, STAMP, EXPRESS, STRAP, SCOPED } = code;
    while (o && o.type === QUOTED && skipreg.test(o.text)) {
        prequoted = o;
        o = o.next;
        while (o && o.type === STAMP && o.text === ';') {
            o = o.next;
        }
    }
    if (prequoted) {
        if (o && prequoted.next === o) {
            if (o.type === STRAP && /^(in|instanceof)$/.test(o.text) || o.type === STAMP && !/^(\+\+|\-\-)$/.test(o.text)
                || o.type === EXPRESS && /^\./.test(o.text) || o.type === SCOPED && o.entry === '[') {
                prequoted = prequoted.prev;
            }
        }
        else if (o) {
            prequoted = prequoted.next;
        }
        var i = code.indexOf(prequoted);
        code.first = prequoted.next;
        code.first.prev = null;
        prequoted.next = null;
        prequoted = code.splice(0, i + 1);
    }
    return prequoted;
};
if (typeof i18n === 'undefined') var show_building = console.info.bind(console, '编译');
else show_building = console.info.bind(console, i18n`编译`);
var clear_console = require("../basic/lazy")(console.type, 60);
var wrapReturnLess = function (r, cless_var, lessnode, className) {
    var n = skipAssignment(r);
    if (n === r.next) return n;
    var q = r.queue;
    var i = q.indexOf(r);
    var hasComma = false;
    if (n.type & STAMP && n.text === ',') hasComma = true;
    while (n && n.type & STAMP && n.text === ',') {
        n = skipAssignment(n.next);
    }
    var ni = i;
    if (!ni) ni = q.length;
    else ni = q.indexOf(n, i);
    i++;
    var exp = q.splice(i, ni - i);
    if (hasComma) {
        exp.entry = '(';
        exp.leave = ")";
        exp.type = SCOPED;
        exp = [exp]
    }
    exp.push(
        { type: STAMP, text: ',' },
        lessnode,
        { type: STAMP, text: ',' },
        { type: EXPRESS, text: strings.encode(className) }
    );
    exp.entry = '(';
    exp.leave = ")";
    exp.type = SCOPED;
    splice(q, i, 0, {
        type: EXPRESS,
        text: cless_var,
    }, exp);
    return n;
}
var loadJsBody = function (data, filename, fullpath, lessdata, commName, className, htmlData) {
    if (data.length > 0x200) show_building(fullpath);
    data = trimNodeEnvHead(data);
    data = data.replace(/\bDate\(\s*(['"`])(.*?)\1\s*\)/g, (match, quote, dateString) => `Date(${+new Date(dateString)})`);
    var destpaths = commbuilder.prepare === false ? [] : getRequiredPaths(data);
    var code = scanner2(data, fullpath, 'js');
    if (memery.torgb) code.keepcolor = false;
    var hasExport = code.export || !code.first;
    var prequoted = removePrequoted(code);
    code.newSpread();
    code.fix();
    if (this && this["#"]) {
        translate(this["#"], code);
        if (commName === "i18n") {
            let i18ndata = this["#"][1];
            let ls = code.used.supports;
            let i18nSupports = require("../basic/i18n-supports");
            if (ls && ls[0].next && ls[0].next.next) {
                var ss = {};
                ls = ls[0].next.next;
                i18ndata.forEach((a, i) => {
                    ss[a] = i;
                });
                i18ndata = i18nSupports.filter(s => {
                    return s.lang in ss;
                });
                i18nSupports = scanner2(`[${i18ndata.map(a => `{
                    "name":${strings.encode(a.name)},
                    "land":i18n${strings.encode(a.land, '`')},
                    "id":${strings.encode(a.id)},
                    "key":${strings.encode(a.key)}
                }`)}]`);
                translate(this["#"], i18nSupports);
                ls.push(...i18nSupports[0]);
            }
            let lm = code.used.languageMap;
            if (lm && lm[0].next && lm[0].next.next) {
                i18ndata = i18ndata.map((a, i) => JSON.stringify(a.lang) + ":" + i).join(",");
                i18ndata = scanner2(`={${i18ndata}}`)[1];
                lm[0].next.next.push(...i18ndata);
            }
        }
    }
    if (memery.AUTOEVAL) {
        // 处理导入式变量时
        // 有阻塞式读取文件的操作，性能可能下降
        // 数据依赖其他文件
        // 为防止其他文件变更后页面刷新不及时
        // 这里仅在没有端口打开时处理导入式变量
        code = autoConst.call(this, code, fullpath, memery.ported);
        code = autoiota(code);
        code = autoenum(code);
        code = autoeval(code);
    }
    else code = autoConst.call(this, code, fullpath, true);
    if (memery.POLYFILL) {
        code = polyfill(code);
    }
    var {
        vars: declares,
        used: allVariables,
        envs: undeclares,
        async: isAsync,
        return: hasReturn,
        yield: isYield
    } = code;
    var isBroken = false;
    if (commbuilder.typeofMap) {
        var typeofs = [];
        Object.keys(undeclares).forEach(k => {
            for (var u of allVariables[k]) {
                var p = u.prev;
                if (p && p.type === STRAP && p.text === 'typeof') {
                    if (typeofs.indexOf(u.text) < 0) typeofs.push(u.text);
                };
            }
        });
    }
    var globalsmap = {};
    if (hasExport) globalsmap.exports = 'exports';
    var templateName;
    if (htmlData) {
        if (undeclares.template) {
            templateName = 'template';
        }
        else {
            templateName = getEntryName(undeclares, commName);
        }
    }
    commName = getEntryName(declares, commName);
    var cless_var = 'cless';
    var hasless = typeof lessdata === "string";
    if (hasless) {
        if (!declares[cless_var]) {
            globalsmap.cless = cless_var;
        } else {
            do {
                cless_var = "cless_" + Math.random().toString(36).slice(2);
            } while (declares[cless_var]);
            globalsmap.cless = cless_var;
        }
    }
    var prepareCodeBody = [];
    if (destpaths.length) {
        var stringifiedpaths = destpaths.length === 1 ? JSON.stringify(destpaths[0]) : JSON.stringify(destpaths);
        if (globalsmap.go) {
            prepareCodeBody = scanner2(`go.prepare(${stringifiedpaths});`);
        }
        else if (globalsmap.zimoli) {
            prepareCodeBody = scanner2(`zimoli.prepare(${stringifiedpaths});`);
        }
        else if (globalsmap.popup) {
            prepareCodeBody = scanner2(`popup.prepare(${stringifiedpaths});`);
        }
        else if (globalsmap.state) {
            prepareCodeBody = scanner2(`state.prepare(${stringifiedpaths});`);
        }
        else if (!declares.prepare) {
            globalsmap.prepare = "prepare";
            prepareCodeBody = scanner2(`prepare(${stringifiedpaths});`);
        }
        else {
            console.warn(i18n`将不处理此文件的页面自动预载<gray>${fullpath}</gray>`);
        }
    }
    var code_body = code;
    if (!undeclares.exports && !code.return && code.isExpressQueue()) {
        //如果整个函数只有一个表达式或一个变量，直接反回其本身
        while (code_body.length && (code_body[code_body.length - 1].type === SPACE || code_body[code_body.length - 1].type === code_body.STAMP && /[,;]/.test(code_body[code_body.length - 1].text))) {
            code_body.pop();
        }
        if (!code_body.length && code_body.exportEmpty) {
            code_body = scanner2(`return {}`);
        }
        code.forEach(c => c.isExpress = true);
        if (hasless) code_body.unshift(
            { type: EXPRESS, text: cless_var },
            code.relink(Object.assign(
                code_body.splice(0, code_body.length).concat(
                    { type: STAMP, text: ',' },
                    {
                        type: QUOTED,
                        text: JSON.stringify(lessdata),
                    },
                    { type: STAMP, text: ',' },
                    {
                        type: QUOTED,
                        text: JSON.stringify(className)
                    }
                ), { type: SCOPED, isExpress: true, entry: "(", leave: ")" }))
        ), code_body.first = code_body[0];

        code_body.splice(
            code_body.indexOf(code_body.first), 0,
            { type: STRAP, text: "return", transive: true }
        );
        code.relink();

    } else a: {
        if (undeclares.module) {
            commName = `module["exports"]`;
        } else if (undeclares.exports) {
            commName = "exports";
        }
        if (hasless && code.return) {
            var less = scanner2(`var &cless=${strings.encode(lessdata)};`);
            code_body.unshift(...less);
            lessdata = '&cless';
            var lessused = less;
            declares[lessdata] = lessdata;
            allVariables['&cless'] = less.used['&cless'];
            for (var r of code.return) {
                lessnode = {
                    type: EXPRESS,
                    text: lessdata,
                };
                allVariables["&cless"].push(lessnode);
                var n = wrapReturnLess(r, cless_var, lessnode, className);
                if (!n || n === code.last) break a;
            }
            lessnode = {
                type: EXPRESS,
                text: lessdata,
            };
            allVariables["&cless"].push(lessnode);
        }
        if (commName) {
            var lessnode = null;
            if (hasless) {
                lessdata = strings.encode(lessdata);
            }
            code_body.push(
                { type: SPACE, text: "\r\n" },
                { type: STRAP, text: "return", transive: true }
            )
            code_body.push({ type: EXPRESS, text: commName }, { type: STAMP, text: '=' });
            if (hasless) {
                code_body.push(
                    { type: code_body.EXPRESS, text: cless_var },
                    code.relink(Object.assign([
                        { type: EXPRESS, text: commName },
                        { type: STAMP, text: ',' },
                        lessnode || { type: QUOTED, text: lessdata },
                        { type: STAMP, text: ',' },
                        { type: QUOTED, text: JSON.stringify(className) },
                    ], {
                        entry: "(",
                        isExpress: true,
                        type: SCOPED,
                        leave: ")"
                    })),
                )
            } else {
                code_body.push({ type: code_body.EXPRESS, text: commName });
            }
            code.relink(code_body);
        }
    }
    if (templateName) {
        var template = scanner2(`var ${templateName}=${htmlData};\r\n`, fullpath, "js");
        if (this && this["#"]) {
            translate(this["#"], template);
        }
        var { envs, vars, used } = template;
        Object.assign(declares, vars);
        for (var k in vars) {
            delete undeclares[k];
        }
        for (var k in envs) {
            if (k in declares);
            else {
                undeclares[k] = true;
            }
        }
        for (var k in used) {
            if (!allVariables[k]) allVariables[k] = [];
            for (var u of used[k]) {
                allVariables[k].unshift(u);
            }
        }
        for (var k in declares) {
            if (!allVariables[k]) allVariables[k] = used[k];
        }
        code_body.unshift.apply(code_body, template);
    }
    code_body.unshift.apply(code_body, prepareCodeBody);
    if (breakflag === false);
    else if (!islive || commbuilder.compress === false) {
        code.relink();
        if (memery.BREAK) code.break();
        if (!memery.UPLEVEL) {
            if (!memery.BREAK) code.detour(false);
            code = downLevel.code(code);
            isBroken = true;
        }
        var {
            vars: declares,
            used: allVariables,
            envs: undeclares
        } = code;
        code_body = code;
    }
    else if (memery.ported && memery.MSIE) {
        code.relink();
        code.detour();
        code = downLevel.code(code);
        isBroken = true;
        var {
            vars: declares,
            used: allVariables,
            envs: undeclares
        } = code;
        code_body = code;
    }
    if (undeclares.require) var required = allVariables.require;
    var globals = Object.keys(undeclares);
    globals.forEach(g => globalsmap[g] = g);
    globals = Object.keys(globalsmap);
    if (required instanceof Array) required = required.map(({ next: c }, cx) => {
        if (!c || c.type !== SCOPED || c.entry !== "(") return;
        var r = c.first;
        var rn = r.next;
        if (rn && (rn.type !== STAMP || rn.text !== ',')) return;
        if (r.type !== QUOTED || r.length || r.text[0] === '/') return;
        var text = strings.decode(r.text);
        if (r === c.last) {
            var text1 = text.replace(/[\?#][\s\S]*$/, "");
            if (text1 !== text) {
                r.text = strings.encode(text1);
                insertAfter(r,
                    { type: STAMP, text: ',' },
                    {
                        type: QUOTED,
                        text: strings.encode(text.slice(text1.length))
                    });
                text = text1;
            }
        }
        r.value = text.replace(/[\\]+/g, '/');
        return r;
    }).filter(a => !!a);
    var params = globals.map(g => globalsmap[g]);
    if (this && this["?"]) {
        globals = rethink(this, globals, filename, fullpath);
        if (required instanceof Array) {
            var required_paths = required.map(r => r.value);
            required_paths = rethink(this, required_paths, filename, fullpath);
            required.forEach((r, i) => {
                var p = required_paths[i];
                r.value = p;
                r.text = strings.encode(p);
            });
        }
    }
    var required_map = {}, required_paths = [];
    if (required instanceof Array) required.forEach((r, i) => {
        if (!required_map[r.value]) {
            required_map[r.value] = required_paths.length;
            required_paths.push(r.value);
        }
        if (commbuilder.compress !== false) {
            r.value = required_map[r.value];
            r.text = String(r.value);
            r.type = VALUE;
            r.isdigit = true;
        }
    });
    code_body.helpcode = memery.HELPCODE;
    data = code_body.toString();
    return {
        imported: globals,
        required: required_paths,
        occurs: code.occurs,
        data,
        isAsync,
        typeofs,
        isYield,
        isBroken,
        prequoted,
        params
    };
};

var buildPress2 = function (imported, params, data, args, strs, press) {
    press = press !== false && memery.COMPRESS;
    if (imported.length > 0) {
        var code = scanner2(`var [${params.concat(args || [])}];${data}`);
        if (press) code.press(memery.KEEPSPACE, press);
        else code.revar();
        params = code[1].filter(a => a.type !== code.STAMP).map(c => c.text);
        code.splice(0, 2);
    }
    else if (args.length > 0) {
        strs = eval(strs);
        var code = scanner2(`var ${args.map((a, i) => {
            var s = strs[i];
            if (typeof s === 'string') s = strings.encode(s);
            else if (s instanceof RegExp) s = `/${s.source}/${s.flags}`;
            return `${a}=${s}`;
        }).join(',')};${data}`);
        if (press) code.press(memery.KEEPSPACE, press);
        else code.revar();
    }
    else {
        var code = scanner2(data);
        if (press) code.press(memery.KEEPSPACE, press);
        else code.revar();
    }
    data = code.toString();
    return [params, data];
};
var rethink = function (mmap, imported, filename, fullpath) {
    var rmap = mmap["?"];
    var fmap = mmap[":"];
    var refname = fmap[fullpath] || '';
    var refpath = refname ? $split(refname) : $split(filename);
    var realimport = imported.map(m => {
        var a = getMaped(refpath, mmap, m);
        if (a !== fullpath) m = rmap[a] || m;
        return m;
    });
    return realimport;
};
var revarCode = function (params, data) {
    var code = scanner2(`var [${params}];${data}`);
    code.revar();
    params = code[1].filter(a => a.type !== code.STAMP).map(c => c.text);
    code.splice(0, 3);
    data = code.toString();
    return [params, data, code.occurs];
};
var buildResponse = function ({ imported, prequoted, params, data, required, occurs, isAsync, isYield, isBroken }, compress) {
    if (!islive && compress !== false) {
        if (memery.BREAK) var [data, args, strs] = breakcode(data, occurs), strs = `[${strs}]`;
        else args = [], strs = "[]";
        [params, data] = buildPress2(imported, params, data, args, strs);
        if (imported.length > 0) {
            var strlength = (strs.length * 2).toString(36);
        } else {
            strs = '';
        }
    }
    else {
        if (params.length > 0) {
            for (var p in occurs) if (/^[@#%\^&\?\\]/.test(p)) {
                [params, data, occurs] = revarCode(params, data);
                break;
            }

        }
        strs = '';
    }
    var _arguments = [...imported, ...params];
    if (required.length >= 1) {
        _arguments.push(required.join(';'));
    }
    _arguments = _arguments.join(',');
    var length = (_arguments.length << 1).toString(36);
    if (length.length === 1) {
        length = "00" + length;
    } else if (length.length === 2) {
        length = "0" + length;
    }
    if (prequoted) {
        data = prequoted.map(a => a.text).join('') + data;
    }
    if (!isBroken) {
        if (isYield) data = "*" + data;
        if (isAsync) data = "~" + data;
    }
    // [参数长度*2 参数列表]? [字符串列表长度*2 字符串数组]? 代码块
    data = (_arguments.length ? length + _arguments : "") + (strs && strs.length > 2 && imported.length > 0 ? strlength + strs : '') + (parseInt(data.slice(0, 3), 36) % 2 === 0 || /^\w{1,6}\[/.test(data) && parseInt(data.slice(0, 6), 36) % 2 === 0 ? ";" : "") + data;
    data = Buffer.from(data);
    data.occurs = occurs;
    data.isAsync = isAsync;
    data.isYield = isYield;
    data.isBroken = isBroken;
    return data;
};
var getFileData = function (fullpath) {
    return new Promise(function (ok, oh) {
        if (!fs.existsSync(fullpath)) return ok(null);
        fs.stat(fullpath, function (error, stat) {
            if (error) return oh(error);
            if (!stat.isFile()) return ok(null);
            fs.readFile(fullpath, function (error, buffer) {
                if (error) return oh(error);
                ok(buffer);
            });
        });
    });
};
var renderImageUrl = function (data, filepath, watchurls) {
    var urlReg = [
        /\b(?:efront\-|data\-)?(?:src|ur[il])\s*\(\s*(['"`]|)([^,;\('"`\r\n\u2028\u2029]*?)\1\s*\)/ig,
        /\b(?:efront\-|data\-)?(?:src|ur[il])\s*\=\s*(['"`]|)([^,;\('"`\r\n\u2028\u2029\s]*?)\1/ig,
    ];
    var comsroot = this && this["/"] || [];
    var replacer = function (data, realpath, match) {
        var mime = require("../server/mime")[path.extname(realpath).slice(1)];
        var compath = inCom(realpath, comsroot);
        var pagepath = inPage(realpath);
        if (!mime || !compath && !pagepath) return match;
        var timer = new Timer;
        if (pagepath) {
            data = pagepath.replace(/\\/g, '/');
        } else {
            data = `data:${mime};base64,` + Buffer.from(data).toString("base64");
            if (data.length > 8 * 1024) {// chrome,firefox的长度限制均为9929
                if (islive || commbuilder.compress === false) {
                    data = ":comm/" + compath.replace(/\\/g, '/');
                } else {
                    data = "data" + path.extname(realpath) + data.slice(4);
                }
            }
        }
        var quote = match[match.length - 1];
        watchurls.time += +timer;
        if (quote === ')') {
            return `url(${data})`;
        }
        return `src=${quote}${data}${quote}`;
    };
    return bindLoadings(urlReg, data, filepath, replacer, false);
};
var renderLessData = function (data, lesspath, commName, watchurls, className) {
    if (data.length > 0x1000) show_building(lesspath);
    data = data || '';
    var that = this;
    var importLessReg = /^\s*@(?:import)\s*(['"`]?)(.*?)\1(\s*;)?\s*$/im;
    var replacer = function (data, realpath) {
        if (watchurls.indexOf(realpath) < 0) {
            watchurls.push(realpath);
        }
        return renderImageUrl.call(that, data, realpath, watchurls);
    };
    data = renderImageUrl.call(that, data, lesspath, watchurls);
    var lessresult = Promise.resolve(data).then(data => bindLoadings.call(this, importLessReg, data, lesspath, replacer, 0));
    if (watchurls.indexOf(lesspath) < 0) watchurls.push(lesspath);
    if (/\.less$/i.test(this[commName]) && this[commName] !== lesspath) {
        var configpath = this[commName];
        if (watchurls.indexOf(configpath) < 0) watchurls.push(configpath);
        var lessresult = Promise.all([lessresult, getFileData(configpath)])
            .then(async function ([origin, config]) {
                config = await bindLoadings(importLessReg, config, configpath, commName, replacer, 0);
                return origin + "\r\n" + config;
            })
    }

    return Promise.resolve(lessresult)
        .then(function (lessdata) {
            var timeStart = new Date;
            var lessData = compile$素馨(lessdata, "." + className);
            watchurls.time += new Date - timeStart;
            return lessData;
        }).then(function (lessData) {
            var timeStart = new Date;
            var keyframeMap = {};
            var hasOwnProperty = keyframeMap.hasOwnProperty;

            var kprefix = className.replace(/\-$/, '') + "-";
            lessData = lessData.replace(/@keyframes\s+([^\(\)\{\}\s]+)/ig, function (_, a) {
                a = keyframeMap[a] = kprefix + a;
                return "@keyframes " + a;
            }).replace(/\{([^\{\}]+)\}/g, function (_, c) {
                var o = parseKV(c, ';', ":");
                if (o["user-select"]) o["-webkit-user-select"] = o["user-select"];
                if (o.animation) {
                    o.animation = o.animation.split(/\s+/).map(a => hasOwnProperty.call(keyframeMap, a) ? keyframeMap[a] : a).join(' ');
                }
                return `{${serialize(o, ';', ':')}}`;
            })
            watchurls.time += new Date - timeStart;
            return lessData;
        });
};

function prepare(filename, fullpath) {
    var commName = fullpath.match(/(?:^|[\\\/\[\]\(\)\{\}])([#@%&\?\^\:\$\-_\w\u3000-\uffff][\-\w\u3000-\uffff]*?)(\.[^\.]*)?$/i);
    if (!commName && !/^\.js$/i.test(filename)) console.warn(i18n`文件名无法生成导出变量！`, fullpath, filename);
    commName = commName && commName[1];
    var className = filename.replace(/[\\\/\:\.]+/g, "-");
    if (!/\-/.test(className)) className += "- " + className;
    var shortName = className.replace(/^.*?([^\-\s]*)$/g, "$1");
    var lessName = /\s/.test(className) ? className.split(/\s+/)[0] : className;
    if (shortName !== className) className = className + " " + shortName;
    return [commName, lessName, className];
}
var getValidName = function (prefix, used) {
    var id = 1;
    while (prefix in used) {
        prefix = prefix.replace(/\d+$/, '') + id;
        id++;
    }
    return prefix;
}
var Timer = require("../basic/Timer");
const { isDeclareOnly } = require("../compile/common");
async function getXhtPromise(xhtdata, filename, fullpath, watchurls, extraJs, extraCss) {
    var timer = new Timer;
    var [commName, lessName, className] = prepare(filename, fullpath);
    var allnames = Object.create(null);
    xhtdata = xhtdata ? String(xhtdata) : '';
    if (xhtdata) {
        var xht = scanner2(xhtdata, fullpath, 'html');
        var scoped = xht.scoped;
        var { scripts, innerHTML: htmltext, attributes, tagName, styles } = scoped;
        if (extraJs) scripts = scripts.concat(extraJs);
        if (extraCss) styles = styles.concat(extraCss);
        styles = styles.join('\r\n');
        scripts = scripts.join("\r\n");
        for (var k in scoped.used) allnames[k] = true;
    }
    else {
        var scripts = '';
        var htmltext = '';
        var styles = extraCss || '';
        var scripts = extraJs || '';
    }
    timer.pause();
    if (scripts) scripts = await loadUseBody.call(this, scripts, fullpath, watchurls);
    timer.resume();
    var jscode = scanner2(scripts, fullpath, 'js');
    jscode.fix();
    var jscope = jscode.scoped
    timer.pause();
    if (styles) styles = await renderLessData.call(this, styles, fullpath, commName, watchurls, lessName);
    timer.resume();
    var jsvars = jscope.vars;
    var jsenvs = jscope.envs;
    var entryTack = getEntryName(jsenvs, commName);
    if (jsenvs.template) entryTack = 'template';
    if (!xhtdata || entryTack || !htmltext && !scoped.outerHTML) {
        if (xhtdata) htmltext = `{toString:()=>${compile$wraphtml(await renderImageUrl.call(this, scoped.outerHTML || scoped.innerHTML, fullpath, watchurls))}}`;
        var res = loadJsBody.call(this, scripts, filename, fullpath, styles, commName, className, htmltext);
        watchurls.time += +timer;
        return res;
    }
    Object.assign(allnames, jscope.envs);
    var xhtmain = getValidName(`xht`, allnames);
    timer.pause();
    htmltext = await renderImageUrl.call(this, htmltext, fullpath, watchurls);
    timer.resume();
    htmltext = compile$wraphtml(htmltext);
    var jsused = jscope.used;
    var async = jscope.async ? 'async ' : '';
    var xused = scoped.used;
    if (scoped.envs.event) {
        if (!jscope.vars.event && !scoped.vars.event) {
            delete scoped.envs.event;
        }
    }
    var scope = Object.keys(Object.assign({}, scoped.vars, scoped.envs)).filter(e => e in this || e in jsused || e in xused && xused[e].length > 0);
    if (scope.length) {
        var htcode = scanner2(htmltext);
        var jsvars = Object.assign({}, jscope.vars, scoped.vars);
        var jsenvs = jscope.envs;
        for (var k in jsvars) if (k in jsenvs) delete jsenvs[k];
        var { scoped } = jscode;
        var prefunc = require('../compile/prefunc');
        var unvar = function (o) {
            if (o.type !== STRAP || !/^(var|const|let)$/.test(o.text)) return;
            var n = o.next;
            if (n && n.type === SCOPED) {
                if (n.entry === '{') {
                    o.text = "0,";
                    o.type = COMMENT;
                }
                else {
                    var p = o.prev;
                    if (p && p.type === STAMP && p.text === ';') {
                        o.text = `/*${o.text}*/`;
                        o.type = COMMENT
                    }
                    else {
                        o.text = ';';
                        o.type = STAMP;
                    }
                }
            }
            else {
                o.text = `/*${o.text}*/`;
                o.type = COMMENT;
            }
        };
        prefunc(jscode);
        jscode.forEach(unvar);
        scoped.forEach(s => {
            if (s.isfunc) return;
            if (s.body) {
                prefunc(s.body);
                s.body.forEach(unvar)
            }
        });
        var htmlchanged = false;
        var uscope = [];
        var pushu = function (u1, u2, k) {
            if (u1) for (var a of u1) {
                if (isDeclareOnly(a)) {
                    uscope.push(k);
                    return;
                }
            }
            if (u2) for (var a of u2) {
                if (isDeclareOnly(a)) {
                    uscope.push(k);
                    return;
                }
            }
        }
        var cscope = scope.filter(k => {
            if (!jsvars[k]) return true;
            delete jsvars[k];
            delete jscope[k];
            var ju = jscode.used[k];
            var hu = htcode.used[k];
            pushu(ju, hu, k + ":undefined");
            if (ju) {
                compile$patchlist(xhtmain + ".", ju);
            }
            if (hu) {
                htmlchanged = true;
                compile$patchlist(xhtmain + '.', hu);
            }
        }).concat(uscope);
        if (htmlchanged) htmltext = htcode.toString();
        scope = `var ${Object.keys(jsvars).concat(xhtmain).join(',')}={${cscope.join(",")}};`;
        scripts = jscode.toString();
    }
    if (attributes) attributes = attributes.map(a => `elem.setAttribute("${a.name}",${a.value ? strings.recode(a.value) : '""'})`).join("\r\n");
    else attributes = '';
    var createElement = 'document.createElement(';
    switch ((tagName || commName).toLowerCase()) {
        case "svg":
            createElement = 'document.createElementNS("http://www.w3.org/2000/svg",';
            break;
        case "math":
            createElement = 'document.createElementNS("http://www.w3.org/1998/Math/MathML",';
            break;
        default:
            createElement = 'document.createElement(';
    }
    if (htmltext !== '``' || attributes || tagName && jsvars[tagName] || commName && jsvars[commName]) {
        var xhtrender = `elem.innerHTML=template;render(elem,scope);`;
        xhtrender = async
            ? `${xhtmain}.apply(elem,arguments).then(function([template,scope]){${xhtrender}})`
            : `var [template,scope]=${xhtmain}.apply(elem,arguments);${xhtrender}`;
    }
    else xhtrender = `${xhtmain}.apply(elem,arguments)`;
    var entryName = commName.replace(/\-(\w)/g, (_, a) => a.toUpperCase());
    var createElement = `var elem = arguments[0];
    if(!isElement(elem)) elem = ${createElement}"${tagName || commName}");
    if(!elem.$constructors)elem.$constructors=[${xhtmain}];
    else if(elem.$constructors.indexOf(${xhtmain})>=0)return elem;
    else elem.$constructors.push(${xhtmain});`;
    var xht = scope ? `
    var ${xhtmain}=${async}function(){
    ${scope}
    ${scripts}
    return [${htmltext},${xhtmain}];
    };
    function ${entryName}(){
    ${createElement}
    ${attributes}
    ${xhtrender}
    return elem;
    }`: `
    var ${xhtmain}=${async}function(){
    ${scripts}
    return ${htmltext};
    }
    function ${entryName}(){
    ${createElement}
    ${attributes}
    ${xhtrender}
    return elem;
    }`;
    var res = loadJsBody.call(this, xht, filename, fullpath, styles, commName, className)
    watchurls.time += +timer;
    return res;
}

function getMouePromise(data, filename, fullpath, watchurls) {
    var [commName, lessName, className] = prepare(filename, fullpath);
    var time = 0;

    var jsData = '', htmlData = '', lessData = '';
    // js中可能出现一些特殊字符，这里优先匹配
    data = data.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/i, function (_, script) {
        jsData = script + `;\r\nif(exports)exports=extendIfNeeded(exports["default"]||exports,exports,{call:moue$call,apply:moue$apply});exports["default"]=exports`;
        return '';
    });
    data = data.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, function (_, style) {
        lessData += style;
        return '';
    });
    data = data.replace(/<([^\s>]+)([^>]*)>([\s\S]*)<\/\1>/i, function (_, tagName, attr, template) {
        if (tagName.toLowerCase() !== 'template') {
            htmlData += _;
        }
        else if (/\bv\-if\b/i.test(attr)) {
            htmlData += _;
        }
        else {
            htmlData += template;
        }
        return '';
    });
    if (!/^[\s]*$/i.test(data)) {
        data = data.trim();
        console.warn(i18n`文件中存在冗余数据<gray>${fullpath}</gray>:<data>${data.length > 12 ? data.slice(0, 10) + '...' : data}</data>`);
    }
    var promise = new Promise((ok, oh) => {
        function fire() {
            var timeStart = new Date;
            if (htmlData) {
                jsData = `var template=${compile$wraphtml(htmlData)};\r\n` + jsData;
                if (lessData) {
                    jsData += `;\r\ntemplate=cless(template,\`${lessData}\`,"${className}")`;
                }
                jsData += `;\r\nextend(exports,Vue.compile(template))`;
            }
            var data = loadJsBody.call(this, jsData, filename, fullpath, null, commName);
            time += new Date - timeStart;
            promise.time = time;
            ok(data);
        }
        if (htmlData) {
            var htmlpromise = renderImageUrl.call(this, htmlData, fullpath, watchurls).then(function (a) {
                htmlData = a;
            });
        }
        if (lessData) {
            var lesspromise = renderLessData.call(this, lessData, fullpath, commName, watchurls, lessName).then(data => {
                lessData = data;
                time += lesspromise.time;
            });

        }
        Promise.all([htmlpromise, lesspromise]).then(fire, oh);
    });
    return promise;
}

function getHtmlPromise(data, filename, fullpath, watchurls) {
    var [commName, lessName, className] = prepare(filename, fullpath);
    let lesspath = fullpath.replace(/\.html?$/i, ".less");
    var jsData = "`" + data.replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&") + "`";
    var lessData;
    var time = 0;
    var promise = getFileData(lesspath).then((lessdata) => {
        if (lessdata instanceof Buffer) {
            var lessPromise = renderLessData.call(this, lessdata, lesspath, commName, watchurls, lessName);
            return lessPromise.then(data => {
                lessData = data;
                time += lessPromise.time;
            });
        }
    }).then(() => {
        var timeStart = new Date;
        var data = loadJsBody.call(this, jsData, filename, fullpath, lessData, commName, className);
        time += new Date - timeStart;
        promise.time = time;
        return data;
    });
    return promise;
}

function getScriptPromise(data, filename, fullpath, watchurls) {
    var htmlpath = fullpath.replace(/\.\w+$/i, ".html");
    var lesspath = fullpath.replace(/\.\w+$/i, ".less");
    watchurls.push(htmlpath);
    watchurls.push(lesspath);
    var that = this;
    var p = Promise.all([lesspath, htmlpath].map(getFileData)).then(async ([lessdata, htmldata]) => {
        if (lessdata || htmldata) return getXhtPromise.call(that, htmldata, filename, fullpath, watchurls, data, lessdata)
        data = await loadUseBody.call(that, data, fullpath, watchurls);
        var timer = new Timer;
        var [commName] = prepare(filename, fullpath);
        if (!/\.[mc]?js$/i.test(fullpath)) data = await coffee(fullpath, data);
        data = loadJsBody.call(that, data, filename, fullpath, null, commName);
        p.time = +timer;
        return data;
    });
    return p;
}
function commbuilder(buffer, filename, fullpath, watchurls) {
    showMemery();
    filename = String(filename || '');
    fullpath = String(fullpath || "");
    var compress = commbuilder.compress;
    var data = String(buffer), promise;
    watchurls.time = 0;
    if (/\.xht$/i.test(fullpath)) {
        promise = getXhtPromise.call(this, buffer, filename, fullpath, watchurls);
    }
    else if (/\.json$/i.test(fullpath)) {
        var timeStart = new Date;
        var data = loadJsBody("(" + String(buffer) + ")", filename, fullpath);
        data.time = new Date - timeStart;
        promise = Promise.resolve(data);
    }
    else if (/\.ya?ml$/i.test(fullpath)) {
        var timeStart = new Date;
        var data = loadJsBody(`return ${JSON.stringify(parseYML(String(buffer)))}`, filename, fullpath);
        data.time = new Date - timeStart;
        promise = Promise.resolve(data);
    }
    else if (/\.html?$/i.test(fullpath)) {
        if (/^(\s*<!--[\s\S]*?--!?>)*\s*<!Doctype\b/i.test(data)) {
            return data;
        }
        promise = getHtmlPromise.call(this, data, filename, fullpath, watchurls);
    } else if (/\.vuex?$/i.test(fullpath)) {
        promise = getMouePromise.call(this, data, filename, fullpath, watchurls);
    } else if (/\.(?:[cm]?[jt]sx?)$/i.test(fullpath) || !/[\\\/]/i.test(fullpath)) {
        if (commbuilder.loadonly) return loadUseBody.call(this, data, fullpath, watchurls);
        promise = getScriptPromise.call(this, data, filename, fullpath, watchurls);
    } else {
        data = buffer;
        var extname = path.extname(fullpath);
        if (extname) buffer.mime = require("../server/mime")[extname.slice(1)];
    }
    if (promise) {
        var promise1 = promise.then((data) => {
            if (commbuilder.typeofMap && data.typeofs.length) {
                commbuilder.typeofMap[fullpath] = data.typeofs;
            }
            var timeStart = new Date;
            if (this && this[""]) {
                var codes = [];
                backEach(data.imported, (m, i, imported) => {
                    if (m === "__dirname" || m === "__filename") {
                        codes.push(m);
                        imported.splice(i, 1);
                        data.params.splice(i, 1);
                    }
                });
                if (codes.length) {
                    var filename = fullpath;
                    codes = codes.map(c => {
                        if (c === "__filename") {
                            return `${c}=${strings.encode(filename)}`;
                        }
                        return `${c}=${strings.encode(filename.replace(/[^\\\/]+$/, ''))}`;
                    });
                    data.data = "var " + codes.join(",") + ";\r\n" + data.data;
                }
            }
            data = buildResponse(data, compress);
            data.path = fullpath;
            data.time = new Date - timeStart + (watchurls.time || 0) + (promise.time || 0);
            clear_console();
            showMemery();
            return data;
        });
    }
    return promise1 || data;
}
commbuilder.parse = function (data, filename = 'main', fullpath = './main.js', compress, breakcode = 0) {
    data = String(data);
    var savedflag = breakflag;
    breakflag = !!breakcode;
    var savedCompress = commbuilder.compress;
    commbuilder.compress = !!compress;
    var [commName, lessName, className] = prepare(filename, fullpath);
    if (/\.(?:pem|html?|xml|glsl|txt|log)$/i.test(fullpath)) data = `return ${strings.encode(data)}`;
    else if (/\.(?:json)$/i.test(fullpath)) data = `var ${commName} = ` + data;
    else if (/\.[mc]?[tj]sx?$/i.test(fullpath)) data = replaceIncludes(data);
    var res = loadJsBody.call(this, data, filename, fullpath, null, commName, lessName, className);
    if (breakcode || breakcode === 0) [res.params, res.data, res.occurs] = revarCode(res.params, res.data);
    if (savedCompress === undefined) delete commbuilder.compress;
    else commbuilder.compress = savedCompress;
    breakflag = savedflag;
    return res;
};
commbuilder.break = function (data, filename, fullpath, compress) {
    var parsed = commbuilder.parse(data, filename, fullpath, compress, true);
    var { imported, params, data, required, occurs, isAsync, isYield, isBroken } = parsed;
    var [data, res, val] = breakcode(data, occurs);
    return [data, res, val, isAsync, isYield, isBroken];
}
module.exports = commbuilder;