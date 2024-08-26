var singleClick = function () {
    var node = this.parentNode;
    if (node.activeNode === this) {
        remove(node);
        if (node.target) {
            node.target.focus();
        }
        return;
    }
    if (node.activeNode) {
        if (isObject(node.activeNode.origin)) node.activeNode.origin.selected = false;
        node.activeNode.removeAttribute("selected");
    }
    this.setAttribute("selected", "");

    node.activeNode = this;
    if (node.value === this.value) return;
    node.value = this.value;
    node.name = this.name;
    if (isObject(this.origin)) this.origin.selected = true;
    dispatch(node, "change");
    if (getTargetIn(node, document.activeElement)) document.activeElement.blur();
    remove(node);
};
var multipleClick = function () {
    var node = this.parentNode;
    var values = node.value;
    var index = values.indexOf(this.value);
    if (index < 0) {
        values.push(index);
        this.setAttribute("selected", "");
    } else {
        values.splice(index, 1);
        this.removeAttribute("selected");
    }
    if (isObject(this.origin)) this.origin.selected = true;
    dispatch(node, "change");
};

var searchinput = function () {
    var ipt = document.createElement("input");
    ipt.placeholder = '搜索';
    on('mounted')(ipt, function () {
        requestAnimationFrame(function () {
            ipt.focus();
        });
    });
    return ipt;
};

function main() {
    var children, multiple, addable, generator, page;
    for (let a of arguments) {
        if (a instanceof Array) children = a;
        switch (typeof a) {
            case "function":
                generator = a;
                break;
            case "boolean":
            case "undefined":
                if (multiple === void 0) multiple = !!a;
                else addable = !!a;
                break;
            case "object":
                if (isNode(a)) {
                    page = a;
                    if (!generator) generator = getGenerator(page);
                }
                else if (a.length) children = a;
                break;

        }
    }
    if (!page) page = div();
    page.value = multiple ? [] : "";
    var clicker = multiple ? multipleClick : singleClick;
    var itemMap = Object.create(null);
    function createItem(option) {
        var key = option.key || option.value;
        if (key in itemMap) return itemMap[key];
        var item = itemMap[key] = document.createElement('div');
        item.setAttribute("item", '');
        item.innerHTML = option.innerHTML || option.name;
        item.name = option.name || option.innerHTML;
        item.origin = option;
        var icon = option.getAttribute ? option.getAttribute("icon") : option.icon;
        if (icon) {
            if (!hasIcon) {
                page.setAttribute('iconed', '');
            }
            hasIcon = true;
            css(item, { backgroundImage: `url('${icon}')` });
        }
        item.value = key;
        if (item.value === page.value) {
            iconed = icon;
            item.setAttribute("selected", "");
            page.activeNode = item;
            page.value = key
        }
        else if (multiple && option.selected) {
            item.setAttribute("selected", "");
            page.value.push(key);
        }
        if (option.disabled) {
            item.setAttribute('disabled', '');
        } else {
            onclick(item, clicker);
            on("mouseenter")(item, mouseenter);
        }
        return item;

    }
    var mouseenter = function () {
        if (!mouse) return;
        focus = this.index;
        setFocus();
    };


    var hasIcon = false, iconed = '';

    if (children.length > 12) {
        var ipt = searchinput()
        page.insertBefore(ipt, page.firstChild);
        var searchtext = function () {
            if (this.value) children = searchResult;
            else children = searchResult.source;
            if (isMounted(this)) searchResult.search(this.value);
        };
        var searchResult = search(ipt.value, children, a => {
            return isObject(a) ? getName(a) : String(a);
        });
        searchResult.callback = function () {
            if (!searchResult.complete) {
                page.setAttribute('searching', '');
            }
            else {
                if (searchResult.searchText && !searchResult.length) {
                    page.setAttribute('empty', '');
                }
                else {
                    page.removeAttribute('empty');
                }
                page.removeAttribute('searching');
            }
            itemMap = Object.create(null);
            page.clean();
            page.go(0);
        }
        on('remove')(ipt, function () {
            searchResult.abort();
        });
        on('input')(ipt, searchtext);
        on('keyup')(ipt, searchtext);
        on('change')(ipt, searchtext);

    }
    var page = list(page, function (i) {
        if (i < 0 || i >= children.length) return;
        return createItem(generator ? generator(i, children[i]) : children[i]);
    });
    once("mounted")(page, function () {
        var index = 0;
        for (var cx = 0, dx = children.length; cx < dx; cx++)if (children[cx].selected) index = cx;
        page.clean();
        page.go(index);
        if (adder) {
            remove(adder);
            appendChild(page, adder);
        }
    })
    if (addable) {
        var adder = document.createElement("div");;
        adder.innerHTML = "<a>添加</a><a>管理</a>";
        adder.setAttribute('insert', '');
        button(adder.firstChild);
        button(adder.children[1]);
        on("click")(adder, async function (event) {
            event.preventDefault();
            var target = getTargetIn(this, event.target, false);
            switch (target) {
                case this.children[0]:
                    var a = prompt("请输入", a => {
                        if (!a) return false;
                        if (a in itemMap) {
                            return `选项 ${a} 已存在！`;
                        }
                    });
                    page.with = a;
                    on('remove')(a, function () {
                        page.with = null;
                    });
                    a = await a;
                    if (a in itemMap) return false;
                    cast(page.target, "add-option", a);
                    children.push({ name: a, key: a });
                    remove(page.children);
                    page.go(children.length - 1);
                    appendChild(page, adder);
                    break;
                case this.children[1]:
                    var options = Array.apply(null, children);
                    var edit = selectListEdit(options.slice(0));
                    page.with = edit;
                    on("remove")(edit, function () {
                        itemMap = Object.create(null);
                        page.with = null;
                        children.splice(0, children.length);
                        children.push.apply(children, edit.$scope.options.map(o => ({ key: o.key || o.value, name: o.name || o.innerHTML })))
                        cast(page.target, 'set-options', edit.$scope.options);
                        page.clean();
                        remove(adder);
                        page.go(0);
                        appendChild(page, adder);
                    });
                    popup(edit, [.5, .5]);
                    break;
            }
        });
        adder.setAttribute("adder", '');
    }
    page.icon = iconed;
    var focus = 0, focused, mouse = false;
    var setFocus = function () {
        var e = page.getIndexedElement(focus);
        if (e === focused) return;
        if (focused) removeClass(focused, 'focus');
        focused = e;
        if (e) addClass(e, 'focus');
        mouse = false;
    };
    var setMouse = function () {
        mouse = true;
    }
    onmousemove(page, setMouse);
    onmousewheel(page, setMouse);
    var moveFocus = function (delta) {
        focus += delta;
        if (focus < 0) focus = 0;
        if (focus >= children.length) focus = children.length - 1;
        page.scrollIfNotCover(focus);
        setFocus();
    };
    bind('keydown.up')(page, function () {
        moveFocus(-1);
    });
    bind('keydown.down')(page, function () {
        moveFocus(1);
    });
    bind('keydown.tab')(page, function (event) {
        if (document.activeElement === page.target) event.preventDefault();
        moveFocus(event.shiftKey ? -1 : 1);
    });
    bind("keydown.home")(page, function (e) {
        moveFocus(-focus);
    });
    bind("keydown.end")(page, function (e) {
        var coverIndex = children.coverCount > focus + 1 ? children.coverCount - 1 : children.length - 1;
        moveFocus(coverIndex - focus);
    });
    bind("keydown.pagedown")(page, function (e) {
        page.scrollBy(page.clientHeight);
        focus = page.index() | 0;
        moveFocus(0);
    })
    bind("keydown.pageup")(page, function (e) {
        page.scrollBy(-page.clientHeight);
        focus = page.index() | 0;
        moveFocus(0);
    })
    var enter = function (e) {
        if (e.defaultPrevented) return;
        e.preventDefault();
        var e = page.getIndexedElement(focus);
        if (e) e.click();
    };
    bind('keydown.enter')(page, enter);
    bind('keydown.space')(page, enter);
    on('mousedown')(page, e => !/^input$/i.test(e.target.tagName) && e.preventDefault());
    return page;
}