var singleClick = function () {
    var node = this.parentNode;
    if (node.activeNode === this) return;
    if (node.activeNode) node.activeNode.removeAttribute("selected");
    this.setAttribute("selected", "");
    node.activeNode = this;
    if (node.value === this.value) return;
    node.value = this.value;
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
function main(children, multiple) {
    var list = div();
    list.value = multiple ? [] : "";
    var firstValue = false;
    var clicker = multiple ? multipleClick : singleClick;
    var hasIcon = false, iconed = '';
    appendChild(list, [].map.call(children, function (option) {
        var item = div();
        item.innerHTML = option.innerHTML;
        var icon = option.getAttribute("icon");
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
        onclick(item, clicker);
        return item;
    }));
    if (hasIcon) {
        list.setAttribute('iconed', '');
    }
    list.icon = iconed;
    return list;
}