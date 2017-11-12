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
var popup = function (path = "", parameters, style) {
    var viewsPath = "views";
    if (path.indexOf(".") >= 0) {
        path = path.replace(/\./g, '');
        viewsPath = "builtin";
    }

    var mask = createElement(div);
    css(mask, `position:absolute;position:fixed;z-index${zIndex()};left:0;right:0;bottom:0;top:0;width:auto;height:auto;background-color:rgba(0,0,0,0.2)`);
    mask.className = "popup-factory mask";
    var saved_position;
    setTimeout(go, 0, "/popup/window",{}, mask);
    onappend(mask, addMask);
    onremove(mask, escMask);
    zimoli.global(mask, true);
    return mask;
};
window["popup"] = popup;