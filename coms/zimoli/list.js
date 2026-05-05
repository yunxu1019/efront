// 中文编码 utf8
var getNodeTarget = function (node) {
    if (node.nodeType === 8 && node.$template) {
        var t = node.$template;
        if (!isFinite(t.index)) t.index = node.index;
        return node.$template;
    }
    return node;
};
//取底部元素
var getLastElement_ = function (nodeType) {
    var children = this.childNodes;
    for (var cx = children.length - 1; cx >= 0; cx--) {
        var child = children[cx];
        if (!(isFinite(child.index) || nodeType === 2 && child.offsetHeight)) continue;
        child = getNodeTarget(child);
        return child;
    }
    return null;
};
//取底部元素
var getIndexedElement_ = function (index) {
    var children = this.childNodes;
    for (var cx = children.length - 1; cx >= 0; cx--) {
        var child = children[cx];
        if (child.index !== index) continue;
        child = getNodeTarget(child);
        return child;
    }
    return null;
};

//取顶部元素
var getFirstElement_ = function (nodeType) {
    var children = this.childNodes;
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var child = children[cx];
        if (!(isFinite(child.index) && (nodeType === 0 || child.index !== null) || nodeType === 2 && child.offsetHeight)) continue;
        if (nodeType === 1) child = getNodeTarget(child);
        return child;
    }
    return null;
};
var getFirstVisibleElement_ = function (deltaY) {
    var children = this.childNodes;
    var { scrollTop } = this;
    var paddingTop = parseFloat(getComputedStyle(this).paddingTop);
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
var getRelativeElement_ = function (element, delta) {
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
var isSticky = child => isElement(child) && /^(sticky|fixed|absolute)$/.test(getComputedStyle(child).position);
var hasCover_ = function (child) {
    var scrollTop = this.scrollTop;
    if (child.offsetTop + child.offsetHeight < scrollTop || child.offsetTop >= scrollTop + this.clientHeight) return false;
    if (child.offsetTop <= scrollTop && child.offsetTop + child.offsetHeight >= scrollTop + this.clientHeight) return true;
    if (child.offsetTop < scrollTop) return false;
    if (child.offsetTop + child.offsetHeight > scrollTop + this.clientHeight) return false;
    return true;
};

var scrollIfNotCover_ = function (index) {
    var c = this.getIndexedElement(index);
    if (!c) return this.scrollTo(index);
    if (this.hasCover(c)) return;
    var scrollTop = this.scrollTop;
    var deltat = scrollTop - c.offsetTop;
    var deltab = c.offsetTop + c.offsetHeight - scrollTop - this.clientHeight;
    if (deltat > 0) {
        return this.scrollBy(-deltab > deltat ? -deltat : -deltab);
    }
    if (deltab > 0) {
        return this.scrollBy(deltab < deltat ? deltat : deltab);
    }
};
var getLastVisibleElement_ = function (deltaY) {
    var { scrollTop } = this;
    deltaY = +deltaY;
    var paddingBottom = parseFloat(getComputedStyle(this).paddingBottom);
    if (deltaY) scrollTop += deltaY;
    var children = this.children;
    for (var cx = children.length - 1; cx >= 0; cx--) {
        var child = children[cx];
        if (!isFinite(child.index)) continue;
        var c = getNodeTarget(child);
        if (isSticky(c)) continue;
        if (c.offsetTop + 1 <= scrollTop + this.clientHeight - paddingBottom) {
            return deltaY === 0 ? child : c;
        }
    }
    return null;
};
//元素表
var getChildrenMap = function (list) {
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
var createItem_ = function (index) {
    var item = this.generator_(index);
    if (isNode(item)) {
        item.index = index;
    }
    return item;
};
//设置当前下标
var scrollTo_ = function (itemIndex) {
    if (isNaN(itemIndex)) return;
    this.$lastY_ = NaN;
    itemIndex = +itemIndex;
    this.__animated = false;
    if (!this.offsetHeight && !this.offsetWidth && !isMounted(this)) {
        this.itemIndex_saved_ = itemIndex;
        return;
    }
    var cache_height = Math.min(this.offsetHeight, screen.height >> 1);
    var index = itemIndex | 0;
    if (itemIndex < 0) index--;
    var ratio = itemIndex - index || 0;
    var childrenMap = getChildrenMap(this);
    var offsetBottom = 0, ratioTop = 0, offset = index, last_item = this.getFirstElement(0) || null, last_index = last_item && last_item.index || offset;
    if (!last_item) {
        last_item = this.lastChild;
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
            item = this.createItem(offset);
            if (!item || delta > 0 && offsetBottom - ratioTop > this.clientHeight + cache_height) {
                if (delta < 0) break;
                delta = -1;
                offset = index - 1;
                bottom_item = this.getIndexedElement(offsetb);
                last_item = this.getIndexedElement(index);
                last_index = index;
                continue;
            }
        } else {
            delete childrenMap[offset];
        }
        if (last_index > offset) {
            if (item.nextElementSibling !== last_item) this.insertBeforeList(item, last_item);
        } else {
            if (item.previousElementSibling !== item) this.insertBeforeList(item, getNextSibling(last_item));
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
            '框架尺寸', this.offsetHeight,
            '当前绘制到', ratioTop,
            `当前元素到顶部元素占用`, offsetBottom - ratioTop
        ), new Error(i18n`多于600个元素需要绘制！`);
    }
    for (var k in childrenMap) {
        remove(childrenMap[k]);
    }
    var indexed_item = this.getIndexedElement(index) || bottom_item;
    if (indexed_item) {
        var firstElement = this.getFirstElement(1) || indexed_item;
        this.scrollTop = -firstElement.offsetTop + indexed_item.offsetTop + indexed_item.offsetHeight * ratio;
    }
};
//计算当前高度
var currentY_ = function () {
    var firstElement = this.getFirstElement();
    if (!firstElement) return;
    var index = firstElement.index;
    firstElement = getNodeTarget(firstElement);
    if (index < 0) index = index - index | 0;
    return index * firstElement.offsetHeight + this.scrollTop;
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
var insertBeforeList_ = function (elem, flag) {
    if (flag) {
        var w = elem.with;
        if (w) {
            if (w[w.length - 1].nextSibling === flag) return;
        }
        else if (elem.nextSibling === flag) return;
    }
    this.insertBefore(elem, flag);
    if (elem.with) for (var w of elem.with) this.insertBefore(w, flag);
};

var patchBottom_ = function (deltaY = 0) {
    var cache_height = Math.min(this.offsetHeight, screen.height >> 1);
    var limitHeight = screen.height + cache_height;
    var childrenMap = getChildrenMap(this);
    var last_element = this.getLastElement(1);
    if (!last_element || !last_element.offsetHeight) return;
    let { scrollTop } = this;
    scrollTop += deltaY;
    var offsetBottom = getOffsetHeight(last_element) + last_element.offsetTop;
    var offset = last_element.index || 0;
    //追加元素到底部
    while (offsetBottom <= scrollTop + limitHeight) {
        offset++;
        var item = childrenMap[offset];
        if (!item) {
            item = this.createItem(offset);
            if (!item) {
                this.restHeight_ = 0;
                break;
            } else if (!this.restHeight_) {
                this.restHeight_ = cache_height;
            }
            this.insertBeforeList(item, getNextSibling(last_element));
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
        var { paddingCount = 0, paddingMax } = this;
        if (item) item = item.nextSibling;
        if (!paddingMax) while (item && item.index % this.group) {
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
    return scrollTop - this.scrollTop;
};
var patchTop_ = function (deltaY = 0) {
    var cache_height = Math.min(this.offsetHeight, screen.height >> 1);

    var childrenMap = getChildrenMap(this);
    var first_element, flag_element = first_element = this.getFirstElement(1);
    if (!flag_element || !isFinite(flag_element.offsetTop)) return;
    var offset = flag_element.index || 0;
    var offsetTop = flag_element.offsetTop;
    var { scrollTop } = this;
    scrollTop += deltaY;
    //追加元素到顶部
    var targetHeight = screen.height + cache_height + first_element.offsetTop;
    var { paddingCount, paddingMax } = this;
    if (!(paddingCount > 0 && paddingMax > 0 && paddingCount < paddingMax) || !(scrollTop < targetHeight)) {
        paddingCount = 0;
    }
    while (scrollTop < targetHeight || paddingCount > 0 || offset % this.group) {
        offset--;
        if (!(scrollTop < targetHeight)) {
            paddingCount--;
        }
        var item = childrenMap[offset];
        if (!item) {
            item = this.createItem(offset);
            if (!item) break;
            this.insertBeforeList(item, first_element);
            item = getNodeTarget(item);
            scrollTop += flag_element.offsetTop - offsetTop;
            offsetTop = flag_element.offsetTop;
        }
        first_element = item;
    }
    //滚动到相应位置
    if (scrollTop < 0) scrollTop = 0;
    //-list_scrollTop + lElem_offsetTop = -list_newScrollTop + lElem_newoffsetTop + deltaY
    var last_element = this.getLastElement(1);
    var { clientHeight } = this;
    while (last_element && last_element.offsetTop > clientHeight + scrollTop + cache_height) {
        remove(last_element);
        remove(last_element.$comment);
        last_element = this.getLastElement(1);
    }
    return scrollTop - this.scrollTop;
};
//滚动一定的距离
var scrollBy_ = function (deltaY, animate = false) {
    var deltaScroll;
    if (deltaY > 0) {
        deltaScroll = this.patchBottom(deltaY, animate);
    } else {
        deltaScroll = this.patchTop(deltaY, animate);
    }
    if (deltaScroll) {
        if (animate && this.scrollBy_) {
            this.scrollTop += deltaScroll - deltaY;
            this.scrollBy_({
                top: deltaY,
                behavior: 'smooth'
            });
            this.__animated = true;
        } else {
            this.scrollTop += deltaScroll;
            this.__animated = false;
        }
    }
};

var $stopY_ = function (t, spd) {
    // 最大距离 S，最大初始速度 V = a * t = 1，求加速 a
    // S = 0.5 * a * t * t = 0.5 * V * t;
    // => t = S * 2 / V = S * 2, a = V / t = 1 / (S * 2);
    //
    // 加速度a = 1 / (S * 2)，对任意s，有t = sqrt(2 * s / a) = sqrt(2 * s * S * 2) = 2 * sqrt(s * S);
    // 对应速度 v = a * t = 1 / (S * 2) * 2 * sqrt(s * S) = sqrt(s * S) / S;
    // 临近零点的距离 s0 = a / 2 = 1 / (S * 4);
    var firstElement = this.getFirstVisibleElement();
    var lastElement = this.getLastVisibleElement();
    if (!firstElement || !lastElement || !this.clientHeight) return false;
    if (isNaN(this.$lastY_)) return false;
    var paddingTop = parseFloat(getComputedStyle(this).paddingTop);
    var paddingBottom = parseFloat(getComputedStyle(this).paddingBottom);
    var scrolled_t = (this.scrollTop - firstElement.offsetTop + paddingTop) / firstElement.offsetHeight;
    if (scrolled_t > 1) scrolled_t -= scrolled_t | 0;
    var last_y = this.$lastY_;
    if (spd[0] > 0) {
        var target_ty = last_y + (1 - scrolled_t) * firstElement.offsetHeight;
    } else {
        var target_ty = last_y - scrolled_t * firstElement.offsetHeight;
    }
    var scrolled_b = (this.scrollTop + this.clientHeight - lastElement.offsetTop - paddingBottom) / lastElement.offsetHeight;
    if (scrolled_b < 0) scrolled_b -= scrolled_b - 1 | 0;
    if (spd[0] > 0) {
        var target_by = last_y + (1 - scrolled_b) * lastElement.offsetHeight;
    } else {
        var target_by = last_y - scrolled_b * lastElement.offsetHeight;
    }
    var S = calcPixel(30);
    var target_y = Math.abs(target_ty - last_y) > Math.abs(target_by - last_y) ? target_by : target_ty;
    var delta = Math.min(S, this.clientHeight >> 2);
    var absy = Math.abs(target_y - last_y), y;
    if (absy >= delta) {
        return false;
    }
    if (absy < 1) y = target_y;
    else {
        var speed = Math.sqrt(absy * S) / S;
        y = last_y + (target_y > last_y ? speed : -speed);
    }
    this.$Top(y);
    if (target_y === y) {
        return false;
    }
    return true;
};
var $Height = function () {
    var elem = this.getLastElement(2);
    var listRestHeight = elem ? elem.offsetHeight + elem.offsetTop - this.scrollTop : this.clientHeight;
    var paddingHeight = elem ? 0 : this.restHeight_;
    if (listRestHeight < this.clientHeight) listRestHeight = this.clientHeight;
    return this.currentY_() + listRestHeight + paddingHeight;
};
var $Top = function (y) {
    if (isFinite(y)) {
        this.$lastY_ = y;
        var last_y = this.currentY_();
        if (y !== last_y) {
            this.scrollBy(y - last_y);
        }
    }
    return this.currentY_();
};
var index_ = function (update) {
    if (update === false) return this.itemIndex_saved_;
    var firstVisible = this.getFirstVisibleElement(0);
    if (!firstVisible) return this.itemIndex_saved_;
    var index = firstVisible.index;
    firstVisible = getNodeTarget(firstVisible);
    if (!firstVisible) return this.itemIndex_saved_;
    var firstElement = this.getFirstElement(1);
    var scrolled = (this.scrollTop - firstVisible.offsetTop + firstElement.offsetTop + .5 | 0) / firstVisible.offsetHeight;
    return index + scrolled;
};
var topIndex_ = function () {
    var element = this.getFirstElement(1);
    return element ? element.index : 0;
};
var setFocus_ = function (focused, animate = true) {
    if (isElement(focused) && (focused.hasAttribute("disabled") || focused.hasAttribute("line"))) return;
    if (focused === (focused | 0)) {
        var index = focused;
        focused = this.getIndexedElement(index);
        if (!focused) {
            this.go(index);
            focused = this.getIndexedElement(index);
        }
    }
    if (!focused) {
        if (this.focused) {
            removeClass(this.focused, 'focus');
            this.focused = null;
        }
        return;
    }
    if (this.focused === focused) return;
    if (this.focused) removeClass(this.focused, 'focus');
    addClass(focused, "focus");
    this.focused = focused;
    while (focused && focused.parentNode !== this) focused = focused.parentNode;
    if (!focused) return;
    var scrollTop = this.scrollTop;
    var firstElement = this.getFirstElement(1);
    var sideheight = 0;
    if (firstElement) {
        sideheight += parseFloat(getComputedStyle(firstElement).paddingTop + firstElement.clientTop);
        sideheight += (firstElement.offsetHeight - sideheight - sideheight) * .3;
        sideheight += parseFloat(getComputedStyle(this).paddingTop);
    }
    if (focused.offsetTop + focused.offsetHeight + sideheight > this.scrollTop + this.clientHeight) {
        scrollTop = focused.offsetTop + focused.offsetHeight + sideheight - this.clientHeight;
    }
    if (focused.offsetTop < this.scrollTop + sideheight) {
        scrollTop = focused.offsetTop - sideheight;
    }
    if (scrollTop !== this.scrollTop) this.scrollBy(scrollTop - this.scrollTop, animate);
};

var moveFocus_ = function (delta, emit = true) {
    var focused = this.focused;
    var newIndex = 0, total = 0;
    if (delta === 'up') delta = -1;
    if (delta === 'down') delta = 1;
    if (typeof delta === 'string') switch (delta.toLowerCase()) {
        case "home":
            newIndex = 0;
            delta = 1;
            break;
        case "end":
            var lastElement = this.getLastElement(1);
            if (!lastElement) return;
            newIndex = lastElement.index;
            delta = -1;
            break;
        case "pageup":
            var firstElement = this.getFirstVisibleElement();
            if (!firstElement) return;
            newIndex = firstElement.index;
            this.scrollBy(-this.clientHeight + firstElement.offsetHeight);
            var lastElement = this.getLastVisibleElement();
            if (lastElement.index < newIndex) newIndex = lastElement.index;
            delta = -1;
            break;
        case "pagedown":
            var lastElement = this.getLastVisibleElement();
            if (!lastElement) return;
            newIndex = lastElement.index;
            this.scrollBy(this.clientHeight - lastElement.offsetHeight);
            var firstElement = this.getFirstVisibleElement();
            if (firstElement.index > newIndex) newIndex = firstElement.index;
            delta = 1;
            break;
        default:
            return false;
    }
    else if (!focused) {
        var lastElement = this.getLastElement(1);
        if (!lastElement) return;
        total = lastElement.index + 1;
        if (delta > 0) newIndex = 0;
        else newIndex = total - 1;
    }
    else {
        var newIndex = focused.index + delta;
        var lastElement = this.getLastElement(1);
        var total = lastElement.index + 1;
        if (newIndex < 0) newIndex = total + newIndex;
        if (newIndex > total - 1) newIndex = newIndex - total;
    }
    var savedIndex = newIndex;
    var e = this.getIndexedElement(newIndex);
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
        e = this.getIndexedElement(newIndex);
    }
    if (!e) this.setFocus(null);
    else if (emit) this.setFocus(e, true), dispatch(this, 'focused');
    else this.setFocus(e);
};
var mounted = function () {
    if (isFinite(this.itemIndex_saved_)) this.go(this.itemIndex_saved_);
};
var unmount = function () {
    this.itemIndex_saved_ = this.index();
};
var resize = function () {
    this.patchBottom(0);
};

const cache_height = 2000;
function ylist(container, generator, $Y) {
    /**
     * @type {HTMLElement}
    */
    var list = container;
    list.$restHeight_ = cache_height;
    list.autoFix = true;
    list.itemIndex_saved_ = 0;
    addClass(list, 'list-y');
    list.__animated = false;
    list.__generator = generator;
    list.currentY_ = currentY_;

    bind('resize')(list, resize);
    list.getLastVisibleElement = getLastVisibleElement_;
    list.getFirstVisibleElement = getFirstVisibleElement_;
    list.$lastY_ = NaN;
    list.$Height = $Height;
    list.$Top = $Top;
    list.index = index_;
    list.topIndex = topIndex_;
    list.setFocus = setFocus_;
    list.moveFocus = moveFocus_;
    //导出方法
    list.go = scrollTo_;
    this.scrollTo = scrollTo_;

    if (list.scrollBy !== scrollBy_ && !/^i(Phone|Pod|Watch|Pad)|^Mac/i.test(navigator.platform)) list.scrollBy_ = list.scrollBy;
    list.scrollBy = scrollBy_;


    list.getIndexedElement = getIndexedElement_;
    list.patchBottom = patchBottom_;
    list.patchTop = patchTop_;
    list.scrollIfNotCover = scrollIfNotCover_;
    list.getFirstElement = getFirstElement_;
    list.createItem = createItem_;
    list.generator_ = generator;
    list.insertBeforeList = insertBeforeList_;
    list.getLastElement = getLastElement_;
    list.hasCover = hasCover_;

    vbox(list, 'Y');

    on("remove")(list, unmount);
    onmounted(list, mounted);
    /**
     * @param {Element|null} focused 
     * @param {boolean} animate
     */


    /**
     * @param {number|"up"|"down"|"home"|"end"|"pageup"|"pagedown"}delta
     * @param {boolean} emit
     */

    list.getRelativeElement = getRelativeElement_;
    return list;
}

var allArgumentsNames = arguments[arguments.length - 1];
if (allArgumentsNames.done) return ylist;
allArgumentsNames.done = true;
var xlist = arriswise.call(this, arguments[arguments.length - 3], arguments).apply(this, arguments);

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
return list;
