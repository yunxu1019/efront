/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */
var stylesheet_Map = {};
var documentStyle = document.documentElement.style;
var stylePrefix = function (documentStyle) {
    if ("-webkit-transform" in documentStyle) return "-webkit-";
    if ("-moz-transform" in documentStyle) return "-moz-";
    if ("msImeAlign" in documentStyle || "msTransform" in documentStyle) return "-ms-";
    if ("-o-transform" in documentStyle) return "-o-";
    return "";
}(documentStyle);
var ratioPropReg = /(?:opacity|line\-height|lineHeight|z\-index|zIndex|zoom|weight|count|order|perspective|animation|flex|font\-size\-adjust|tab\-size|scale|grid\-(?:column|row)(?:\-(?:start|end))?)$/i;
var nodePrefix = stylePrefix.slice(1, stylePrefix.length - 1);
var transfromSimpleValue = function (value) {
    if (isFinite(value)) return fromOffset(+value || 0);
    return value;
};
var transformValue = function (value, k) {
    if (ratioPropReg.test(k) || !value) return value;
    if (/^[\w\s\.]+$/.test(value)) return isFinite(value) ? transfromSimpleValue(value) : String(value).split(/\s/).map(transfromSimpleValue).join(' ');
    return value;
};
/**
 * 将中划线转成驼峰式
 * @param {string} key 
 */
var transformNodeKey = function (key) {
    key = key.replace(/^\-+/, "").replace(/\-+(\w)/g, function (m, w) {
        return w.toUpperCase();
    });
    if (/^(?:webkit|moz|ms|o)[A-Z]/.test(key)) {
        key = key.replace(/^(?:webkit|moz|ms|o)([A-Z])/, (_, m) => m.toLowerCase());
    }
    if (nodePrefix && !(key in documentStyle)) {
        var temp = nodePrefix + key.replace(/^[a-z]/, m => m.toUpperCase());
        if (temp in documentStyle) {
            key = temp;
        }
    }
    return key;
};
/**
 * 将驼峰式命名转成中划线命名
 * @param {string} key 
 */
var transformCssKey = function (key) {
    key = key.replace(/[A-Z]/g, function (m) {
        return "-" + m.toLowerCase();
    });
    if (/^\-?(?:webkit|moz|ms|o)\-/.test(key)) {
        key = key.replace(/^\-?(?:webkit|moz|ms|o)\-/, '');
    }
    if (nodePrefix && !(key in documentStyle)) {
        var temp = stylePrefix + key;
        if (temp in documentStyle) {
            key = temp;
        }
    }
    return key;
};
var isWorseIE = /msie\s+[2-8]/i.test(navigator.userAgent);
/**
 * 将样式绑定到dom元素
 * @param {Element} targetNode 
 * @param {string|object} oStyle 
 * @param {string|} oValue 
 */
var cssTargetNode = function (targetNode, oStyle, oValue) {
    var styleobject = targetNode.style;
    if (typeof oStyle === "string") {
        if (typeof oValue === "string") {
            styleobject[transformNodeKey(oStyle)] = transformValue(oValue, oStyle);
            return;
        } else {
            try {
                oStyle = parseKV(oStyle, ';', ':');
            } catch (e) { }
        }
    }
    if (isObject(oStyle)) {
        if (isWorseIE) {

            for (var k in oStyle) {
                var key = transformNodeKey(k);
                if (key in styleobject) {
                    try {
                        styleobject[key] = transformValue(oStyle[k], key);
                    } catch (e) {
                        console.warn(key, oStyle[k], "无效");
                    }
                }
            }
        } else {
            for (var k in oStyle) {
                var key = transformNodeKey(k);
                if (key in styleobject) styleobject[key] = transformValue(oStyle[k], key);
            }
        }
    }
};
/**
 * 将样式绑定到选择器
 * @param {string} targetSelector 
 * @param {string|object} oStyle 
 * @param {string|} oValue 
 */
var cssTargetSelector = function (targetSelector, oStyle, oValue) {
    var stylesheet = stylesheet_Map[targetSelector];
    if (!stylesheet) {
        stylesheet = document.createElement("style");
        stylesheet.type = "text/css";
        stylesheet_Map[targetSelector] = stylesheet;
        document.getElementsByTagName("head")[0].appendChild(stylesheet);
    }
    var styleobject = {};
    if (typeof oStyle === "string") {
        if (typeof oValue === "string") {
            var key = transformCssKey(oStyle);
            styleobject[key] = oValue;
        } else {
            oStyle.replace(/^;+|;+$/g, "").split(/;+/).map(function (kv) {
                var [k, v] = kv.split(":");
                delete styleobject[k];
                if (k) styleobject[k] = v || '';
            });
        }
    } else if (isObject(oStyle)) {
        for (var k in oStyle) {
            var key = transformCssKey(k);
            styleobject[key] = oStyle[k];
        }
    }
    var rowStyles = [];
    var styleSheet = stylesheet.styleSheet;
    var cssText = stylesheet.savedText || (styleSheet ? styleSheet.cssText : stylesheet.innerHTML).replace(/^[\s\S]*?\{([\s\S]*?)\}[\s\S]*?$/, "$1");
    cssText.split(";").forEach(function (kv) {
        var k = kv.replace(/^(.*?)\:.*$/, "$1");
        if (k && !(k in styleobject)) rowStyles.push(kv);
    });
    for (var k in styleobject) {
        if (styleobject[k]) {
            rowStyles.push(k + ":" + transformValue(styleobject[k], k));
        }
    }
    var innerCss = `${targetSelector}{${rowStyles.join(";")}}`;
    innerCss = color.transform(innerCss);
    cssTargetStyleSheet(stylesheet, innerCss);
};

function cssTargetStyleSheet(stylesheet, innerCss) {
    var styleSheet = stylesheet.styleSheet;
    if (styleSheet) {
        //IE
        if (styleSheet.cssText !== innerCss) styleSheet.cssText = innerCss;
    } else {
        if (stylesheet.innerHTML !== innerCss) stylesheet.innerHTML = innerCss;
    }
}

/**
 * 函数的入口
 * @param {string|Element} target 
 * @param {object|string} oStyle 
 * @param {|string} oValue 
 */
var css = function (target, oStyle, oValue) {
    if (!oStyle) return;
    if (isElement(target)) {
        if (/^style$/i.test(target.tagName)) {
            cssTargetStyleSheet(target, oStyle, oValue);
        } else {
            cssTargetNode(target, oStyle, oValue);
        }
    }
    else if (isString(target)) cssTargetSelector(target, oStyle, oValue);
};