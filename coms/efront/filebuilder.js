"use strict";
var isDevelop = require("./isDevelop");
var queue = require("../basic/queue");
var require2 = require("./require2");
var builder;
var path = require("path");
var memery = require("./memery");
var autoloader = `function () {
    var reloadCount = 0;
    var reload = function () {
        if (reloadCount > 10) return;
        reloadCount++;
        var xhr = new XMLHttpRequest;
        xhr.open("post", "/reload");
        xhr.timeout = 0;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) location.reload() | console.warn("reload..", new Date);
        };
        xhr.onerror = reload;
        xhr.send("haha");
    };
    reload();
}`;
var efronthook = `function (body, window) {
    var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            new Function(xhr.responseText).call(window);
            console.log("%cefront%c start", 'color:#6c2', 'color:333');
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
    var prebuilds = { req: null, res: null, request: null, response: null, context: null };
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
        Object.assign(prebuilds, {
            req: req,
            request: req,
            res: res,
            response: res,
            remoteAddress: require("../server/remoteAddress")(req),
            context: {}
        });
        return queue.call(splited, function (str) {
            if (str instanceof Function) {
                if (!str.imported) str.imported = [prebuilds.context];
                return require2.invokeFunction(str, prebuilds.context);
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
    return String(buff).replace(/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i, `<script>\r\n-${efronthook.toString()};\r\n`)
        .replace(/(<\/head)/i, `\r\n<script async>\r\n-${autoloader.toString()}();\r\n</script>\r\n$1`);
};
if (isDevelop) builder = function (buff, name, fullpath) {
    if (/\.(?:jsp|php|asp)$/i.test(fullpath)) {
        buff = fixpixel(buff);
        buff = buildreload(buff);
        buff = buildjsp(buff, fullpath);
    } else if (/\b(index|default)\.html$/i.test(fullpath) || /\.html?$/.test(fullpath) && /^\s*<!Doctype/i.test(buff.slice(0, 100).toString())) {
        buff = fixpixel(buff);
        buff = buildreload(buff);
        buff = Buffer.from(buff);
    }
    return buff;
};

else builder = function (buff, name, fullpath) {
    if (/\.(?:jsp|php|asp)$/i.test(fullpath)) {
        buff = fixpixel(buff);
        buff = buildjsp(buff, fullpath);
    }
    return buff;
};

module.exports = builder;