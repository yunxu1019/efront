// 中文编码 utf8
var _slider = createElement(div);
function ylist(container, generator, $Y) {
    const cache_height = 200;
    var restHeight = 200;
    var list = container || div();
    list.autoFix = true;
    var saved_itemIndex;
    addClass(list, 'list-' + $Y.toLowerCase());
    onappend(list, function () {
        if (saved_itemIndex !== void 0) scrollTo(saved_itemIndex);
    });
    //取底部元素
    var getLastElement = function () {
        var children = list.children;
        for (var cx = children.length - 1; cx >= 0; cx--) {
            var child = children[cx]
            if (isFinite(child.index)) {
                return child;
            }
        }
        return null;
    };
    //取顶部元素
    var getFirstElement = function () {
        var children = list.children;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx]
            if (isFinite(child.index)) {
                return child;
            }
        }
        return null;
    };
    var getFirstVisibleElement = function () {
        var children = list.children;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            var child = children[cx]
            if (isFinite(child.index) && child.offsetTop + child.offsetHeight >= list.scrollTop) {
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
    }
    //设置当前下标
    var scrollTo = function (itemIndex) {
        if (!list.isMounted) {
            saved_itemIndex = itemIndex;
            return;
        }
        var index = itemIndex | 0;
        var ratio = itemIndex - index;
        if (index < 0) index = 0;
        var childrenMap = getChildrenMap();
        var offsetBottom = 0, ratioTop = 0, offset = +index || 0, last_item = getFirstElement() || null, last_index = last_item && last_item.index;
        while (offsetBottom - ratioTop <= list.clientHeight + cache_height) {
            var item = childrenMap[offset];
            if (!item) {
                item = generator(offset);
                if (!item) break;
                item.index = offset;
                if (last_index > index) {
                    list.insertBefore(item, last_item);
                } else {
                    list.insertBefore(item, getNextSibling(last_item));
                }
                last_item = item;
            }
            if (++offset - index > 600) throw new Error("多于600个元素需要绘制！");
            offsetBottom = item.offsetTop + item.offsetHeight;
            if (ratio && !ratioTop) {
                ratioTop = +(ratio * getFirstVisibleElement().offsetHeight).toFixed(0);
            }
        }
        for (var k in childrenMap) {
            if (!(k <= offset && k >= index)) {
                remove(childrenMap[k]);
            }
        }
        list.scrollTop = ratioTop;
    };
    //计算当前高度
    var currentY = function () {
        var firstElement = getFirstElement();
        if (!firstElement) return saved_itemIndex * restHeight;
        return firstElement.index * firstElement.offsetHeight + list.scrollTop;
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
    //滚动一定的距离
    var scrollBy = function (deltaY) {
        var childrenMap = getChildrenMap();
        if (deltaY > 0) {
            var last_element = getLastElement();
            if (!last_element || !last_element.offsetHeight) return;
            let { scrollTop } = list;
            scrollTop = scrollTop + deltaY;
            var offsetBottom = getOffsetHeight(last_element) + last_element.offsetTop;
            var offset = last_element.index || 0;
            //追加元素到底部
            while (offsetBottom <= scrollTop + list.clientHeight + cache_height) {
                offset++;
                var item = childrenMap[offset];
                if (!item) {
                    item = generator(offset);
                    if (!item) {
                        restHeight = 0;
                        break;
                    } else if (!restHeight) {
                        restHeight = 200;
                    }
                    item.index = offset;
                    list.insertBefore(item, getNextSibling(last_element));
                }
                if (!item.offsetHeight) {
                    console.warn(item, '!item.offsetHeight');
                    break;
                }
                offsetBottom = item.offsetTop + getOffsetHeight(item);
                last_element = item;
            }
            //移除顶部不可见的元素
            if (scrollTop > last_element.offsetTop + last_element.offsetHeightt - list.clientHeight) {
                scrollTop = last_element.offsetTop + last_element.offsetHeightt - list.clientHeight;
            }
            var collection = [];
            for (var k in childrenMap) {
                let item = childrenMap[k];
                if (item.offsetTop + getOffsetHeight(item) + cache_height < scrollTop) {
                    collection.push(item);
                } else {
                    break;
                }
            }
            if (collection.length) {
                var item = collection[collection.length - 1];
                scrollTop -= item.offsetTop + getOffsetHeight(item);
                remove(collection);
            }
            //滚动到相应的位置
            list.scrollTop = scrollTop;
        } else {
            var first_element, flag_element = first_element = getFirstElement();
            if (!flag_element || !isFinite(flag_element.offsetTop)) return;
            offset = flag_element.index || 0;
            var offsetTop = flag_element.offsetTop;
            var scrollTop = deltaY + list.scrollTop;
            //追加元素到顶部
            while (scrollTop < cache_height) {
                offset--;
                if (!(offset >= 0)) {
                    break;
                }
                var item = childrenMap[offset];
                if (!item) {
                    item = generator(offset);
                    if (!item) break;
                    item.index = offset;
                    childrenMap[offset] = item;
                    list.insertBefore(item, first_element);
                    scrollTop += flag_element.offsetTop - offsetTop;
                    first_element = item;
                }
            }
            //滚动到相应位置
            //-list_scrollTop + lElem_offsetTop = -list_newScrollTop + lElem_newOffsetTop + deltaY
            list.scrollTop = scrollTop;
            scrollTop = list.scrollTop;
            //移除不可见元素
            var last_element = getLastElement();
            var { clientHeight } = list;
            while (last_element && last_element.offsetTop > clientHeight + scrollTop + cache_height) {
                remove(last_element);
                last_element = getLastElement();
            }
        }
    };
    //导出方法
    list.go = scrollTo;
    list.Height = function () {
        var firstElement = getFirstElement();
        if (!firstElement) return restHeight;
        return firstElement.index * firstElement.offsetHeight + list.offsetHeight + list.scrollTop + restHeight;
    };
    list.Top = function (y) {
        if (isFinite(y)) {
            var last_y = currentY();
            if (last_y !== y) {
                scrollBy(y - last_y);
            }
        }
        return currentY();
    };
    list.index = function () {
        var firstElement = getFirstVisibleElement();
        if (!firstElement) return saved_itemIndex;
        var index = firstElement.index;
        var scrolled = (list.scrollTop - firstElement.offsetTop) / firstElement.offsetHeight;
        return index + scrolled;
    };
    vbox(list, $Y);
    return list;
}
var allArgumentsNames = arguments[arguments.length - 1];
var xlist = arriswise(ylist, allArgumentsNames.concat([].slice.call(arguments, 0)));

var getGeneratorFromArray = function (source) {
    return function (index) {
        if (index >= source.length) return null;
        return block(source[index]);
    }
};

var getGenerator = function (container) {
    if (!container) return;
    var template = document.createElement("div");
    appendChild(template, [].concat.apply([], container.childNodes));
    container.insertBefore = _slider.insertBefore;
    container.appendChild = _slider.appendChild;
    return function (index) {
        if (!container.src || index >= container.src.length) return;
        var template1 = template.cloneNode();
        template1.innerHTML = template.innerHTML;
        if (!template1.childNodes.length) return template1;
        var item = template1.childNodes[0];
        item.with = [].concat.apply([], template1.childNodes).slice(1);
        var newScope = container.src[index];
        render(item, newScope, [container.$scope]);
        render(item.with, newScope, [container.$scope]);
        return item;
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
                    container = arg;
            }
        }
    }
    var bindSrc = null;
    if (container instanceof Array) {
        generator = getGeneratorFromArray(container);
        bindSrc = container;
        container = div();
    } else if (container && !generator) {
        var generator = getGenerator(container);
        on('changes')(container, function (event) {
            if (event.changes.src) {
                container.go(container.index() || 0);
            };
        });
    }

    if (!$Y) {
        if (container) {
            $Y = container.getAttribute("direction");
        }
    }
    $Y = /[xh]$/i.test($Y) ? "X" : "Y";
    var list = ($Y === "X" ? xlist : ylist)(container, generator, $Y);
    if (bindSrc) {
        list.src = bindSrc;
        container.go(container.index() || 0);
    }
    return list;
}