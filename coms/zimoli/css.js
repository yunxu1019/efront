/* 
 * 不枝雀
 * 2017-5-1 18:33:41
 */
var stylesheet_Map = {};
/**
 * 将中划线转成驼峰式
 * @param {string} key 
 */
var transformNodeKey = function (key) {
    return key.replace(/^\-+/, "").replace(/\-+(\w)/g, function (m, w) {
        return w.toUpperCase();
    });
};
/**
 * 将驼峰式命名转成中划线命名
 * @param {string} key 
 */
var transformCssKey = function (key) {
    key = key.replace(/[A-Z]/g, function (m) {
        return "-" + m.toLowerCase();
    });
    return key;
};
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
            styleobject[transformNodeKey(oStyle)] = oValue;
        } else {
            try {
                targetNode.style.cssText += ";" + oStyle;
            } catch (e) { }
        }
    } else if (oStyle instanceof Object) {
        for (var k in oStyle) {
            styleobject[transformNodeKey(k)] = oStyle[k];
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
    var styleobject = {};
    var stylesheet = stylesheet_Map[targetSelector];
    if (!stylesheet) {
        stylesheet = createElement("style")
        stylesheet.type = "text/css";
        stylesheet_Map[targetSelector] = stylesheet;
        appendChild(document.getElementsByTagName("head")[0], stylesheet);
    };
    if (typeof oStyle === "string") {
        if (typeof oValue === "string") {
            var key = transformCssKey(oStyle);
            styleobject[key] = oValue;
        } else {
            oStyle.replace(/^;+|;+$/g, "").split(/;+/).map(function (kv) {
                var [k, v] = kv.split(":");
                delete styleobject[k];
                styleobject[k] = v;
            });
        }
    } else if (oStyle instanceof Object) {
        for (var k in oStyle) {
            var key = transformCssKey[k];
            styleobject[key] = oStyle[k];
        }
    }
    var rowStyles = [];
    stylesheet.innerHTML.replace(/^.*?\{([\s\S]*?)\}.*?$/, "$1").split(";").map(function (kv) {
        var k = kv.replace(/^(.*?)\:.*$/, "$1");
        if (!(k in styleobject)) rowStyles.push(kv);
    });
    for (var k in styleobject) {
        rowStyles.push(k + ":" + styleobject[k]);
    }
    var innerCss = `${targetSelector}{${rowStyles.join(";")}}`;
    var styleSheet = stylesheet.styleSheet;
    if (styleSheet) {
        //IE
        styleSheet.cssText = innerCss;
    } else {
        stylesheet.innerHTML = innerCss;
    }
};
/**
 * 函数的入口
 * @param {string|Element} target 
 * @param {object|string} oStyle 
 * @param {|string} oValue 
 */
var css = function (target, oStyle, oValue) {
    if (isNode(target)) cssTargetNode(target, oStyle, oValue);
    else if (isString(target)) cssTargetSelector(target, oStyle, oValue);
};