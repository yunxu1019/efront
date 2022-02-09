// 中文编码 utf8
function ylist(container, generator, $Y) {
    const cache_height = 2000;
    var restHeight = cache_height;
    var list = container || div();
    list.autoFix = true;
    var saved_itemIndex;
    addClass(list, 'list-' + $Y.toLowerCase());
    if (!list.renders) {
        list.renders = [];
    }
    list.renders.push(function () {
        var a = saved_itemIndex;
        saved_itemIndex = void 0;
        if (a !== void 0) scrollTo(a);
    });
    //取底部元素
    var getLastElement = function (nodeType) {
        var children = nodeType === 1 ? list.children : list.childNodes;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (isFinite(child.index) || nodeType === 2 && child.offsetHeight) {
                return child;
            }
        }
        return null;
    };
    //取底部元素
    var getIndexedElement = function (index) {
        var children = list.childNodes;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (isFinite(child.index) && child.index === index) {
                return child;
            }
        }
        return null;
    };

    //取顶部元素
    var getFirstElement = function (nodeType) {
        var children = nodeType === 1 ? list.children : list.childNodes;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (isFinite(child.index) || nodeType === 2 && child.offsetHeight) {
                return child;
            }
        }
        return null;
    };
    var getFirstVisibleElement = function (deltaY = 0) {
        var children = list.children;
        var { scrollTop } = list;
        scrollTop += deltaY;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (isFinite(child.index) && child.offsetTop + child.offsetHeight > scrollTop) {
                return child;
            }
        }
        return null;
    };
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
    var getLastVisibleElement = function (deltaY = 0) {
        var { scrollTop } = list;
        scrollTop += deltaY;
        var children = list.children;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx];
            if (isFinite(child.index) && child.offsetTop < scrollTop + list.clientHeight) {
                return child;
            }
        }
        return null;
    };
    //元素表
    var getChildrenMap = function () {
        var children = list.children;
        var map = {};
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx];
            if (isFinite(child.index)) {
                map[child.index] = child;
            }
        }
        return map;
    };
    var createItem = function (index) {
        var item = generator(index);
        if (item) {
            item.index = index;
        }
        return item;
    };
    //设置当前下标
    var scrollTo = function (itemIndex) {
        if (isNaN(itemIndex)) return;
        itemIndex = +itemIndex;
        __animated = false;
        if (!list.offsetHeight && !list.offsetWidth && !isMounted(list)) {
            saved_itemIndex = itemIndex;
            return;
        }
        var cache_height = list.offsetHeight;
        var index = itemIndex | 0;
        if (itemIndex < 0) index--;
        var ratio = itemIndex - index || 0;
        var childrenMap = getChildrenMap();
        var offsetBottom = 0, ratioTop = 0, offset = index, last_item = getFirstElement() || null, last_index = last_item && last_item.index || offset;
        var count = 0, delta = 1, bottom_item, offsett = offset, offsetb = offset, top_item;
        var indexed_item;
        while (offsetBottom - ratioTop <= list.clientHeight + cache_height || indexed_item && top_item && indexed_item.offsetTop - top_item.offsetTop < cache_height) {
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
                if (last_index > offset) {
                    list.insertBefore(item, last_item);
                } else {
                    list.insertBefore(item, getNextSibling(last_item));
                }
            } else {
                delete childrenMap[offset];
            }
            last_index = offset;
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
            if (count++ > 600) throw new Error("多于600个元素需要绘制！");
        }
        for (var k in childrenMap) {
            remove(childrenMap[k]);
        }
        var indexed_item = getIndexedElement(index) || bottom_item;
        if (indexed_item) {
            list.scrollTop = -getFirstElement(1).offsetTop + indexed_item.offsetTop + indexed_item.offsetHeight * ratio;
        }
    };
    var runbuild = lazy(function () {
        patchBottom();
        patchTop();
        var firstElement = getFirstElement(1), y;
        if (firstElement) {
            y = firstElement.index * firstElement.offsetHeight;
        } else {
            y = 0;
        }

        css(topinsert, {
            height: fromOffset(y)
        });
        return y;
    }, false);
    var rebuild = function () {
        if (!/^(?:auto|scroll)$/i.test(getComputedStyle(list).overflowY)) return;
        runbuild();
    };
    on("scroll")(list, rebuild);
    var topinsert = document.createElement('ylist-insert');
    list.insertBefore(topinsert, list.firstChild);
    //计算当前高度
    var currentY = function () {
        var firstElement = getFirstElement(1);
        if (!firstElement) return;
        var index = firstElement.index;
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
        var temp = element;
        do {
            var next = getNextSibling(temp);
            if (!next) return element.offsetHeight;
            temp = next;
        } while (next.offsetTop === element.offsetTop);
        return next.offsetTop - element.offsetTop;
    };
    var patchBottom = function (deltaY = 0) {
        var cache_height = list.offsetHeight;

        var childrenMap = getChildrenMap();
        var last_element = getLastElement(1);
        if (!last_element || !last_element.offsetHeight) return;
        let { scrollTop } = list;
        scrollTop += deltaY;
        var offsetBottom = getOffsetHeight(last_element) + last_element.offsetTop;
        var offset = last_element.index || 0;
        //追加元素到底部
        while (offsetBottom <= scrollTop + list.clientHeight + cache_height) {
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
                list.insertBefore(item, getNextSibling(last_element));
            }
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
            if (item.offsetTop + getOffsetHeight(item) + cache_height < scrollTop) {
                collection.push(item);
            }
        }
        if (collection.length) {
            var item = collection[collection.length - 1];
            var { paddingCount = 0, paddingMax } = list;
            if (item) item = item.nextSibling;
            while (item && (item.index + paddingCount) % list.group) {
                item = collection.pop();
            }
            var item = collection[collection.length - 1];
            if (item) scrollTop -= item.offsetTop + getOffsetHeight(item) - collection[0].offsetTop;


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
        var cache_height = list.offsetHeight;

        var childrenMap = getChildrenMap();
        var first_element, flag_element = first_element = getFirstElement(1);
        if (!flag_element || !isFinite(flag_element.offsetTop)) return;
        var offset = flag_element.index || 0;
        var offsetTop = flag_element.offsetTop;
        var { scrollTop } = list;
        scrollTop += deltaY;
        //追加元素到顶部
        var targetHeight = cache_height + first_element.offsetTop;
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
                list.insertBefore(item, first_element);
                scrollTop += flag_element.offsetTop - offsetTop;
                offsetTop = flag_element.offsetTop;
                first_element = item;
            }
        }
        //滚动到相应位置
        if (scrollTop < 0) scrollTop = 0;
        //-list_scrollTop + lElem_offsetTop = -list_newScrollTop + lElem_newoffsetTop + deltaY
        var last_element = getLastElement(1);
        var { clientHeight } = list;
        while (last_element && last_element.offsetTop > clientHeight + scrollTop + cache_height) {
            remove(last_element);
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

    list.stopY = function (count, spd) {
        var firstElement = getFirstVisibleElement();
        var lastElement = getLastVisibleElement();
        if (!firstElement || !lastElement) return false;
        var paddingTop = getFirstElement(1).offsetTop;
        var paddingBottom = parseFloat(getComputedStyle(list).paddingBottom);
        var scrolled_t = (list.scrollTop - firstElement.offsetTop + paddingTop) / firstElement.offsetHeight;
        var last_y = currentY();
        if (spd[0] > 0) {
            var target_ty = last_y + (1 - scrolled_t) * firstElement.offsetHeight;
        } else {
            var target_ty = last_y - scrolled_t * firstElement.offsetHeight;
        }
        var scrolled_b = (list.scrollTop + list.clientHeight - lastElement.offsetTop - paddingBottom) / lastElement.offsetHeight;
        if (spd[0] > 0) {
            var target_by = last_y + (1 - scrolled_b) * lastElement.offsetHeight;
        } else {
            var target_by = last_y - scrolled_b * lastElement.offsetHeight;
        }
        var target_y = Math.abs(target_ty - last_y) > Math.abs(target_by - last_y) ? target_by : target_ty;
        var delta = Math.min(calcPixel(60), list.clientHeight >> 2);
        var deltay = Math.abs(target_y - last_y), y;
        if (deltay >= delta) {
            return false;
        }
        if (deltay < 1) y = target_y;
        else if (deltay > count || deltay > 3) {
            y = last_y + (target_y > last_y ? .8 : -.8);
        }
        else {
            y = (target_y + last_y) / 2;
        }
        list.Top(y);
        if (target_y === y) {
            return false;
        }
    };
    //导出方法
    list.go = scrollTo;
    list.Height = function () {
        var elem = getLastElement(2);
        var listRestHeight = elem ? elem.offsetHeight + elem.offsetTop - list.scrollTop : list.clientHeight;
        return currentY() + listRestHeight + restHeight;
    };
    list.Top = function (y) {
        if (isFinite(y)) {
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
        var firstVisible = getFirstVisibleElement();
        if (!firstVisible) return saved_itemIndex;
        var index = firstVisible.index;
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
    vbox(list, $Y);
    on("remove")(list, function () {
        saved_itemIndex = list.index();
    });
    on("append")(list, function () {
        if (isFinite(saved_itemIndex)) list.go(saved_itemIndex);
    })
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
    var bindSrc = null;
    if (container instanceof Array) {
        generator = getGeneratorFromArray(container);
        bindSrc = container;
        container = div();
    } else if (container && !generator) {
        if ("$src" in container) {
            generator = getGenerator(container);
            care(container, function () {
                var index = container.index();
                container.clean();
                container.go(index || 0);
            });
            bindSrc = true;
        } else {
            generator = function () { }
        }
    }

    if (!$Y) {
        if (container) {
            $Y = container.getAttribute("direction") || container.tagName;
        }
    }
    var groupCount = /\d+/.exec($Y);
    if (groupCount) groupCount = +groupCount[0];
    $Y = /^[xh]|[xh]$/i.test($Y) ? "X" : "Y";
    var list = ($Y === "X" ? xlist : ylist)(container, generator, $Y);
    if (!list.group) list.group = groupCount || 2;
    if (bindSrc instanceof Array) {
        list.src = bindSrc;
        container.go(container.index() || 0);
    } else if (bindSrc === true) {
        container.go(container.index() || 0);
    }
    list.clean = function () {
        var children = (container || list).children;
        children = [].concat.apply([], children).filter(c => c.nodeType === 1 && isFinite(c.index));
        remove(children);
    };

    return list;
}