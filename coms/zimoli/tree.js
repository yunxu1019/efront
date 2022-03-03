function getTreeFromArray(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    root.total = 0;
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
            parentElement.parent.total += (parentElement.total || parentElement.length) + 1;
        }
    }
    while (path.length > 1) {
        var item = path.pop();
        path[path.length - 1].count += item.count || item.length || 1;
    }
    return root;
}
function buildCrack(com, set) {
    var count = com.length;
    for (var cx = 0, dx = com.length; cx < dx; cx++) {
        var c = com[cx];
        if (!c.isClosed() && c.length) {
            count += buildCrack(c, false);
        }
    }
    if (set !== false) {
        com.crack = count;
    }
    return count;
}

function getCrackTarget(com) {
    for (var cx = com.length - 1; cx >= 0; cx--) {
        var c = com[cx];
        if (!c.isClosed() && c.length) {
            var t = getCrackTarget(c);
            if (t) {
                return t;
            }
        }
        if (c.target) return c.target;
    }
    return com.target;
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
        if (!skipClosed || !elem.isClosed()) {
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
        if (isObject(data)) {
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
        if (com.target) {
            com.target.index = index;
            com.target.refresh();
            return com.target;
        }
        var tabs = new Array(com.tab + 1).join("<t></t>");
        if (isFunction(generator)) {
            var elem = generator(index, com instanceof Item ? com.value : com, com);
            if (!elem) return;
            span = document.createElement('span');
            span.innerHTML = tabs;
            elem.insertBefore(span, elem.firstChild);
            span = elem;
        } else {
            span = document.createElement("node");
            html(span, `${tabs}<c>${com.name}</c>${com.test ? "<i>_test</i>" : ""}<a class=count>${com.count}</a>`);
        }
        var _div = button(span);
        _div.setAttribute("node", '');
        _div.index = index;

        if (!com.saved) {
            com.saved = {};
        }
        _div.refresh = function () {
            var saved = com.saved;
            if (saved.checked !== com.isChecked()) {
                saved.checked = com.isChecked();
                if (saved.checked) {
                    addClass(_div, "checked");
                } else {
                    removeClass(_div, 'checked');
                }
            } else if (saved.selected !== com.isSelected()) {
                saved.selected = com.isSelected();
                if (saved.selected) {
                    addClass(_div, "selected");
                } else {
                    removeClass(_div, 'selected');
                }
            }
            if (saved.actived !== com.isActive()) {
                saved.actived = com.isActive();
                if (saved.actived) {
                    addClass(_div, "actived");
                } else {
                    removeClass(_div, 'actived');
                }
            }
            var class1 = com.getClass();
            if (class1) {
                addClass(_div, class1);
            }
            _div.style.zIndex = 1;
            _div.itemid = com.id;
            if (_div.index === changed_index) {
                saved_top = _div;
                setState(true);
            } else {
                setState();
            }
            if (_div.index === changed_offset) {
                saved_offset = _div;
            }
            com.closed = com.isClosed();
        };
        addClass(_div, "tab" + com.tab);
        var setState = function (closed = com.isClosed()) {
            var saved = com.saved;
            if (com.length) {
                if (saved.closed !== closed) {
                    saved.closed = closed;
                    if (closed) {
                        addClass(com.target, 'closed');
                        removeClass(com.target, 'open empty');
                    } else {
                        addClass(com.target, 'open');
                        removeClass(com.target, 'closed empty');
                    }
                }
                if (saved.empty) {
                    removeClass(com.target, 'empty');
                    saved.empty = false;
                }
            } else {
                if (!saved.empty) {
                    saved.empty = true;
                    addClass(com.target, 'empty');
                }
                if (saved.closed === true || saved.closed === false) {
                    removeClass(com.target, 'closed open');
                    saved.closed = null;
                }
            }
        };
        com.target = _div;
        _div.refresh();
        onclick(_div, function (event) {
            var isClosed = com.isClosed();
            if (!active(banner, com.value, com, element.$src ? createItemTarget.call(element, com.value) : _div)) {
                return;
            }
            if (isClosed === com.isClosed() && com.length) {
                com.setClosed(!isClosed);
            }
            var index = this.index;
            changed_index = index;
            buildCrack(com);
            changed_offset = com.crack + index;
            if (!com.length) {
                dom.forEach(d => d.target && d.target.refresh());
                return;
            }
            var z0 = function () {
                var z = function (e) {
                    if (e.target) e.target.style.zIndex = 0;
                    if (e instanceof Array) e.forEach(z);
                };
                com.forEach(z);
            };
            var z1 = function () {
                var z = function (e) {
                    if (e.target) e.target.style.zIndex = 1;
                    if (e instanceof Array) e.forEach(z);
                };
                com.forEach(z);
                setState();
            };
            var time = size => (Math.log(-size / 30 + 2) * 100 | 0) / 1000;
            if (com.isClosed() && com.length) {
                z0();
                setState(true);
                var bottom = getCrackTarget(com);
                var top = com[0].target;
                if (!top) return refresh();
                var marginTop;
                if (!bottom || !bottom.offsetTop) {
                    marginTop = top.offsetTop - banner.scrollHeight;
                } else {
                    marginTop = top.offsetTop - bottom.offsetTop - bottom.offsetHeight;
                }
                var res = transition(top, {
                    transition: `margin-top ${time(marginTop)}s ease-out`,
                    marginTop: fromOffset(marginTop)
                }, true);
                if (res) timeout(refresh, res);
                else refresh();
            } else if (!com.isClosed() && com.length) {
                refresh();
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
                var res = transition(change_elem, { transition: `margin-top ${time(margin_top)}s ease-out`, marginTop: fromOffset(margin_top) }, false);
                timeout(z1, res);
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
            refresh();
        }
    };
    banner.addData = function (data, parent = root) {
        appendTo(parent, data);
        refresh();
    };
    var refresh = function () {
        var index = banner.index();
        var needremoves = dom.map(d => d.target).filter(d => !!d);
        dom = getArrayFromTree(root, true);
        needremoves.forEach(_div => {
            delete _div.initialStyle;
            css(_div, "transition:;margin-top:;");
        });
        remove(needremoves);
        banner.go(index || 0);
    };
    banner.refresh = refresh;

    return banner;
}