"use strict";
var queue = require("../basic/queue");
var require2 = require("./require2");
var builder;
var path = require("path");
var memery = require("./memery");
var liveload = () => `function () {
    var reloadCount = 0;
    var reload = function () {
        if (reloadCount > 72) return;
        reloadCount++;
        var xhr = new XMLHttpRequest;
        xhr.open("options", "/:live-${require("../server/liveload").version}");
        xhr.timeout = 0;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.responseText.indexOf("你的唯一") >= 0) location.reload(true) | console.warn("我就是你的唯一..", new Date);
                else setTimeout(reload, reloadCount * 200);
            }
        };
        xhr.onerror = function () {
            if (xhr.readyState !== 4) setTimeout(reload, 200 * reloadCount);
        };
        xhr.send();
    };
    reload();
}`;
var efronthook = `function (body, window) {
    var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            new Function(xhr.responseText).call(window);
            console.log("%cefront%c live", 'color:#360', 'color:333');
        }
    };
    xhr.open('POST', 'comm/main');
    xhr.send("step into my sight..");
}.call(this, document.documentElement.children[0], this)`;
var pixelDecoder = d => d / 16 + "rem";
if (memery.TRANSFORM_PIXEL) {
    var fixpixel = function (buff) {
        var renderPixelRatio = .75;
        return String(buff).replace(/(\:\s*)?((?:\d*\.)?\d+)px(\s*\))?/ig, (m, h, d, quote) => (h || "") + (d !== '1' ? h && quote ? renderPixelRatio * d + "pt" : pixelDecoder(d) : renderPixelRatio > 1 ? ".75pt" : 0.75 / devicePixelRatio + "pt") + (quote || ""));
    };

} else {
    var fixpixel = e => String(e);
}
var seek = function (keeys, o) {
    var cx = 0;
    for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        if (o === null || o === undefined) return '';
        var key = keeys[cx];
        o = o[key];
    }
    if (o === undefined) return '';
    return o;
};
var createseek = function (content) {
    var keys = String(content || '').trim().split('.').map(a => a.trim());
    var res = seek.bind(null, keys);
    return res;
};
var buildjsp = function (buff, realpath) {
    var splited = [];
    var lastIndex = 0;
    var input = String(buff);
    var prebuilds = {
        __dirname: path.dirname(realpath),
        __filename: realpath,
        __efront: {
            toString() {
                return this.path;
            },
            path: path.join(__dirname, '../..'),
            version: require(path.join(__dirname, "../../package.json")).version
        },
        req: null, res: null, request: null, response: null, context: null,
        remoteAddress: null, textplain: null, forbidden: null,
        clients: require("../server/clients")
    };
    //////////////////------------//////////////////////////////////////////////////////////////////////--------//////////////////////////////
    // // ///////////1/////////////11//2////////22/////////////2/2//////////////2/////////////////////11////////////////2////////2/////////1//
    input.replace(/\<([%\?]|script)(?:(?<=%)|(?:(?<=[\?])(?:php|jsp|asp))|(?<=\<script)[^\>]*?serverside[^\>]*\>)([\s\S]*?)(?:\<\/(?=script)\1\>|\1\>)/gi, function (match, split, content, index, input) {
        var str = input.slice(lastIndex, index), func;
        lastIndex = index + match.length;
        if (/^(?:\=|\return\s|)\s*[^[$_a-zA-Z]\w*(\s*\.\s*[$_a-zA-Z]\w*)*\s*$/.test(content)) {
            func = createseek(content);
        } else {
            func = require2.createFunction(content, realpath, prebuilds);
        }
        splited.push(str, func);
        return match;
    });
    if (lastIndex < input.length - 1) splited.push(input.slice(lastIndex, input.length));
    return function (req, res) {
        var context = {};
        context.context = context;
        Object.assign(prebuilds, {
            req: req,
            request: req,
            res: res,
            response: res,
            context,
            textplain(e) {
                res.writeHead(200, {
                    "Content-type": "text/plain;charset=utf-8"
                });
                res.write(String(e));
            },
            forbidden(e) {
                res.writeHead(403, {
                    "Content-type": "text/html;charset=utf-8"
                });
                res.write(String(e));
            }
        });
        try {
            prebuilds.remoteAddress = require("../server/remoteAddress")(req);
        } catch (e) {
            return prebuilds.forbidden(e);
        }
        return queue.call(splited, function (str) {
            if (str instanceof Function) {
                var noimport = !str.imported;
                if (noimport) str.imported = [prebuilds.context];
                var res = require2.invokeFunction(str, prebuilds.context);
                if (noimport) delete str.imported;
                return res;
            }
            return str;
        }).then(function (array) {
            var data = Buffer.from(array.join(''));
            data.mime = "text/html;charset=utf-8";
            return data;
        });
    };
};
var buildreload = function (buff) {
    var data = String(buff).replace(/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i, `<script>\r\n-${efronthook.toString()};\r\n`)
        .replace(/(<\/head)/i, `\r\n<script async>\r\n-${liveload()}();\r\n</script>\r\n$1`);
    buff = Buffer.from(data);
    return buff;
};
var str2array = require("./str2array");
var indexreg = new RegExp(`(${str2array(memery.INDEX_NAME).join('|')})\\.[^\/\\\.]+$`);
if (memery.islive) builder = function (buff, name, fullpath) {
    var dev = buff;
    if (/\.(?:jsp|php|asp)$/i.test(fullpath)) {
        dev = function (req, res) {
            var data = fixpixel(buff);
            data = buildreload(data);
            data = buildjsp(data, fullpath)(req, res);
            return data;
        };
    }

    else if (indexreg.test(fullpath) || /\.html?$/i.test(fullpath) && /^\s*<!Doctype/i.test(buff.slice(0, 100).toString())) {
        dev = function () {
            var data = fixpixel(buff);
            data = buildreload(data);
            data.mime = dev.mime || 'text/html;charset=utf-8';
            return data;
        };
    }
    return dev;
};

else builder = function (buff, name, fullpath) {
    if (/\.(?:jsp|php|asp)$/i.test(fullpath)) {
        buff = fixpixel(buff);
        buff = buildjsp(buff, fullpath);
    }
    return buff;
};

module.exports = builder;