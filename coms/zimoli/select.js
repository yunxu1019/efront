var saved_list;
var _remove = function () {
    saved_list && remove(saved_list);
};
var preventDefault = function (event) {
    event.preventDefault();
};
var lastTimeClick = 0;
function select(target, list) {
    if (!target) {
        target = createElement(div);
    }
    target.tabIndex = 0;
    onblur(target, _remove);
    if (/select/i.test(target.tagName)) {
        onmousedown(target, preventDefault);
    }
    if (!list) {
        var allOptions = [].concat.apply([], target.querySelectorAll("option"));
        list = selectList(allOptions, target.multiple);
        if (!target.multiple) {
            onclick(list, _remove);
        }
        on("change")(list, function (event) {
            if (target.multiple) {
            } else {
                target.value = this.value;
                dispatch(target, "change");
            }
        });
    }
    onmousedown(list, preventDefault);
    css(list, {
        zIndex: zIndex()
    });
    onremove(list, () => saved_list = null);
    var mousedown = function () {
        if (saved_list !== list) {
            _remove();
            if (document.activeElement !== target) target.focus();
            popup(list, target);
            saved_list = list;
        }
        else _remove();
    };
    onclick(list, function (event) {
        if (!event.defaultPrevented) {
            _remove();
        }
    });
    onclick(target, mousedown);
    return target;
}