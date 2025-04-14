// 中文编码 utf8
function ylist(container, generator, $Y) {
    const cache_height = 2000;
    var restHeight = cache_height;
    /**
     * @type {HTMLElement}
     */
    var list = container;
    list.autoFix = true;
    var saved_itemIndex = 0;
    addClass(list, 'list-' + $Y.toLowerCase());
    var getNodeTarget = function (node) {
        if (node.nodeType === 8 && node.$template) {
            var t = node.$template;
            if (!isFinite(t.index)) t.index = node.index;
            return node.$template;
        }
        return node;
    };
    //取底部元素
    var getLastElement = function (nodeType) {
        var children = list.childNodes;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (!(isFinite(child.index) || nodeType === 2 && child.offsetHeight)) continue;
            child = getNodeTarget(child);
            return child;
        }
        return null;
    };
    //取底部元素
    var getIndexedElement = function (index) {
        var children = list.childNodes;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (child.index !== index) continue;
            child = getNodeTarget(child);
            return child;
        }
        return null;
    };

    //取顶部元素
    var getFirstElement = function (nodeType) {
        var children = list.childNodes;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (!(isFinite(child.index) && (nodeType === 0 || child.index !== null) || nodeType === 2 && child.offsetHeight)) continue;
            if (nodeType === 1) child = getNodeTarget(child);
            return child;
        }
        return null;
    };
    var isSticky = child => isElement(child) && /^(sticky|fixed|absolute)$/.test(getComputedStyle(child).position);
    var getFirstVisibleElement = function (deltaY) {
        var children = list.childNodes;
        var { scrollTop } = list;
        var paddingTop = parseFloat(getComputedStyle(list).paddingTop);
        deltaY = paddingTop + (deltaY || 0);
        if (deltaY) scrollTop += deltaY;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (!isFinite(child.index) || child.index === null) continue;
            var c = getNodeTarget(child);
            if (isSticky(c)) continue;
            if (c.offsetTop + c.offsetHeight >= scrollTop + 1) return deltaY === 0 ? child : c;
        }
        return null;
    };
    var getRelativeElement = function (element, delta) {
        delta = +delta;
        if (!delta || !isFinite(element.index)) return;
        var target = element.index + delta;
        if (!target) return;
        if (delta < 0) var key = "previousElementSibling";
        else key = "nextElementSibling";
        while (element) {
            if (element.index === target) return element;
            element = element[key];
        }
    }
    var hasCover = function (child) {
        var scrollTop = list.scrollTop;
        if (child.offsetTop + child.offsetHeight < scrollTop || child.offsetTop >= scrollTop + list.clientHeight) return false;
        if (child.offsetTop <= scrollTop && child.offsetTop + child.offsetHeight >= scrollTop + list.clientHeight) return true;
        if (child.offsetTop < scrollTop) return false;
        if (child.offsetTop + child.offsetHeight > scrollTop + list.clientHeight) return false;
        return true;
    };
    var scrollIfNotCover = function (index) {
        var c = getIndexedElement(index);
        if (!c) return scrollTo(index);
        if (hasCover(c)) return;
        var scrollTop = list.scrollTop;
        var deltat = scrollTop - c.offsetTop;
        var deltab = c.offsetTop + c.offsetHeight - scrollTop - list.clientHeight;
        if (deltat > 0) {
            return scrollBy(-deltab > deltat ? -deltat : -deltab);
        }
        if (deltab > 0) {
            return scrollBy(deltab < deltat ? deltat : deltab);
        }
    };
    var getLastVisibleElement = function (deltaY) {
        var { scrollTop } = list;
        deltaY = +deltaY;
        var paddingBottom = parseFloat(getComputedStyle(list).paddingBottom);
        if (deltaY) scrollTop += deltaY;
        var children = list.children;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (!isFinite(child.index)) continue;
            var c = getNodeTarget(child);
            if (isSticky(c)) continue;
            if (c.offsetTop + 1 <= scrollTop + list.clientHeight - paddingBottom) {
                return deltaY === 0 ? child : c;
            }
        }
        return null;
    };
    //元素表
    var getChildrenMap = function () {
        var children = list.childNodes;
        var map = {};
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (isFinite(child.index) && child.index !== null) {
                if (!map[child.index] || child.$template === map[child.index]) {
                    map[child.index] = child;
                }
            }
        }
        return map;
    };
    var createItem = function (index) {
        var item = generator(index);
        if (isNode(item)) {
            item.index = index;
        }
        return item;
    };
    //设置当前下标
    var scrollTo = function (itemIndex) {
        if (isNaN(itemIndex)) return;
        lastY = NaN;
        itemIndex = +itemIndex;
        __animated = false;
        if (!list.offsetHeight && !list.offsetWidth && !isMounted(list)) {
            saved_itemIndex = itemIndex;
            return;
        }
        var cache_height = Math.min(list.offsetHeight, screen.height >> 1);
        var index = itemIndex | 0;
        if (itemIndex < 0) index--;
        var ratio = itemIndex - index || 0;
        var childrenMap = getChildrenMap();
        var offsetBottom = 0, ratioTop = 0, offset = index, last_item = getFirstElement(0) || null, last_index = last_item && last_item.index || offset;
        if (!last_item) {
            last_item = list.lastChild;
            while (last_item && last_item.$isafter) last_item = last_item.previousSibling;
        }
        if (last_item) last_item = getNodeTarget(last_item);
        var count = 0, delta = 1, bottom_item, offsett = offset, offsetb = offset, top_item;
        var indexed_item;
        var limitHeight = screen.height;
        while (
            offsetBottom - ratioTop <= limitHeight + cache_height
            || delta < 0 && indexed_item && top_item && indexed_item.offsetTop - top_item.offsetTop < cache_height) {
            var item = childrenMap[offset];
            if (!item) {
                item = createItem(offset);
                if (!item || delta > 0 && offsetBottom - ratioTop > list.clientHeight + cache_height) {
                    if (delta < 0) break;
                    delta = -1;
                    offset = index - 1;
                    bottom_item = getIndexedElement(offsetb);
                    last_item = getIndexedElement(index);
                    last_index = index;
                    continue;
                }
            } else {
                delete childrenMap[offset];
            }
            if (last_index > offset) {
                if (item.nextElementSibling !== last_item) insertBeforeList(item, last_item);
            } else {
                if (item.previousElementSibling !== item) insertBeforeList(item, getNextSibling(last_item));
            }
            last_index = offset;
            item = getNodeTarget(item);
            last_item = item;
            if (offset === index || !indexed_item) indexed_item = item;
            if (delta > 0) {
                offsetb = offset;
                offset++;
                bottom_item = item;
                if (!top_item) top_item = item;
            } else {
                offsett = offset;
                offset--;
                if (!bottom_item) bottom_item = item;
                top_item = item;
            }
            offsetBottom = bottom_item.offsetTop + bottom_item.offsetHeight;
            ratioTop = top_item.offsetTop + top_item.offsetHeight * ratio;
            if (count++ > 600) throw console.log(
                `头部下标`, index,
                `当前下标`, offset,
                `缓冲尺寸`, cache_height,
                '限制尺寸', limitHeight,
                '框架尺寸', list.offsetHeight,
                '当前绘制到', ratioTop,
                `当前元素到顶部元素占用`, offsetBottom - ratioTop
            ), new Error(i18n`多于600个元素需要绘制！`);
        }
        for (var k in childrenMap) {
            remove(childrenMap[k]);
        }
        var indexed_item = getIndexedElement(index) || bottom_item;
        if (indexed_item) {
            var firstElement = getFirstElement(1) || indexed_item;
            list.scrollTop = -firstElement.offsetTop + indexed_item.offsetTop + indexed_item.offsetHeight * ratio;
        }
    };
    //计算当前高度
    var currentY = function () {
        var firstElement = getFirstElement();
        if (!firstElement) return;
        var index = firstElement.index;
        firstElement = getNodeTarget(firstElement);
        if (index < 0) index = index - index | 0;
        return index * firstElement.offsetHeight + list.scrollTop;
    };
    var getBottomElement = function (last_element) {
        if (!last_element) return null;
        var with_elements = last_element.with;
        return with_elements && with_elements.length ? with_elements[with_elements.length - 1] : last_element;
    };
    var getNextSibling = function (last_element) {
        var bottom_element = getBottomElement(last_element);
        return bottom_element ? bottom_element.nextSibling : null;
    };
    var getOffsetHeight = function (element) {
        element = getNodeTarget(element);
        var temp = element;
        do {
            var next = getNextSibling(temp);
            if (!next) return element.offsetHeight;
            temp = getNodeTarget(next);
        } while (next.offsetTop === element.offsetTop);
        return next.offsetTop - element.offsetTop;
    };
    var insertBeforeList = function (elem, flag) {
        if (flag) {
            var w = elem.with;
            if (w) {
                if (w[w.length - 1].nextSibling === flag) return;
            }
            else if (elem.nextSibling === flag) return;
        }
        list.insertBefore(elem, flag);
        if (elem.with) for (var w of elem.with) list.insertBefore(w, flag);
    };
    var patchBottom = function (deltaY = 0) {
        var cache_height = Math.min(list.offsetHeight, screen.height >> 1);
        var limitHeight = screen.height + cache_height;
        var childrenMap = getChildrenMap();
        var last_element = getLastElement(1);
        if (!last_element || !last_element.offsetHeight) return;
        let { scrollTop } = list;
        scrollTop += deltaY;
        var offsetBottom = getOffsetHeight(last_element) + last_element.offsetTop;
        var offset = last_element.index || 0;
        //追加元素到底部
        while (offsetBottom <= scrollTop + limitHeight) {
            offset++;
            var item = childrenMap[offset];
            if (!item) {
                item = createItem(offset);
                if (!item) {
                    restHeight = 0;
                    break;
                } else if (!restHeight) {
                    restHeight = cache_height;
                }
                insertBeforeList(item, getNextSibling(last_element));
            }
            item = getNodeTarget(item);
            if (!item.offsetHeight) {
                console.warn(item, '!item.offsetHeight');
                break;
            }
            offsetBottom = item.offsetTop + getOffsetHeight(item);
            last_element = item;
        }
        var collection = [];
        for (var k in childrenMap) {
            let item = childrenMap[k];
            if (getNodeTarget(item).offsetTop + getOffsetHeight(item) + limitHeight < scrollTop) {
                collection.push(item);
            }
        }
        if (collection.length) {
            var item = collection[collection.length - 1];
            var { paddingCount = 0, paddingMax } = list;
            if (item) item = item.nextSibling;
            if (!paddingMax) while (item && item.index % list.group) {
                item = collection.pop();
            }
            var item = collection[collection.length - 1];
            if (item) scrollTop -= getNodeTarget(item).offsetTop + getOffsetHeight(item) - getNodeTarget(collection[0]).offsetTop;
            if (paddingCount > 0 && paddingMax > 0 && paddingCount < paddingMax) {
                let item = collection[collection.length - 1];
                while (paddingCount > 0) {
                    if (!item) break;
                    paddingCount--;
                    collection.push(item.nextSibling);
                    item = item.nextSibling;
                }
            }
            remove(collection);
        }
        //滚动到相应的位置
        return scrollTop - list.scrollTop;
    };
    var patchTop = function (deltaY = 0) {
        var cache_height = Math.min(list.offsetHeight, screen.height >> 1);

        var childrenMap = getChildrenMap();
        var first_element, flag_element = first_element = getFirstElement(1);
        if (!flag_element || !isFinite(flag_element.offsetTop)) return;
        var offset = flag_element.index || 0;
        var offsetTop = flag_element.offsetTop;
        var { scrollTop } = list;
        scrollTop += deltaY;
        //追加元素到顶部
        var targetHeight = screen.height + cache_height + first_element.offsetTop;
        var { paddingCount, paddingMax } = list;
        if (!(paddingCount > 0 && paddingMax > 0 && paddingCount < paddingMax) || !(scrollTop < targetHeight)) {
            paddingCount = 0;
        }
        while (scrollTop < targetHeight || paddingCount > 0 || offset % list.group) {
            offset--;
            if (!(scrollTop < targetHeight)) {
                paddingCount--;
            }
            var item = childrenMap[offset];
            if (!item) {
                item = createItem(offset);
                if (!item) break;
                insertBeforeList(item, first_element);
                item = getNodeTarget(item);
                scrollTop += flag_element.offsetTop - offsetTop;
                offsetTop = flag_element.offsetTop;
            }
            first_element = item;
        }
        //滚动到相应位置
        if (scrollTop < 0) scrollTop = 0;
        //-list_scrollTop + lElem_offsetTop = -list_newScrollTop + lElem_newoffsetTop + deltaY
        var last_element = getLastElement(1);
        var { clientHeight } = list;
        while (last_element && last_element.offsetTop > clientHeight + scrollTop + cache_height) {
            remove(last_element);
            remove(last_element.$comment);
            last_element = getLastElement(1);
        }
        return scrollTop - list.scrollTop;
    };
    var __animated = false;
    //滚动一定的距离
    var scrollBy = function (deltaY, animate = false) {
        var deltaScroll;
        if (deltaY > 0) {
            deltaScroll = patchBottom(deltaY, animate);
        } else {
            deltaScroll = patchTop(deltaY, animate);
        }
        if (deltaScroll) {
            if (animate && __scrollBy) {
                list.scrollTop += deltaScroll - deltaY;
                __scrollBy.call(list, {
                    top: deltaY,
                    behavior: 'smooth'
                });
                __animated = true;
            } else {
                list.scrollTop += deltaScroll;
                __animated = false;
            }
        }
    };
    bind('resize')(list, function () {
        patchBottom(0);
    });
    list.getLastVisibleElement = getLastVisibleElement;
    list.getFirstVisibleElement = getFirstVisibleElement;
    var lastY = NaN;
    //
    // 最大距离 S，最大初始速度 V = a * t = 1，求加速 a
    // S = 0.5 * a * t * t = 0.5 * V * t;
    // => t = S * 2 / V = S * 2, a = V / t = 1 / (S * 2);
    //
    // 加速度a = 1 / (S * 2)，对任意s，有t = sqrt(2 * s / a) = sqrt(2 * s * S * 2) = 2 * sqrt(s * S);
    // 对应速度 v = a * t = 1 / (S * 2) * 2 * sqrt(s * S) = sqrt(s * S) / S;
    // 临近零点的距离 s0 = a / 2 = 1 / (S * 4);
    list.$stopY = function (t, spd) {
        var firstElement = getFirstVisibleElement();
        var lastElement = getLastVisibleElement();
        if (!firstElement || !lastElement || !list.clientHeight) return false;
        if (isNaN(lastY)) return false;
        var paddingTop = parseFloat(getComputedStyle(list).paddingTop);
        var paddingBottom = parseFloat(getComputedStyle(list).paddingBottom);
        var scrolled_t = (list.scrollTop - firstElement.offsetTop + paddingTop) / firstElement.offsetHeight;
        if (scrolled_t > 1) scrolled_t -= scrolled_t | 0;
        var last_y = lastY;
        if (spd[0] > 0) {
            var target_ty = last_y + (1 - scrolled_t) * firstElement.offsetHeight;
        } else {
            var target_ty = last_y - scrolled_t * firstElement.offsetHeight;
        }
        var scrolled_b = (list.scrollTop + list.clientHeight - lastElement.offsetTop - paddingBottom) / lastElement.offsetHeight;
        if (scrolled_b < 0) scrolled_b -= scrolled_b - 1 | 0;
        if (spd[0] > 0) {
            var target_by = last_y + (1 - scrolled_b) * lastElement.offsetHeight;
        } else {
            var target_by = last_y - scrolled_b * lastElement.offsetHeight;
        }
        var S = calcPixel(30);
        var target_y = Math.abs(target_ty - last_y) > Math.abs(target_by - last_y) ? target_by : target_ty;
        var delta = Math.min(S, list.clientHeight >> 2);
        var absy = Math.abs(target_y - last_y), y;
        if (absy >= delta) {
            return false;
        }
        if (absy < 1) y = target_y;
        else {
            var speed = Math.sqrt(absy * S) / S;
            y = last_y + (target_y > last_y ? speed : -speed);
        }
        list.$Top(y);
        if (target_y === y) {
            return false;
        }
        return true;
    };
    //导出方法
    list.go = scrollTo;
    list.$Height = function () {
        var elem = getLastElement(2);
        var listRestHeight = elem ? elem.offsetHeight + elem.offsetTop - list.scrollTop : list.clientHeight;
        var paddingHeight = elem ? 0 : restHeight;
        if (listRestHeight < list.clientHeight) listRestHeight = list.clientHeight;
        return currentY() + listRestHeight + paddingHeight;
    };
    list.$Top = function (y) {
        if (isFinite(y)) {
            lastY = y;
            var last_y = currentY();
            if (y !== last_y) {
                scrollBy(y - last_y);
            }
        }
        return currentY();
    };
    if (!/^i(Phone|Pod|Watch|Pad)|^Mac/i.test(navigator.platform)) var __scrollBy = list.scrollBy;
    list.scrollBy = scrollBy;
    list.index = function (update) {
        if (update === false) return saved_itemIndex;
        var firstVisible = getFirstVisibleElement(0);
        if (!firstVisible) return saved_itemIndex;
        var index = firstVisible.index;
        firstVisible = getNodeTarget(firstVisible);
        if (!firstVisible) return saved_itemIndex;
        var firstElement = getFirstElement(1);
        var scrolled = (list.scrollTop - firstVisible.offsetTop + firstElement.offsetTop + .5 | 0) / firstVisible.offsetHeight;
        return index + scrolled;
    };
    list.topIndex = function () {
        var element = getFirstElement(1);
        return element ? element.index : 0;
    };
    list.getIndexedElement = getIndexedElement;
    list.patchBottom = patchBottom;
    list.patchTop = patchTop;
    list.scrollIfNotCover = scrollIfNotCover;
    list.getLastElement = getLastElement;
    vbox(list, $Y);
    on("remove")(list, function () {
        saved_itemIndex = list.index();
    });
    onmounted(list, function () {
        if (isFinite(saved_itemIndex)) list.go(saved_itemIndex);
    });
    /**
     * @param {Element|null} focused 
     * @param {boolean} animate
     */
    list.setFocus = function (focused, animate = true) {
        if (isElement(focused) && (focused.hasAttribute("disabled") || focused.hasAttribute("line"))) return;
        if (focused === (focused | 0)) {
            var index = focused;
            focused = list.getIndexedElement(index);
            if (!focused) {
                list.go(index);
                focused = list.getIndexedElement(index);
            }
        }
        if (!focused) {
            if (list.focused) {
                removeClass(list.focused, 'focus');
                list.focused = null;
            }
            return;
        }
        if (list.focused === focused) return;
        if (list.focused) removeClass(list.focused, 'focus');
        addClass(focused, "focus");
        list.focused = focused;
        while (focused && focused.parentNode !== list) focused = focused.parentNode;
        if (!focused) return;
        var scrollTop = list.scrollTop;
        var firstElement = getFirstElement(1);
        var sideheight = 0;
        if (firstElement) {
            sideheight += parseFloat(getComputedStyle(firstElement).paddingTop + firstElement.clientTop);
            sideheight += (firstElement.offsetHeight - sideheight - sideheight) * .3;
            sideheight += parseFloat(getComputedStyle(list).paddingTop);
        }
        if (focused.offsetTop + focused.offsetHeight + sideheight > list.scrollTop + list.clientHeight) {
            scrollTop = focused.offsetTop + focused.offsetHeight + sideheight - list.clientHeight;
        }
        if (focused.offsetTop < list.scrollTop + sideheight) {
            scrollTop = focused.offsetTop - sideheight;
        }
        if (scrollTop !== list.scrollTop) scrollBy(scrollTop - list.scrollTop, animate);
    };

    /**
     * @param {number|"up"|"down"|"home"|"end"|"pageup"|"pagedown"}delta
     * @param {boolean} emit
     */
    list.moveFocus = function (delta, emit = true) {
        var focused = list.focused;
        var newIndex = 0, total = 0;
        if (delta === 'up') delta = -1;
        if (delta === 'down') delta = 1;
        if (typeof delta === 'string') switch (delta.toLowerCase()) {
            case "home":
                newIndex = 0;
                delta = 1;
                break;
            case "end":
                var lastElement = getLastElement(1);
                if (!lastElement) return;
                newIndex = lastElement.index;
                delta = -1;
                break;
            case "pageup":
                var firstElement = getFirstVisibleElement();
                if (!firstElement) return;
                newIndex = firstElement.index;
                list.scrollBy(-list.clientHeight + firstElement.offsetHeight);
                var lastElement = getLastVisibleElement();
                if (lastElement.index < newIndex) newIndex = lastElement.index;
                delta = -1;
                break;
            case "pagedown":
                var lastElement = getLastVisibleElement();
                if (!lastElement) return;
                newIndex = lastElement.index;
                list.scrollBy(list.clientHeight - lastElement.offsetHeight);
                var firstElement = getFirstVisibleElement();
                if (firstElement.index > newIndex) newIndex = firstElement.index;
                delta = 1;
                break;
            default:
                return false;
        }
        else if (!focused) {
            var lastElement = getLastElement(1);
            if (!lastElement) return;
            total = lastElement.index + 1;
            if (delta > 0) newIndex = 0;
            else newIndex = total - 1;
        }
        else {
            var newIndex = focused.index + delta;
            var lastElement = getLastElement(1);
            var total = lastElement.index + 1;
            if (newIndex < 0) newIndex = total + newIndex;
            if (newIndex > total - 1) newIndex = newIndex - total;
        }
        var savedIndex = newIndex;
        var e = list.getIndexedElement(newIndex);
        while (e && (e.hasAttribute("disabled") || e.hasAttribute("line"))) {
            if (delta > 0) {
                newIndex++;
                if (newIndex >= total) {
                    if (!total) return;
                    newIndex = 0;
                }
            } else {
                newIndex--;
                if (newIndex < 0) {
                    if (!total) return;
                    newIndex = total - 1;
                }
            }
            if (savedIndex === newIndex) return;
            e = list.getIndexedElement(newIndex);
        }
        if (!e) list.setFocus(null);
        else if (emit) list.setFocus(e, true), dispatch(list, 'focused');
        else list.setFocus(e);
    };
    list.getRelativeElement = getRelativeElement;
    return list;
}
var allArgumentsNames = arguments[arguments.length - 1];
var xlist = arriswise(ylist, allArgumentsNames.concat([].slice.call(arguments, 0)));

var getGeneratorFromArray = function (source) {
    return function (index) {
        if (index >= source.length || index < 0) return null;
        return block(source[index]);
    };
};

/**
 * 
 * @param {Boolean|Array|Function} generator 
 */
function list() {
    var generator, $Y, container;
    {
        for (let cx = 0, dx = arguments.length; cx < dx; cx++) {
            let arg = arguments[cx];
            switch (typeof arg) {
                case "string":
                    $Y = arg;
                    break;
                case "function":
                    generator = arg;
                    break;
                default:
                    if (isNode(arg)) container = arg;
            }
        }
    }
    var bindSrc = isNode(container) && "$src" in container;
    if (container instanceof Array) {
        generator = getGeneratorFromArray(container);
        bindSrc = container;
        container = div();
    }
    else if (container && !generator) {
        if (bindSrc) {
            generator = getGenerator(container);
            bindSrc = true;
        } else {
            generator = function () { }
        }
    }
    var savedSrc = [];
    if (bindSrc === true) care(container, function (src, old) {
        var index = container.index();
        if (src !== old) container.clean(), index = 0;
        else container.clean(src, savedSrc);
        savedSrc = src instanceof Array ? src.slice() : extend([], src);
        if (index > 0 && index >= src.length) index = src.length - 1;
        container.go(index || 0);
    });

    if (!$Y) {
        if (container) {
            $Y = container.getAttribute("direction") || container.tagName;
        }
    }
    var groupCount = /\d+/.exec($Y);
    if (groupCount) groupCount = +groupCount[0];
    $Y = /^[xh]|[xh]$/i.test($Y) ? "X" : "Y";
    if (!container) container = document.createElement('list');
    appendChild.wrapTarget(container);
    var list = ($Y === "X" ? xlist : ylist)(container, generator, $Y);
    if (!list.group) list.group = groupCount || 2;
    if (bindSrc instanceof Array || isFunction(bindSrc?.next)) {
        list.src = bindSrc;
        container.go(container.index() || 0);
    } else if (bindSrc === true) {
        container.go(container.index() || 0);
    }
    list.clean = function (src, old) {
        var children = (container || list).childNodes;
        children = Array.prototype.filter.call(children, c => {
            if (c.index === null) return false;
            if (isFinite(c.index)) return true;
            if (c.nodeType === 1 && c.$comment && isFinite(c.$comment.index)) return true;
            return false;
        });
        if (isFunction(src?.next)) {
            remove(children);
            return;
        }
        if (src && old) children = Array.prototype.filter.call(children, c => src[c.index] !== old[c.index]);
        remove(children);
    };
    return list;
}