function getTreeFromArray(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    var path = [root];
    for (var cx = 0, dx = array.length; cx < dx; cx++) {
        var arg = array[cx];
        var item = new Item(arg);
        item.root = root;
        for (var cy = path.length - 1; cy >= 0; cy--) {
            var parentElement = path[cy];
            if (parentElement.tab < arg.tab) {
                item.parent = parentElement;
                parentElement.push(item);
                path.splice(cy + 1, path.length - cy - 1, item);
                break;
            }
            parentElement.parent.count += parentElement.count || parentElement.length || 1;
        }
    }
    while (path.length > 1) {
        var item = path.pop();
        path[path.length - 1].count += item.count || item.length || 1;
    }
    return root;
}

function getArrayFromTree(root, skipClosed = true) {
    var path = [root], pathcx = [0];
    var result = [];
    var max_deep = 1;
    loop: while (pathcx.length) {
        var pathindex = pathcx.length - 1;
        var cx = pathcx[pathindex];
        var item = path[pathindex];
        if (cx >= item.length) {
            path.pop();
            pathcx.pop();
            continue loop;
        }
        var elem = item[cx];
        elem.parent = item;
        result.push(elem);
        pathcx[pathindex] = ++cx;
        if (!skipClosed || !elem.closed) {
            if (elem.length) {
                path.push(elem);
                pathcx.push(0);
                if (pathcx.length > max_deep) {
                    max_deep = pathcx.length;
                }
            }
        }
    }
    result.deep = max_deep;
    return result;
}
function appendTo(parent, datas) {
    var tab = parent && parent.tab + 1 || 1;
    var length = parent.length;
    datas.map(function (data) {
        if (data instanceof Object) {
            data.tab = tab;
            var item = new Item(data);
            item.parent = parent;
            item.root = parent.root;
            parent.push(item);
        }
    });

    var delta = parent.length - length;
    while (parent) {
        parent.count += delta;
        parent = parent.parent;
    }
}
function tree() {
    var element, generator;
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (arg instanceof Function) {
            generator = arg;
        }
    });
    var dom = [], root = null;
    var changed_index, changed_offset;
    var saved_top, saved_offset, timer = 0, timeout = function () {
        clearTimeout(timer);
        timer = setTimeout.apply(this, arguments);
    };
    var banner = list(element, function (index) {
        var coms = dom;
        if (index >= coms.length) return;
        var com = coms[index];
        var span;
        if (!com) return;
        var tabs = new Array(com.tab + 1).join("<t></t>");
        if (isFunction(generator)) {
            var elem = generator(index, com);
            if (!elem) return;
            span = document.createElement('div');
            span.innerHTML = tabs;
            span.appendChild(elem);
        } else {
            span = div();
            html(span, `${tabs}<c>${com.name}</c>${com.test ? "<i>_test</i>" : ""}${com.closed && com.length ? " <a>(" + com.count + ")</a>" : ""}`);
        }
        var _div = button(span);
        addClass(_div, "tab" + com.tab);
        if (com.checked || com.is_checked) {
            addClass(_div, "checked");
        } else if (com.selected || com.is_selected) {
            addClass(_div, "selected");
        }
        if (com.actived || com.is_actived) {
            addClass(_div, "actived");
        }
        if (com.class) {
            addClass(_div, com.class);
        }
        var setState = function (closed = com.closed) {
            removeClass(com.target, 'open empty closed');
            if (com.length) {
                if (closed) {
                    addClass(com.target, 'closed')
                } else {
                    addClass(com.target, 'open')
                }
            } else {
                addClass(com.target, 'empty');
            }
        };
        _div.style.zIndex = 1;
        com.target = _div;
        if (index === changed_index) {
            saved_top = _div;
            setState(true);
        } else {
            setState();
        }
        if (index === changed_offset) {
            saved_offset = _div;
        }
        onclick(_div, function () {
            if (!active(banner, com.value, com)) {
                return;
            };
            com.closed = !com.closed;
            changed_index = index;
            changed_offset = com.length + index;

            var z0 = function () {
                com.forEach(function (e) {
                    if (e.target) e.target.style.zIndex = 0;
                })
            };
            var z1 = function () {
                com.forEach(function (e) {
                    if (e.target) e.target.style.zIndex = 1;
                });
                setState();
            };
            var run = function () {
                // debugger;

                refresh();
                if (!com.closed && com.length && saved_top) {
                    var change_elem = saved_top.nextSibling;
                    if (!change_elem) return;
                    var margin_top;
                    if (!saved_offset || !saved_offset.offsetTop) {
                        margin_top = saved_top.offsetHeight + saved_top.offsetTop - banner.scrollHeight;
                    } else {
                        margin_top = saved_top.offsetHeight + saved_top.offsetTop - saved_offset.offsetTop - saved_offset.offsetHeight;
                    }
                    setState(false);
                    z0();
                    var res = transition(change_elem, { transition: "margin-top .2s ease-out", marginTop: margin_top + "px" });
                    timeout(z1, res);
                };
            };
            if (com.closed && com.length) {
                z0();
                setState(true);
                var bottom = com[com.length - 1].target;
                var top = com[0].target;
                if (!top) return run();
                var marginTop;
                if (!bottom) {
                    marginTop = top.offsetTop - banner.scrollHeight;
                } else {
                    marginTop = top.offsetTop - bottom.offsetTop - bottom.offsetHeight;
                }
                var res = transition(top, {
                    transition: 'margin-top .2s ease-out',
                    marginTop: marginTop + "px"
                }, true);
                if (res) timeout(run, res);
                else run();
            } else {

                run();
            }
        });

        return _div;
    });


    banner.setData = function (src) {
        if (isArray(src)) {
            if (src[0] && 'tab' in src[0]) {
                root = getTreeFromArray(src);
            } else {
                root = getTreeFromData(src);
            }
            dom = getArrayFromTree(root);
        }
    };
    banner.addData = function (data, parent = root) {
        appendTo(parent, data);
        dom = getArrayFromTree(root);
    };
    var refresh = function () {
        var index = banner.index();
        dom = getArrayFromTree(root, true);
        remove(banner.children);
        banner.go(index);
    };
    banner.refresh = refresh;

    return banner;
}