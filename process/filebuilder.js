"use strict";
var htmlMinifier = require("./htmlminifier/htmlminifier");
var typescript = require("./typescript/typescript");
var commbuilder = require("./commbuilder");
var queue = require("./queue");
var config = {
    // Strip HTML comments
    removeComments: true,

    // Strip HTML comments from scripts and styles
    removeCommentsFromCDATA: true,

    // Remove CDATA sections from script and style elements
    removeCDATASectionsFromCDATA: true,

    // Collapse white space that contributes to text nodes in a document tree
    collapseWhitespace: true,

    // Always collapse to 1 space (never remove it entirely). Must be used in conjunction with collapseWhitespace=true
    conservativeCollapse: false,

    // Don't leave any spaces between display:inline; elements when collapsing. Must be used in conjunction with collapseWhitespace=true
    collapseInlineTagWhitespace: true,

    // Always collapse to 1 line break (never remove it entirely) when whitespace between tags include a line break. Must be used in conjunction with collapseWhitespace=true
    preserveLineBreaks: false,

    // Omit attribute values from boolean attributes
    collapseBooleanAttributes: false,

    // Remove quotes around attributes when possible
    removeAttributeQuotes: true,

    // Remove attributes when value matches default
    removeRedundantAttributes: true,

    // Prevents the escaping of the values of attributes.
    preventAttributesEscaping: false,

    // Replaces the doctype with the short (HTML5) doctype
    useShortDoctype: false,

    // Remove all attributes with whitespace-only values
    removeEmptyAttributes: true,

    // Remove type="text/javascript" from script tags. Other type attribute values are left intact.
    removeScriptTypeAttributes: true,

    // Remove type="text/css" from style and link tags. Other type attribute values are left intact.
    removeStyleLinkTypeAttributes: true,

    // Remove unrequired tags
    removeOptionalTags: false,

    // Remove all elements with empty contents
    // removeEmptyElements: true,

    // Toggle linting
    lint: false,

    // Keep the trailing slash on singleton elements
    keepClosingSlash: true,

    // Treat attributes in case sensitive manner (useful for custom HTML tags.)
    caseSensitive: true,

    // Minify Javascript in script elements and on* attributes (uses UglifyJS)
    minifyJS: true,

    // Minify CSS in style elements and style attributes (uses clean-css)
    minifyCSS: true,

    // Minify URLs in various attributes (uses relateurl)
    minifyURLs: true,

    // Array of regex'es that allow to ignore certain comments, when matched
    ignoreCustomComments: [],

    // Array of regex'es that allow to ignore certain fragments, when matched (e.g. <?php ... ?>, {{ ... }}, etc.)
    ignoreCustomFragments: [],

    // Array of strings corresponding to types of script elements to process through minifier (e.g. text/ng-template, text/x-handlebars-template, etc.)
    processScripts: [],

    // Specify a maximum line length. Compressed output will be split by newlines at valid HTML split-points
    maxLineLength: Infinity,

    // Arrays of regex'es that allow to support custom attribute assign expressions (e.g. '<div flex?="{{mode != cover}}"></div>')
    customAttrAssign: [],

    // Arrays of regex'es that allow to support custom attribute surround expressions (e.g. <input {{#if value}}checked="checked"{{/if}}>)
    customAttrSurround: [],

    // Regex that specifies custom attribute to strip newlines from (e.g. /ng\-class/)
    // customAttrCollapse:/ /,

    // Type of quote to use for attribute values (' or ")
    quoteCharacter: "\"",
};
var builder;
var path = require("path");
var autoloader = function () {
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
};

if (process.env.TRANSFORM_PIXEL) {
    var fixpixel = function (buff) {
        return String(buff).replace(/((?:\d*\.)?\d+)px(\s*\))?/ig, (m, d, quote) => (d !== '1' ? quote ? renderPixelRatio * d + "pt" + quote : pixelDecoder(d) : renderPixelRatio > 1 ? ".75pt" : 0.75 / devicePixelRatio + "pt"));
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
    var keys = content.trim().split('.').map(a => a.trim());
    var res = seek.bind(null, keys);
    res.params = ['context'];
    return res;
};
var buildjsp = function (buff, realpath) {
    var splited = [];
    var lastIndex = 0;
    var input = String(buff);
    //////////////////------------//////////////////////////////////////////////////////////////////////--------//////////////////////////////
    // // ///////////1/////////////11//2////////22/////////////2/2//////////////2/////////////////////11////////////////2////////2/////////1//
    input.replace(/\<([%\?]|script)(?:(?<=%)|(?:(?<=[\?])(?:php|jsp|asp))|(?<=\<script)[^\>]*?serverside[^\>]*\>)([\s\S]*?)(?:\<\/(?=script)\1\>|\1\>)/gi, function (match, split, content, index, input) {
        var str = input.slice(lastIndex, index), func;
        lastIndex = index + match.length;
        if (/^(?:\=|\return\s|)\s*[^[$_a-zA-Z]\w*(\s*\.\s*[$_a-zA-Z]\w*)*\s*$/.test(content)) {
            func = createseek(content);
        } else {
            var { params, imported, required, data } = commbuilder.parse(content);
            func = Function.apply(null, params.concat(data));
            func.required = required;
            func.imported = imported;
        }
        splited.push(str, func);
        return match;
    });
    if (lastIndex < input.length - 1) splited.push(input.slice(lastIndex, input.length));
    return function (req, res) {
        var _require = function (required, pathname) {
            if (typeof pathname === 'number') {
                pathname = required[pathname];
            }
            if (/^(?:\.?[\/\\]|\w\:)/i.test(pathname)) {
                var fullpath = path.resolve(realpath || "", pathname);
                return require(fullpath);
            }
            if (global[pathname]) return global[pathname];
            switch (pathname) {
                case "global":
                    return global;
                case "req":
                case "request":
                    return req;
                case "res":
                case "response":
                    return res;
                case "ctx":
                case "context":
                    return context;
                case "require":
                    return _require.bind(null, required);
            }
            return require(pathname);
        };
        var context = {};
        return queue.call(splited, function (str) {
            if (str instanceof Function) {
                var { imported, required } = str;
                imported = imported.map(a => _require(required, a));
                var res = str.apply(context, imported);
                if (res === undefined) res = '';
                return res;
            }
            return str;
        }).then(function (array) {
            return Buffer.from(array.join(''));
        });
    };
};
var buildreload = function (buff) {
    return String(buff).replace(/(<\/head)/i, `\r\n<script async>\r\n-${autoloader.toString()}();\r\n</script>\r\n$1`);
};
if (process.env.IN_TEST_MODE) builder = function (buff, name, fullpath) {
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
    } else try {
        var relativePath = path.relative(process.env.PUBLIC_PATH, fullpath);
        if (/^\.\./.test(relativePath)) {
            if (/\.html$/i.test(name)) {
                buff = Buffer.from(htmlMinifier.minify(fixpixel(buff), config));
            } else if (/\.js$/i.test(name)) {
                buff = Buffer.from(htmlMinifier.minify("<script><!--\r\n- function (document, window) {" + typescript.transpile(fixpixel(buff)) + "}.call(this, document, this);\r\n</script>", config).replace(/<script>|<\/script>/g, ""));
            } else if (/\.css$/i.test(name)) {
                buff = Buffer.from(htmlMinifier.minify("<style>" + fixpixel(buff) + "</style>", config).replace(/<style>|<\/style>/g, ""));
            }
        }
    } catch (e) {
        console.warn(`${name}压缩失败！`);
    }
    return buff;
};

module.exports = builder;