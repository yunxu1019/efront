/**
 * 弹出层
 */
onkeydown(document, function (e) {
    if (e.which === 27 && rootElements.length) {
        remove(rootElements.pop());
    }
});
var animationStyle = "opacity:0;transform:scale(1.2);transition:.1s opacity ease-out,.2s transform ease-out;";
var setInitialStyle = function (element) {
    if (!element.initialStyle) element.initialStyle = animationStyle;
};
var setPosition = function (element) {
    css(element, {
        marginLeft: fromOffset(-element.offsetWidth / 2),
        marginTop: fromOffset(-element.offsetHeight / 2),
        left: "50%",
        top: "50%"
    });
};
var windowFactory = function (window) {
    css(window, `min-height:10px;min-width:10px;position:absolute;`);
    return window;
};
var loadingFactory = function (element) {
    css(element, `position:absolute;`);
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
    if (!popup.go || !popup.prepare) throw new Error("当前环境无法使用");
    // 3 has mask has view control
    var element;
    if (/^#/.test(path)) {
        // mask
        path = path.replace(/^#/, "");
        var load = function () {
            remove(element && element.mask);
            element = popup.create(path, parameters);
            windowFactory(element);
            setInitialStyle(element);
            popup_with_mask(element, target);
        };
    }
    // 2 has view control has no mask
    else if (/^@/.test(path)) {
        path = path.replace(/^@/, "");
        var load = function () {
            element = popup.create(path, parameters);
            windowFactory(element);
            setInitialStyle(element);
            popup_as_single(element);
        };
    }
    // 1 has mask has no control
    else if (/^!/.test(path)) {
        path = path.replace(/^!/, "");
        var load = function () {
            element = popup.create(path, parameters);
            loadingFactory(element);
            setInitialStyle(element);
            popup_with_mask(element);
        };
    }
    // 0 has no mask no control
    else {
        var load = function () {
            element = popup.create(path, parameters);
            loadingFactory(element);
            if (isNode(target)) {
                popup_as_extra(element, target);
            }
            else if (target instanceof Event) {
                popup_to_event(element, target);
            } else if (target instanceof Array) {
                popup_to_point(element, target);
            } else if (target) {
                popup_with_mask(element);
            } else {
                if (parameters !== false && target !== false) setInitialStyle(element);
                popup_as_single(element);
            }
        };
    }
    var fullfill = function () {
        remove(element);
        load();
        if (!element) throw new Error(`路径不存在:${path}`);
        element.$reload = fullfill;
        if (!target && target !== false && parameters !== false) {
            element.style.opacity = 0;
            if (element.parentNode) setPosition(element), element.style.opacity = 1;
            else once('append')(element, function () {
                setPosition(element);
                element.style.opacity = 1;
            });
        }
    };
    popup.prepare(path, fullfill);
    return element;
};

var popup_view = function (element, target, style) {
    if (isNode(target)) {
        if (target.isMask) {
            popup_with_mask(element, target);
            return element;
        }
        return popup_as_extra(element, target, style);
    }
    if (target instanceof Event) {
        popup_to_event(element, target);
    } else if (target instanceof Array) {
        popup_to_point(element, target);
    } else if (target) {
        popup_with_mask(element);
    } else {
        popup_as_single(element);
    }
    return element;
};

css(".mask", `position:absolute;position:fixed;left:0;right:0;bottom:0;top:0;width:auto;height:auto;background:#000;opacity:0.2;transform:scale(1);display:block`);
var createMask = function (element) {
    var masks = element.with;
    if (masks) for (var cx = 0, dx = masks.length; cx < dx; cx++) {
        var m = masks[cx];
        if (m.isMask) return m;
    }
    var mask = document.createElement("mask");
    mask.initialStyle = animationStyle;
    css(mask, `z-index:${zIndex()};`);
    mask.className = "mask";
    mask.isMask = true;
    return mask;
};
var popup_with_mask = function (element, mask = createMask(element)) {
    onremove(element, mask.clean);
    css(element, `z-index:${zIndex()};`);
    if (mask.parentNode) {
        global(element, false);
    }
    if (!element.with) {
        element.with = [mask];
    } else if (element.with instanceof Array) {
        if (!~element.with.indexOf(element)) element.with.push(mask);
    } else {
        if (element.with !== element) element.with = [element.with, mask];
    }
    if (!mask.clean) {
        mask.clean = new Cleanup(element.with);
    }
    if (!element.parentNode) global(element, false);
    return element;
};
var popup_as_extra = function (element, target, style) {
    if (style) {
        if (/^[vy]/i.test(style)) {
            popup_as_yextra(element, target);
        } else {
            popup_as_xextra(element, target);
        }
        return;
    }
    var { offsetParent, nextSibling, previousSibling } = target;
    if (
        nextSibling
        && (
            nextSibling.offsetLeft - target.offsetLeft >= target.offsetWidth / 2
            || target.offsetLeft - nextSibling.offsetLeft >= nextSibling.offsetWidth / 2
        )
        || previousSibling
        && (
            previousSibling.offsetLeft - target.offsetLeft >= target.offsetWidth / 2
            || target.offsetLeft - previousSibling.offsetLeft >= previousSibling.offsetWidth / 2
        )
    ) {
        popup_as_yextra(element, target);
    } else if (offsetParent) {
        if (innerHeight - target.offsetHeight > innerWidth - target.offsetWidth && offsetParent.clientWidth !== target.offsetWidth) {
            popup_as_yextra(element, target);
        } else {
            popup_as_xextra(element, target);
        }
    } else if (/inline|cell/i.test(getComputedStyle(target).display)) {
        popup_as_yextra(element, target);
    } else {
        popup_as_xextra(element, target);
    }
};
var _as_yextra = function (global, innerWidth, innerHeight, element, target) {
    if (!element.origin) {
        element.origin = {
            height: element.style.height,
            width: element.style.width,
            minWidth: element.style.minWidth,
            display: element.style.display
        };
    }
    css(element, `position:absolute;z-index:${zIndex()}`);
    var release1 = onremove(target, function () {
        remove(element);
    });
    var release2 = onremove(element, function () {
        release1();
        release2();
        if (document.removeEventListener) {
            document.removeEventListener("scroll", reshape, true);
            window.removeEventListener("resize", reshape);
        }
    });
    global(element, false);
    var reshape = function () {
        extend(element.style, element.origin);
        var position = getScreenPosition(target);
        var viewrect = getScreenPosition(element.offsetParent);
        var documentbody = document.body;
        if (element.offsetParent === documentbody && !/^(absolute|relative|fixed)$/i.test(getComputedStyle(documentbody).position)) {
            viewrect.left = 0;
            viewrect.top = 0;
            viewrect.right += innerWidth - viewrect.right;
            viewrect.bottom += innerHeight - viewrect.bottom;
            viewrect.width = viewrect.right - viewrect.left;
            viewrect.height = viewrect.bottom - viewrect.top;
        }
        var maxHeight = Math.max(position.top, innerHeight - position.top - position.height);
        var maxWidth = Math.max(position.left + position.width, innerWidth - position.left);
        var height = element.offsetHeight;
        //如果高度超出可视区，调整高度
        if (height > maxHeight) {
            css(element, { height: fromOffset(maxHeight) });
        }

        css(element, `min-width:auto;`);
        var aimedWidth = element.offsetWidth;
        //如果宽度不足其附着元素的宽度
        if (aimedWidth < target.offsetWidth) {
            aimedWidth = target.offsetWidth;
        }

        //如果宽度超出可视区，调整宽度
        if (aimedWidth > maxWidth) {
            aimedWidth = maxWidth;
        }
        if (aimedWidth !== element.offsetWidth) {
            css(element, { width: fromOffset(aimedWidth) });
        }
        if (position.top + element.offsetHeight + position.height > innerHeight) {
            css(element, `bottom:${fromOffset(viewrect.height - position.top + viewrect.top)};top:auto;`);
        } else {
            css(element, `top:${fromOffset(position.top - viewrect.top + position.height)};bottom:auto;`);
        }
        if (position.left + element.offsetWidth > innerWidth) {
            css(element, `right:${fromOffset(viewrect.width + viewrect.left - position.left - position.width)};left:auto;`);
        } else {
            css(element, `left:${fromOffset(position.left - viewrect.left)};right:auto;`);
        }

        var offsetParent = target.offsetParent;
        if (offsetParent) {
            if (overlap(target, offsetParent) > 0) {
                element.style.display = element.origin.display;
            } else {
                element.style.display = "none";
            };
        }

    }
    if (document.addEventListener) {
        document.addEventListener("scroll", reshape, true);
        window.addEventListener("resize", reshape);
    }
    reshape();
    lazy(reshape)();
};
var _as_xextra = arriswise(_as_yextra, arguments);
var popup_as_single = function (element) {
    css(element, `z-index:${zIndex()};`);
    global(element, false);
};
var popup_to_point = function (element, [x, y]) {
    x = calcPixel(x), y = calcPixel(y);
    popup_fixup(element, x, y);
};
var popup_fixup = function (element, x, y) {
    css(element, {
        position: 'absolute',
    });
    popup_as_single(element);
    var left = "left", top = 'top';
    if (y + element.offsetHeight > window.innerHeight && y << 1 > window.innerHeight) {
        top = "bottom";
        y = window.innerHeight - y;
    }
    if (x + element.offsetWidth > window.innerWidth && x << 1 > window.innerWidth) {
        left = "right";
        x = window.innerWidth - x;
    }
    css(element, {
        [left]: fromOffset(x),
        [top]: fromOffset(y)
    });

};
var popup_to_event = function (element, { clientX, clientY }) {
    popup_fixup(element, clientX, clientY);
};
var global = function (element, issingle) {
    once("remove")(element, cleanup);
    rootElements.push(element);
    popup.global &&
        issingle !== false ? popup.global(element, true) : appendChild(document.body, element);
};
var popup_as_yextra = _as_yextra.bind(null, global, innerWidth, innerHeight);
var popup_as_xextra = _as_xextra.bind(null, global, innerHeight, innerWidth);
var cleanup = new Cleanup(rootElements);