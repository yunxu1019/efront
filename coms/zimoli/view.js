
var prototype = {
    resizable: false,
    closeable: true,
    showTitle: true,
    viewTitle: '',
    left: 0,
    top: 0,
    add(element) {
        return this;
    },
    hide() {
        this.savePosition();
        remove(this);
        return this;
    },
    load(url) {
        return this;
    },
    setTitle(arg) {
        var scope = this;
        if (!this.titleElements) {
            this.titleElements = generate(viewTitle);
            scope.showTitle = true;
            appendChild(this, [].concat.apply([], this.titleElements));
            drag.on(this.titleElements[0], this);
        }
        switch (typeof arg) {
            case "object":
                extend(scope, arg);
                break;
            case "boolean":
                this.showTitle = arg;
                break;
            case "number":
                scope.color = rgba(arg);
            case "string":
                scope.viewTitle = arg;
        }
        render(this.titleElements, this);
        return this;
    },

    release() {
        remove(this);
        return this;
    },
    closeView() {
        this.release();
        return this;
    },
    moveTo(left, top) {
        this.left = left;
        this.top = top;
        this.loadPosition();
        return this;
    },
    moveBy(deltax, deltay) {
        return this.moveTo(this.offsetLeft + deltax, this.offsetTop + deltay);
    },
    show() {
        this.style.position = 'fixed';
        popup(this);
        this.loadPosition();
        return this;
    },
    savePosition() {
        this.left = this.offsetLeft;
        this.top = this.offsetTop;
        return this;
    },
    loadPosition() {
        move.call(this, this.left, this.top);
        return this;
    }
};

function getScrollbarWidth() {
    var div = document.createElement("div");
    div.style.position = 'absolute';
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    var w = div.offsetWidth;
    remove(div);
    return w;
}
var init = function () {
    init = function () { };
    css("." + view.className.split(/\s+/)[0] + ">.body", {
        marginRight: -getScrollbarWidth() + "px"
    });
};
var isType = function (target, type) {
    // 记得小时候，不论是苍蝇还是蚊子，飞起来都是有声音的。最近看到的一种像蚊子一样小的飞虫，喜欢像苍蝇一样趴在食物上，飞起来却听不到声音。
    // 是我的听力下降了？还是外界太过嘈杂？还是飞虫拍打翅膀的频率超出了我的听觉范围？还是飞行可以不产生声音？
    return target.hasAttribute(type) || hasClass(target, type);
}
var resize2 = function () {
    var head, body, foot;
    for (var c of this.children) {
        if (isType(c, "head")) head = c;
        else if (isType(c, "body")) body = c;
        else if (isType(c, "foot")) foot = c;
    }
    if (head && body) {
        var height = head.offsetHeight;
        css(head, {
            marginBottom: fromOffset(-height),
        })
        css(body, {
            paddingTop: fromOffset(height)
        });
    }
    if (foot && body) {
        var height = foot.offsetHeight;
        css(body, {
            paddingBottom: fromOffset(height)
        });
        css(foot, {
            marginTop: fromOffset(-height)
        })
    }
    if (body) {
        if (body.scrollHeight + body.offsetTop > this.clientHeight) {
            css(body, { height: fromOffset(this.clientHeight) });
        }
        else {
            css(body, { height: '' });
        }
    }
};
function view(element) {
    var w = isNode(element) ? element : document.createElement("form");
    init();
    extend(w, prototype);
    if (w !== element) {
        extend(w, element);
        once("append")(w, function () {
            if (w.draggable !== true && w.draggable !== false) {
                w.draggable = /^(fixed|absolute)$/i.test(getComputedStyle(w).position);
            }
            if (w.draggable) w.setAttribute('draggable', 'draggable');
        })
        if (w.resizable) resize.on(w);
    }
    resizingList.set(w, resize2);
    w.reshape = lazy(resize2);
    onmounted(w, w.reshape);
    return w;
}