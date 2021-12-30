var singleClick = function () {
    var node = this.parentNode;
    if (node.activeNode === this) return;
    if (node.activeNode) {
        if (node.activeNode.origin) node.activeNode.origin.selected = false;
        node.activeNode.removeAttribute("selected");
    }
    this.setAttribute("selected", "");

    node.activeNode = this;
    if (node.value === this.value) return;
    node.value = this.value;
    node.name = this.name;
    if (this.origin) this.origin.selected = true;
    dispatch(node, "change");
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
    if (this.origin) this.origin.selected = true;
    dispatch(node, "change");
};

function keyup() {
}

function keydown() { }

function main(children, multiple, addable) {
    var page = div();
    page.value = multiple ? [] : "";
    var clicker = multiple ? multipleClick : singleClick;
    var itemMap = Object.create(null);
    function createItem(option) {
        var key = option.key || option.value;
        if (key in itemMap) return itemMap[key];
        var item = itemMap[option.value] = document.createElement('div');
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
        if (option.selected) {
            iconed = icon;
            if (multiple) {
                item.setAttribute("selected", "");
                page.value.push(option.value);
            }
            else {
                item.setAttribute("selected", "");
                page.activeNode = item;
                page.value = option.value
            }
        }
        if (option.disabled) {
            item.setAttribute('disabled', '');
        } else {
            onclick(item, clicker);
        }
        return item;

    }
    var hasIcon = false, iconed = '';
    var page = list(page, function (i) {
        if (i < 0 || i >= children.length) return;
        return createItem(children[i]);
    });
    on("append")(page, function () {
        page.clean();
        var index = 0;
        for (var cx = 0, dx = children.length; cx < dx; cx++)if (children[cx].selected) index = cx;
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
                        if (a in itemMap) {
                            alert(`选项 ${a} 已存在！`);
                            return false;
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
                    page.insertBefore(createItem({
                        name: a,
                        value: a,
                    }), adder);
                    break;
                case this.children[1]:
                    var options = [].slice.call(children, 0, children.length);
                    var edit = selectListEdit(options.slice(0));
                    page.with = edit;
                    on("remove")(edit, function () {
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
    on('mousedown')(page, e => e.preventDefault());
    return page;
}