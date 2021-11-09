var singleClick = function () {
    var node = this.parentNode;
    if (node.activeNode === this) return;
    if (node.activeNode) node.activeNode.removeAttribute("selected");
    this.setAttribute("selected", "");
    node.activeNode = this;
    if (node.value === this.value) return;
    node.value = this.value;
    node.name = this.name;
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
    dispatch(node, "change");
};

function main(children, multiple, addable) {
    var list = div();
    list.value = multiple ? [] : "";
    var firstValue = false;
    var clicker = multiple ? multipleClick : singleClick;
    var itemMap = Object.create(null);
    function createItem(option) {
        if (option.value in itemMap) return itemMap[option.value];
        var item = itemMap[option.value] = document.createElement('div');

        item.setAttribute("item", '');
        item.innerHTML = option.innerHTML || option.name;
        item.name = option.name || option.innerHTML;
        var icon = option.getAttribute ? option.getAttribute("icon") : option.icon;
        if (icon) {
            hasIcon = true;
            css(item, { backgroundImage: `url('${icon}')` });
        }
        item.value = option.value;
        if (option.selected) {
            iconed = icon;
            if (multiple) {
                item.setAttribute("selected", "");
                list.value.push(option.value);
            } else if (!firstValue) {
                item.setAttribute("selected", "");
                list.activeNode = item;
                firstValue = true;
                list.value = option.value
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
    appendChild(list, [].map.call(children, createItem));
    if (addable) {
        var adder = document.createElement("div");;
        adder.innerHTML = "<a>添加</a><a>管理</a>";
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
                    list.with = a;
                    on('remove')(a, function () {
                        list.with = null;
                    });
                    a = await a;
                    if (a in itemMap) return false;
                    cast(list.target, "add-option", a);
                    list.insertBefore(createItem({
                        name: a,
                        value: a,
                    }), adder);
                    break;
                case this.children[1]:
                    var options = [].slice.call(list.children, 0, list.children.length - 1);
                    var edit = selectListEdit(options.slice(0));
                    list.with = edit;
                    on("remove")(edit, function () {
                        list.with = null;
                        remove([].slice.call(list.children, 0, list.children.length - 1));
                        appendChild.before(adder, edit.$scope.options.map(createItem));
                        cast(list.target, 'set-options', edit.$scope.options);
                    });
                    popup(edit, [.5, .5]);
                    break;
            }
        })
        adder.setAttribute("adder", '');
        list.appendChild(adder)
    }
    if (hasIcon) {
        list.setAttribute('iconed', '');
    }
    list.icon = iconed;
    on('mousedown')(list, e => e.preventDefault());
    return list;
}