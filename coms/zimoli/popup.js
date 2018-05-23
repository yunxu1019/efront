/**
 * 弹出层
 */
onkeydown(document, function (e) {
    if (e.which === 27 && popups.length) {
        console.log(e, popups.join())
        history.back();
    }
});
var popups = [];
var addMask = function (event) {
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
var windowFactory = function () {
    var window = createElement(div);
    css(window, `height:100px;width:100px;position:absolute;background-color:#fff;left:${popups.length << 4}px;top:${popups.length << 4}px;`);
    return window;
};
var loadingFactory = function () {
    var element = createElement(div);
    css(element, `height:100px;width:100px;position:absolute;background-color:#fff;`);
    return element;
}
put("/popup/window", windowFactory);
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
        return popup_view.apply(null, arguments);
    }
    throw new Error(`path isn't valid:${path}`);
};
var popup_path = function (path = "", parameters, target) {
    // 3 has mask has view control
    if (/^#/.test(path)) {
        // mask
        var element = windowFactory();
        zimoli.go(path.replace(/^#/, ""), parameters, element);
        return popup_with_mask(element, target);
    }
    // 2 has view control has no mask
    if (/^@/.test(path)) {
        var element = windowFactory();
        zimoli.go(path.replace(/^@/, ""), parameters, element);
        return popup_as_single(element);
    }
    // 1 has mask has no control
    if (/^!/.test(path)) {
        var element = loadingFactory();
        zimoli.go(path.replace(/^!/, ""), parameters, element);
        return popup_with_mask(element);
    }
    // 0 has no mask no control
    var element = loadingFactory();
    zimoli.go(path, parameters, element);
    return popup_as_single(element);
};

var popup_view = function (element, target) {
    if (isNode(target)) {
        if (target.isMask) {
            return popup_with_mask(element, target);
        }
        return popup_as_extra(element, target);
    }
    return popup_as_single(element);
};
var createMask = function () {
    var mask = createElement(div);
    css(mask, `position:absolute;position:fixed;z-index:${zIndex()};left:0;right:0;bottom:0;top:0;width:auto;height:auto;background-color:rgba(0,0,0,0.2)`);
    mask.className = "popup-factory mask";
    onappend(mask, addMask);
    onremove(mask, escMask);
    mask.isMask = true;
    return mask;
};
var popup_with_mask = function (element, mask = createMask()) {
    if (!mask.with) {
        mask.with = [element];
    } else if (mask.with instanceof Array) {
        mask.with.push(element);
    } else {
        mask.with = [mask.with, element];
    }
    if (!mask.clean) {
        mask.clean = new Cleanup(mask.with);
    }
    element.mask = mask;
    onremove(element, mask.clean);
    css(element, `z-index:${zIndex()};`);
    if (mask.isMounted) {
        zimoli.global(element, true);
    }
    return element;
};
var popup_as_extra = function (element, target) {
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
    //如果高度超出可视区，调整高度
    if (height > maxHeight) {
        css(element, `height:${maxHeight}px`);
    }
    var width = element.offsetWidth;
    var aimedWidth = width;
    //如果宽度不足其附着元素的宽度
    if (width < target.offsetWidth) {
        aimedWidth = target.offsetWidth;
    }
    //如果宽度超出可视区，调整宽度
    if (aimedWidth > maxWidth) {
        aimedWidth = maxWidth;
    }
    if (width !== aimedWidth) {
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
var popup_as_single = function (element) {
    onappend(element, addMask);
    onremove(element, escMask);
    css(element, `z-index:${zIndex()};`);
    zimoli.global(element, true);
};
window["popup"] = popup;