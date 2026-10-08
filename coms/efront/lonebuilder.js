var scanner2 = require("../compile/scanner2");
var memery = require("./memery");
var color = require("../basic/color");
var path = require("path");
var { PROPERTY, getlones } = require("../compile/common");
var noopbuilder = a => a;
var commbuilder = require("./commbuilder");
var { lonelyjs, lonelycss } = commbuilder;
var BuildInfo = build$BuildInfo;
var commap = BuildInfo.commap;
var lonebuilder = commbuilder.bind(BuildInfo.commap);
var fairJsCode = commbuilder.fair;
var Timer = require("../basic/Timer");
var toComponent = require("../build/toComponent");
var build = build$build;
var lonecssbuilder = async function (data, filename, fullpath, watchurls) {
    if (!watchurls.time) watchurls.time = 0;
    data = await lonelycss.call(this, data, filename, fullpath, watchurls);
    var timer = new Timer;
    if (memery.torgb) data = color.transform(data);
    watchurls.time += +timer;
    data = Buffer.from(data);
    data.time = watchurls.time;
    return data;
};

var lonejsbuilder = async function (data, filename, fullpath, watchurls) {
    if (commap !== BuildInfo.commap) lonebuilder = commbuilder.bind(BuildInfo.commap), commap = BuildInfo.commap;
    if (!watchurls.time) watchurls.time = 0;
    var code = scanner2(String(data), fullpath, 'js');
    if (!code.first) return data;

    var res = await lonelyjs(code, fullpath, this, watchurls);
    var time = new Timer;
    var lonely = false;

    var { envs, required } = res;
    a: {
        res.rescan();
        var lones = getlones(res);
        for (var a in envs) {
            if (!(a in lones) && a in this) break a;
        }
        if (required) for (var a of required) {
            if (!(a in lones) && a in this) break a;
        }
        lonely = true;
    }
    if (lonely) {
        fairJsCode(code, fullpath, BuildInfo.commap, {}, true);
        if (memery.COMPRESS) res.press(memery.KEEPSPACE, memery.COMPRESS);
        else res.revar();
        return res.toString();
    }
    var responseTree = Object.create(null);
    var info = BuildInfo.fromLone(filename, fullpath);
    fairJsCode(res, fullpath, BuildInfo.commap, {});
    if (memery.COMPRESS) commbuilder.press(res, res.strkeys);
    else commbuilder.revar(res);
    info.data = res;
    info.time = res.time;

    responseTree[info.url] = info;
    var loaded = Object.create(null);
    var infos = await build.getNexts(info, responseTree, loaded);
    time = +time;
    while (infos.length) {
        infos.forEach(a => a.builder = lonebuilder);
        infos = await build(infos, responseTree, loaded);
    }
    for (var k in responseTree) {
        var r = responseTree[k];
        if (r.time) time += r.time;
    }
    var res = toComponent(responseTree, true)[info.url];
    var data = res.toString();
    return data;
};
var isdyna = function (scriptNode) {
    var attributes = scriptNode.attributes;
    if (!attributes || !attributes.length) return false;
    for (var a of attributes) {
        if (a.type === PROPERTY) {
            switch (a.text.toLowerCase()) {
                case "serverside":
                    return true;
                default:
            }
        }
    }
    return false;
}
var lonehtmlbuilder = async function (data, filename, fullpath, watchurls) {
    if (!watchurls.time) watchurls.time = 0;
    var timer = new Timer;
    var hcode = scanner2(String(data), fullpath, 'html');
    var { richNodes } = hcode.scoped;
    for (var c of richNodes) {
        var innerText = c.innerText.replace(/^\s*\<!--([\s\S]*)--!?\>\s*$/, "$1").trim();
        if (!innerText) continue;
        var codetext = null;
        timer.pause();
        if (c.isScript) {
            if (!isdyna(c)) codetext = await lonejsbuilder.call(this, innerText, filename, fullpath, watchurls);
        }
        else if (c.isStyle) {
            codetext = await lonecssbuilder.call(this, innerText, "", fullpath, watchurls);
        }
        timer.resume();
        if (codetext) {
            c.splice(0, c.length);
            c.push(
                { type: hcode.COMMENT, text: memery.KEEPSPACE ? "<!--\r\n" : '<!--' },
                { type: hcode.PIECE, text: String(codetext) },
                { type: hcode.COMMENT, text: memery.KEEPSPACE ? "\r\n-->" : '-->' }
            );
        }
    }
    data = hcode.toString();
    data = Buffer.from(data);
    data.time = watchurls.time + +timer;
    return data;

};
var lonejsonbuilder = function (data) {
    var json = JSON.parse(String(data));
    return JSON.stringify(json);
};
var getlonebuilder = function (extt) {
    switch (extt.toLowerCase()) {
        case ".js":
        case ".mjs":
        case ".cjs":
        case ".ts":
            return lonejsbuilder;
        case ".css":
        case ".less":
            return lonecssbuilder;
        case ".jsp":
        case ".asp":
        case ".php":
        case ".html":
        case ".html":
        case ".htm":
            return lonehtmlbuilder;
        case ".json":
            return lonejsonbuilder;
    }
    return noopbuilder;
};
var lonebuilder = function (buff, filename, fullpath, watchurls) {
    var ext = path.extname(fullpath);
    var builder = getlonebuilder(ext);
    return builder.call(this, buff, filename, fullpath, watchurls);
};
lonebuilder.js = lonejsbuilder;
lonebuilder.html = lonehtmlbuilder;
lonebuilder.css = lonecssbuilder;
lonebuilder.json = lonejsonbuilder;
lonebuilder.get = getlonebuilder;
lonebuilder.noop = noopbuilder;
return lonebuilder;