var saved_list;
var _remove = function () {
    saved_list && remove(saved_list);
    saved_list = null;
};
function select(target, list) {
    if (!target) {
        target = createElement(div);
    }
    target.tabIndex = 0;
    onblur(target, _remove);
    onmousedown(list, function (event) {
        event.preventDefault();
    });
    css(list, {
        zIndex: zIndex()
    });
    onmousedown(target, function () {
        if (saved_list !== list) {
            _remove();
            popup(list, target);
            saved_list = list;
        }
        else _remove();
    });
    return target;
}