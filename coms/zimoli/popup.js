/**
 * 弹出层
 */
onkeydown(document, function (e) {
    if (e.which === 27 && popups.length) {
        history.back();
    }
});
var popups = [];
var addMask = function () {
    escMask.call(this);
    popups.push(this);
};
var escMask = function () {
    for (var cx = popups.length - 1; cx >= 0; cx--) {
        if (popups[cx] === this) {
            popups.splice(cx, 1);
        }
    }
};
put("/popup/window", function () {
    var window = createElement(div);
    css(window, `height:100px;width:100px;position:absolute;background-color:#fff;left:${popups.length << 4}px;top:${popups.length << 4}px;`);
    return window;
});
/**
 * 弹出子窗口的函数
 * @param {string} path 窗口路径的唯一索引
 * @param {any} parameters 给窗口的作域预先赋值
 * @param {object} style 自定义样式，主要是width,height等位置参数
 * @returns {Element} 给调用弹窗的命令暴露的可选方法
 */
var popup = function (path) {
    if (isString(path)) {
        return popup_path.apply(null, arguments);
    }
    if (isNode(path)) {
        return popup_extra.apply(null, arguments);
    }
};
var popup_view = function (element) {

};
var popup_extra = function (element, target) {
    var position = getScreenPosition(target);
    var maxHeight = Math.max(position.top, window.innerHeight - position.top - position.height);
    var maxWidth = Math.max(position.left + position.width, window.innerWidth - position.left);
    if (!element.origin) {
        element.origin = {
            height: element.style.height,
            width: element.style.width
        };
    } else {
        extend(element.style, element.origin);
    }
    css(element, `position:absolute;left:${position.left}px;min-width:${position.width}px;`);
    onappend(element, addMask);
    onremove(element, escMask);
    onremove(target, function () {
        remove(element);
    });
    zimoli.global(element, true);
    var height = element.offsetHeight;
    if (height > maxHeight) {
        css(element, `height:${maxHeight}px`);
    }
    var width = element.offsetWidth;
    if (width > maxWidth) {
        css(element, `width:${maxWidth}px`);
    }
    if (position.top + element.offsetHeight + position.height > window.innerHeight) {
        css(element, `bottom:${window.innerHeight - position.top}px;top:auto;`);
    } else {
        css(element, `top:${position.top + position.height}px;bottom:auto;`);
    }
    if (position.left + element.offsetWidth > window.innerWidth) {
        css(element, `right:${window.innerWidth - position.left - position.width}px;left:auto;`);
    } else {
        css(element, `left:${position.left}px;right:auto;`);
    }
};
var popup_path = function (path = "", parameters, style) {
    var viewsPath = "views";
    if (path.indexOf(".") >= 0) {
        path = path.replace(/\./g, '');
        viewsPath = "builtin";
    }

    var mask = createElement(div);
    css(mask, `position:absolute;position:fixed;z-index${zIndex()};left:0;right:0;bottom:0;top:0;width:auto;height:auto;background-color:rgba(0,0,0,0.2)`);
    mask.className = "popup-factory mask";
    var saved_position;
    // setTimeout(go, 0, "/popup/window",{}, mask);
    onappend(mask, addMask);
    onremove(mask, escMask);
    zimoli.global(mask, true);
    return mask;
};
window["popup"] = popup;