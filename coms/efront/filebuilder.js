"use strict";
var queue = require("../basic/queue");
var require2 = require("./require2");
var builder;
var path = require("path");
var memery = require("./memery");
var fs = require("fs");
var xmlhttprequest_codetext = '';
var getXMLHttpRequest = function () {
    if (!xmlhttprequest_codetext) {
        xmlhttprequest_codetext = fs.readFileSync(path.join(__dirname, "../zimoli/XMLHttpRequest.js")).toString();
    }
    return xmlhttprequest_codetext;
}
var liveload = () => `function () {
    if(!location.reload)location.reload=function(){
        Window["this"].load(location.href);
    };
    var reloadCount = 0;
    var reload = function () {
        if (reloadCount > 72) return;
        reloadCount++;
        var xhr = new XMLHttpRequest;
        xhr.open("OPTIONS", "/:live-${require("../server/liveload").version}");
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
        window.onbeforeunload = function(){ xhr.onerror = null; xhr.abort(); };
    };
    reload();
}`;
var efronthook = `function (body, window) {
    var XMLHttpRequest = function () {${getXMLHttpRequest()}}.call(window);
    if(!window.XMLHttpRequest) window.XMLHttpRequest = XMLHttpRequest;
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            new Function(xhr.responseText).call(window);
            console.log("%cefront%c live", 'color:#360', 'color:333');
        }
    };
    xhr.open('PURGE', 'comm/main');
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
var createFunction = require2.createFunction;
var invokeFunction = require2.invokeFunction;

var buildjsp = function (buff, realpath) {
    var dynareg = dynabuilder.dynareg;
    var seekreg = dynabuilder.seekreg;
    var splited = [];
    var lastIndex = 0;
    var input = String(buff);
    var prebuilds = Object.assign({
        __dirname: path.dirname(realpath),
        __filename: realpath,
    }, dynabuilder.prebuilds);
    var that = this;
    var SError = prebuilds.Error;
    //////////////////------------//////////////////////////////////////////////////////////////////////--------//////////////////////////////
    // // ///////////1/////////////11//2////////22/////////////2/2//////////////2/////////////////////11////////////////2////////2/////////1//
    input.replace(dynareg, function (match, split, content, index, input) {
        var str = input.slice(lastIndex, index), func;
        lastIndex = index + match.length;
        if (seekreg.test(content)) {
            func = createseek(content);
        } else {
            func = createFunction.call(that, content, realpath, prebuilds);
        }
        splited.push(str, func);
        return match;
    });
    if (lastIndex < input.length - 1) splited.push(input.slice(lastIndex, input.length));
    return function (req, res) {
        var context = {};
        context.context = context;
        var terminate = false;
        var pb = Object.assign({}, prebuilds, {
            req: req,
            request: req,
            res: res,
            response: res,
            readdata: server$readdata,
            i18n: i18n.lang(server$getLang(req)),
            db: {
                get(dbid, dataid) {
                    return server$doDB.getItem(req, dbid, dataid);
                },
                set(dbid, dataid, data) {
                    return server$doDB.patchItem(req, dbid, dataid, data);
                },
                add(dbid, data) {
                    return server$doDB.addItem(req, dbid, data);
                }
            },
            context,
            textplain(e) {
                res.writeHead(200, {
                    "Content-type": "text/plain;charset=utf-8"
                });
                res.write(String(e));
                terminate = true;
            },
            forbidden(e) {
                res.writeHead(403, {
                    "Content-type": "text/html;charset=utf-8"
                });
                res.write(String(e));
                terminate = true;
            }
        });
        try {
            pb.remoteAddress = require("../server/remoteAddress")(req);
        } catch (e) {
            return pb.forbidden(e);
        }
        return queue.call(splited, function (str) {
            if (terminate && isHandled(str)) throw new Error('脚本异常！');
            if (str instanceof Function) {
                if (str.imported) return invokeFunction(str, pb);
                return str(context);
            }
            return str;
        }).then(function (array) {
            var data = Buffer.from(array.join(''));
            data.mime = "text/html;charset=utf-8";
            return data;
        }, function (error) {
            if (terminate) throw error;
            if (error instanceof SError || typeof error === 'string') return pb.forbidden(error);
            else throw error;
        });
    };
};
var buildreload = function (buff) {
    var replaced = false;
    var data = String(buff).replace(/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i, () => {
        replaced = true;
        return `<script>\r\n-${efronthook.toString()};\r\n`
    });
    if (!replaced) data = data.replace(/(["'`])POST\1\s*,\s*(['`"])comm\/main\2/i, "$1PURGE$1, $2comm/main$2");
    if (memery.islive) data = data.replace(/(<\/head)/i, `\r\n<script async>\r\n-${liveload()}();\r\n</script>\r\n$1`);
    buff = Buffer.from(data);
    return buff;
};
var str2array = require("../basic/str2array");
var indexreg = new RegExp(`(${str2array(memery.INDEX_NAME).join('|')})\\.[^\/\\\.]+$`);
if (memery.istest) builder = function (buff, name, fullpath) {
    var dev = buff;
    var that = this;
    if (/\.(?:jsp|php|asp)$/i.test(fullpath)) {
        return function (req, res) {
            var data = fixpixel(buff);
            data = buildreload(data);
            data = buildjsp.call(that, data, fullpath);
            return data(req, res);
        };
    }

    else if (indexreg.test(fullpath) || /\.html?$/i.test(fullpath) && /^\s*<!Doctype/i.test(buff.slice(0, 100).toString())) {
        return function () {
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
        buff = buildjsp.call(this, buff, fullpath);
    }
    return buff;
};

module.exports = builder;