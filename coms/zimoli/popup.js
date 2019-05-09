/**
 * 弹出层
 */
onkeydown(document, function (e) {
    if (e.which === 27 && rootElements.length) {
        remove(rootElements[rootElements.length - 1]);
    }
});
var windowFactory = function () {
    var window = document.createElement("div");
    css(window, `height:100px;width:100px;position:absolute;background-color:#fff;left:${rootElements.length << 4}px;top:${rootElements.length << 4}px;`);
    return window;
};
var loadingFactory = function () {
    var element = document.createElement("div");
    css(element, `height:100px;width:100px;position:absolute;background-color:#fff;`);
    return element;
}
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
    if (!popup.go) throw new Error("当前环境无法使用");
    if (/^#/.test(path)) {
        // mask
        var element = windowFactory();
        popup.go(path.replace(/^#/, ""), parameters, element);
        return popup_with_mask(element, target);
    }
    // 2 has view control has no mask
    if (/^@/.test(path)) {
        var element = windowFactory();
        popup.go(path.replace(/^@/, ""), parameters, element);
        return popup_as_single(element);
    }
    // 1 has mask has no control
    if (/^!/.test(path)) {
        var element = loadingFactory();
        popup.go(path.replace(/^!/, ""), parameters, element);
        return popup_with_mask(element);
    }
    // 0 has no mask no control
    var element = loadingFactory();
    popup.go(path, parameters, element);
    return popup_as_single(element);
};

var popup_view = function (element, target) {
    if (isNode(target)) {
        if (target.isMask) {
            return popup_with_mask(element, target);
        }
        return popup_as_extra(element, target);
    }
    if (target) {
        return popup_with_mask(element);
    }
    return popup_as_single(element);
};
var createMask = function () {
    var mask = document.createElement("div");
    css(mask, `position:absolute;position:fixed;z-index:${zIndex()};left:0;right:0;bottom:0;top:0;width:auto;height:auto;background-color:rgba(0,0,0,0.2)`);
    mask.className = "popup-factory mask";
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
        global(element);
    }
    return element;
};
var popup_as_extra = function (element, target) {
    var offsetParent = target.offsetParent;
    if (offsetParent) {
        if (offsetParent.clientHeight / target.offsetHeight < offsetParent.clientWidth / target.offsetWidth) {
            popup_as_yextra(global, element, target);
        } else {
            popup_as_xextra(global, element, target);
        }
    } else if (/inline|cell/i.test(getComputedStyle(target).display)) {
        popup_as_yextra(global, element, target);
    } else {
        popup_as_xextra(global, element, target);
    }
};
var popup_as_yextra = function (global, element, target) {
    if (!element.origin) {
        element.origin = {
            height: element.style.height,
            width: element.style.width,
            minWidth: element.style.minWidth,
            display: element.style.display
        };
    }
    css(element, `position:absolute;`);
    var release1 = onremove(target, function () {
        remove(element);
    });
    var release2 = onremove(element, function () {
        release1();
        release2();
        if (document.removeEventListener) {
            document.removeEventListener("scroll", reshape, true);
            document.removeEventListener("resize", reshape);
        }
    });
    global(element);
    var reshape = function () {
        extend(element.style, element.origin);
        var position = getScreenPosition(target);
        var viewrect = getScreenPosition(element.offsetParent);
        var maxHeight = Math.max(position.top, innerHeight - position.top - position.height);
        var maxWidth = Math.max(position.left + position.width, innerWidth - position.left);
        var height = element.offsetHeight;
        //如果高度超出可视区，调整高度
        if (height > maxHeight) {
            css(element, `height:${maxHeight}px;`);
        }
        var aimedWidth = element.offsetWidth;
        css(element, `min-width:auto;`);
        //如果宽度不足其附着元素的宽度
        if (aimedWidth < target.offsetWidth) {
            aimedWidth = target.offsetWidth;
        }

        //如果宽度超出可视区，调整宽度
        if (aimedWidth > maxWidth) {
            aimedWidth = maxWidth;
        }
        if (aimedWidth !== element.offsetWidth) {
            css(element, `width:${aimedWidth}px`);
        }
        if (position.top + element.offsetHeight + position.height > innerHeight) {
            css(element, `bottom:${viewrect.height - position.top + viewrect.top}px;top:auto;`);
        } else {
            css(element, `top:${position.top - viewrect.top + position.height}px;bottom:auto;`);
        }
        if (position.left + element.offsetWidth > innerWidth) {
            css(element, `right:${viewrect.width + viewrect.left - position.left - position.width}px;left:auto;`);
        } else {
            css(element, `left:${position.left - viewrect.left}px;right:auto;`);
        }
        var offsetParent = target.offsetParent;
        if (offsetParent) {
            if (overlap(position, offsetParent) > 0) {
                element.style.display = element.origin.display;
            } else {
                element.style.display = "none";
            };
        }

    }
    if (document.addEventListener) {
        document.addEventListener("scroll", reshape, true);
        document.addEventListener("resize", reshape);
    }
    reshape();

};
var allArgumentsNames = arguments[arguments.length - 1];
var popup_as_xextra = arriswise(popup_as_yextra, allArgumentsNames.concat([].slice.call(arguments, 0)));
var popup_as_single = function (element) {
    css(element, `z-index:${zIndex()};`);
    global(element);
};
var global = function (element) {
    once("remove")(element, cleanup);
    popup.global ? popup.global(element, true) : appendChild(document.body, element);
}
var cleanup = new Cleanup(rootElements);