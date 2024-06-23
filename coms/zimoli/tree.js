var getTreeFromArray = Tree.fromArray;
function buildCrack(com, set) {
    var coms = com;
    while (coms.joined) coms = coms[0];
    var count = coms.length;
    for (var cx = 0, dx = coms.length; cx < dx; cx++) {
        var c = coms[cx];
        if (!c.isClosed() && c.length) {
            count += buildCrack(c, false);
        }
    }
    if (set !== false) {
        com.crack = count;
    }
    return count;
}

function getChildrenBottom(com) {
    while (com.joined) com = com[0];
    for (var cx = com.length - 1; cx >= 0; cx--) {
        var c = com[cx];
        if (!c.isClosed() && c.length) {
            var t = getChildrenBottom(c);
            if (t) {
                return t;
            }
        }
        if (c.$target) return c.$target;
    }
    return com.$target;
}

var getArrayFromTree = Tree.toArray;
var appendTo = Tree.appendTo;
var getOffset = e => getScreenPosition(e, false);
function tree() {
    var element, generator;
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (arg instanceof Function) {
            generator = arg;
        }
    });
    if (!generator && element && "$src" in element && element.childNodes.length) {
        generator = getGenerator(element, 'node');
    }
    var dom = [], root = null;
    var changed_index, changed_offset;
    var saved_top, saved_offset, timer = 0, timeout = function (call, time) {
        clearTimeout(timer);
        timer = setTimeout(call, time);
    };
    care(element, function () {
        banner.setData(this.src);
        this.src = root;
    });
    var createChild = function (com, index) {
        var span;
        var tabs = new Array(com.tab + 1).join("<t></t>");
        if (isFunction(generator)) {
            var elem = generator(index, com.constructor === Item ? com.value : com, com);
            if (!elem) return;
            var c = com;
            while (c.joined) {
                c = c[0];
                var e = generator(index, c.constructor === Item ? c.value : c, c);
                appendChild(elem, e.childNodes);
            }
            span = document.createElement('span');
            span.innerHTML = tabs;
            span.setAttribute("tabs", '');
            elem.insertBefore(span, elem.firstChild);
            span = elem;
        } else {
            var name = c => `<c>${c.name}</c>${c.test ? "<i>_test</i>" : ""}`;
            var c = com;
            var names = [name(c)];
            while (c.joined) {
                c = c[0];
                names.push(name(c));
            }
            span = document.createElement("node");
            html(span, `<span tabs>${tabs}</span>${names.join('/')}<a class=count>${com.count}</a>`);
            span.count = span.lastElementChild;
        }
        var _div = button(span);
        _div.setAttribute("node", '');

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
            if (_div.$index === changed_index) {
                saved_top = _div;
                setState(true);
            } else {
                setState();
            }
            if (_div.$index === changed_offset) {
                saved_offset = _div;
            }
            com.closed = com.isClosed();
            if (_div.count && +_div.count.innerHTML !== com.count) html(_div.count, com.count);
        };
        addClass(_div, "tab" + com.tab);
        var setState = function (closed = com.isClosed()) {
            var saved = com.saved;
            if (com.length) {

                if (saved.closed !== closed || _div !== com.$target) {
                    saved.closed = closed;
                    if (closed) {
                        addClass(_div, 'closed');
                        removeClass(_div, 'open empty');
                    } else {
                        addClass(_div, 'open');
                        removeClass(_div, 'closed empty');
                    }
                }
                if (saved.empty) {
                    removeClass(_div, 'empty');
                    saved.empty = false;
                }
            } else {
                if (!saved.empty) {
                    saved.empty = true;
                    addClass(_div, 'empty');
                }
                if (saved.closed === true || saved.closed === false) {
                    removeClass(_div, 'closed open');
                    saved.closed = null;
                }
            }
        };
        var getChildrenTop = function (com) {
            while (com.joined) com = com[0];
            return com[0]?.$target;
        }
        onclick(_div, function (event) {
            var isClosed = com.isClosed();
            if (!active(banner, com.value, com, banner.$src ? createItemTarget.call(banner, com.value) : _div)) {
                return;
            }
            if (isClosed === com.isClosed() && com.length) {
                com.setClosed(!isClosed);
            }
            var index = this.$index;
            changed_index = index;
            buildCrack(com);
            changed_offset = com.crack + index;
            if (!com.length) {
                dom.forEach(d => d.$target && d.$target.refresh());
                return;
            }
            var z0 = function () {
                var z = function (e) {
                    if (e.$target) e.$target.style.zIndex = 0;
                    if (e instanceof Array) e.forEach(z);
                };
                com.forEach(z);
            };
            var z1 = function () {
                var z = function (e) {
                    if (e.$target) e.$target.style.zIndex = 1;
                    if (e instanceof Array) e.forEach(z);
                };
                com.forEach(z);
                setState();
                css(banner, { paddingBottom: '' });
            };
            var time = size => (Math.log(-size / 30 + 2) * 100 | 0) / 1000;
            if (com.isClosed() && com.length) {
                z0();
                setState(true);
                var bottom = getChildrenBottom(com);
                var top = getChildrenTop(com);
                if (!top) return refresh();
                var marginTop;
                if (!bottom || !bottom.offsetTop) {
                    marginTop = top.offsetTop - banner.scrollHeight;
                } else {
                    marginTop = top.offsetTop - bottom.offsetTop - bottom.offsetHeight;
                }
                css(banner, { paddingBottom: -marginTop });
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
                var paddingBottom = -margin_top;
                css(banner, { paddingBottom });
                var res = transition(change_elem, { transition: `margin-top ${time(margin_top)}s ease-out`, marginTop: fromOffset(margin_top) }, false);
                timeout(z1, res + 60);
            }
        });
        return _div;
    };
    var banner = list(element, function (index) {
        var coms = dom;
        if (index >= coms.length) return;
        var com = coms[index];
        if (!com) return;
        if (com.$target) {
            com.$target.$index = index;
            com.$target.refresh();
            return com.$target;
        }
        var _div = createChild(com, index);
        com.$target = _div;
        _div.$index = index;
        _div.refresh();
        return _div;
    });

    banner.setData = function (src) {
        root = new Tree(src);
        refresh();
    };
    banner.addData = function (data, parent = root) {
        appendTo(parent, data);
        refresh();
    };
    if (!('joined' in banner)) {
        var joined = banner.hasAttribute("join") && !/^(false|0|null|nill?)/i.test(banner.getAttribute('join')) || banner.join;
        banner.joined = joined != undefined ? joined : 7;
    }
    var stickys = [];
    var setSticky = function () {
        var p = stickys[stickys.length - 1];
        var f = banner.getFirstVisibleElement(stickys.top + 1);
        if (!f) return;
        var limitHeight = f.offsetTop - banner.scrollTop;
        var c = dom[f.$index];
        var useLimit = false;
        if (p) {
            var d = dom[p.$index];
            if (d.tab == c.tab) {
                var { top, height } = getOffset(p);
                if (top + height >= limitHeight) {
                    var ic = c.parent.indexOf(c);
                    useLimit = c.parent[ic - 1] === d;
                    if (useLimit) c = d;
                }
            }
            else {
                useLimit = true;
                limitHeight += getOffset(f).height;
            }
        }
        var parents = [];
        if (c.isClosed() || !c.length) c = c.parent;
        while (c.parent) {
            var p = c.parent;
            if (!p?.joined) {
                if (!c.$target) return;
                parents.push(c);
            }
            c = p;
        }
        stickys.forEach(s => s.sticky = false);
        parents = parents.map(p => {
            p.sticky = true;
            return p.$target;
        });
        parents.reverse();
        stickys.forEach(s => {
            if (!s.sticky) {
                css(s, {
                    position: "",
                    top: '',
                    zIndex: 1
                })
            }
        })
        stickys = parents;
        var top = 0;
        stickys.forEach(p => {
            var h = getOffset(p).height;
            var limit = useLimit && top + h > limitHeight;
            css(p, {
                position: 'sticky',
                zIndex: 2,
                top: limit ? limitHeight - h : top, zIndex: 3 - limit
            });
            top += h;
        });
        stickys.top = top;
    }
    var unSticky = function () {
        stickys.forEach(s => {
            css(s, {
                position: '',
                top: '',
                zIndex: 1
            })
        })
    }
    var refresh = function () {
        unSticky();
        var index = banner.index();
        var needremoves = dom.map(d => d.$target).filter(d => !!d);
        dom = getArrayFromTree(root, banner.joined);
        remove(needremoves, false);
        banner.go(index || 0);
        css(banner, { paddingBottom: '' });
        setSticky();
    };
    on("mounted")(banner, setSticky);
    on('scroll')(banner, setSticky);
    banner.refresh = refresh;

    return banner;
}