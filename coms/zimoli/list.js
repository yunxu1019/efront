// 中文编码 utf8
var _slider = createElement(div);
var cache_height = 200;
/**
 * 
 * @param {Boolean|Array|Function} generator 
 */
function list(generator, $Y = "Y") {
    if ($Y === "X") {
        var $height = "width", $top = "left", $X = "Y";
    } else if ($Y === "Y") {
        var $height = "height", $top = "top", $X = "X";
    }
    var $Height = $height.charAt(0).toUpperCase() + $height.slice(1);
    var $Top = $top.charAt(0).toUpperCase() + $top.slice(1);
    var $scrollTop = "scroll" + $Top;
    var $offsetTop = "offset" + $Top;
    var $offsetHeight = "offset" + $Height;
    var restHeight = 2000;
    var list = div();
    list.autoFix = true;
    var saved_itemIndex;
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
            if (isFinite(child.index) && child[$offsetTop] + child[$offsetHeight] >= list[$scrollTop]) {
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
        while (offsetBottom - ratioTop <= list[$offsetHeight] + cache_height) {
            var item = childrenMap[offset];
            if (!item) {
                item = generator(offset);
                if (!item) break;
                item.index = offset;
                if (last_index > index) {
                    appendChild.before(last_item, item);
                } else {
                    appendChild(list, item);
                }
            }
            if (++offset - index > 600) throw new Error("多于600个元素需要绘制！");
            offsetBottom = item[$offsetTop] + item[$offsetHeight];
            if (ratio && !ratioTop) {
                ratioTop = +(ratio * getFirstVisibleElement()[$offsetHeight]).toFixed(0);
            }
        }
        for (var k in childrenMap) {
            if (!(k <= offset && k >= index)) {
                remove(childrenMap[k]);
            }
        }
        list[$scrollTop] = ratioTop;
    };
    //计算当前高度
    var currentY = function () {
        var firstElement = getFirstElement();
        if (!firstElement) return saved_itemIndex * restHeight;
        return firstElement.index * firstElement[$offsetHeight] + list[$scrollTop];
    };
    //滚动一定的距离
    var scrollBy = function (deltaY) {
        var children = list.children;
        var childrenMap = getChildrenMap();
        if (deltaY > 0) {
            var last_element = getLastElement();
            if (!last_element || !last_element[$offsetHeight]) return;
            var offsetHeight = list[$offsetHeight];
            var offsetBottom = last_element[$offsetHeight] + last_element[$offsetTop] - offsetHeight - list[$scrollTop];
            offsetBottom += deltaY;
            var offset = last_element.index || 0;
            //追加元素到底部
            while (offsetBottom <= offsetHeight + cache_height) {
                offset++;
                var item = childrenMap[offset];
                if (!item) {
                    item = generator(offset);
                    if (!item) {
                        restHeight = 0;
                        break;
                    } else if (!restHeight) {
                        restHeight = 2000;
                    }
                    item.index = offset;
                    appendChild(list, item);
                }
                if (!item[$offsetHeight]) break;
                offsetBottom = item[$offsetTop] + item[$offsetHeight];
            }
            //移除顶部不可见的元素
            var scrollTop = list[$scrollTop] + deltaY;
            var collection = [];
            for (var k in childrenMap) {
                var item = childrenMap[k];
                if (item[$offsetTop] + item[$offsetHeight] + cache_height < scrollTop) {
                    collection.push(item);
                } else {
                    break;
                }
            }
            if (collection.length) {
                var item = collection[collection.length - 1];
                scrollTop -= item[$offsetTop] + item[$offsetHeight];
                remove(collection);
            }
            //滚动到相应的位置
            list[$scrollTop] = scrollTop;
        } else {
            var last_element = getFirstElement();
            if (!last_element || !isFinite(last_element[$offsetTop])) return;
            offset = last_element.index || 0;
            var offsetTop = last_element[$offsetTop];
            var scrollTop = deltaY + list[$scrollTop];
            //追加元素到顶部
            while (scrollTop + last_element[$offsetTop] < cache_height) {
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
                    appendChild.before(children[0], item);
                }
            }
            //滚动到相应位置
            //-list_scrollTop + lElem_offsetTop = -list_newScrollTop + lElem_newOffsetTop + deltaY
            scrollTop = scrollTop + last_element[$offsetTop] - offsetTop;
            list[$scrollTop] = scrollTop;
            //移除不可见元素
            while (children.length && children[children.length - 1][$offsetTop] > list[$offsetHeight] + scrollTop + cache_height) {
                remove(children[children.length - 1]);
            }
        }
    };
    //导出方法
    list.go = scrollTo;
    list[$Height] = function () {
        var firstElement = getFirstElement();
        if (!firstElement) return restHeight;
        return firstElement.index * firstElement[$offsetHeight] + list[$offsetHeight] + list[$scrollTop] + restHeight;
    };
    list[$Top] = function (y) {
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
        var scrolled = (list[$scrollTop] - firstElement[$offsetTop]) / firstElement[$offsetHeight];
        return index + scrolled;
    };
    vbox(list, $Y);
    list.style[$height] = null;
    list.style.whiteSpace = "nowrap";// 防止水平方向时过载
    return list;
}