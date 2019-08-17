var saved_list;
var _remove = function () {
    saved_list && remove(saved_list);
    saved_list = null;
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
    var bindEvent = function () {
        on("change")(list, function (event) {
            if (target.multiple) {
            } else {
                target.value = this.value;
                dispatch(target, "change");
            }
        });
        onclick(list, function (event) {
            if (!event.defaultPrevented) {
                _remove();
            }
        });
        onmousedown(list, preventDefault);
        onremove(list, () => saved_list = null);
    };
    if (list) {
        var initList = function () {
        };
    } else {
        var savedOptions;
        var initList = function () {
            var allOptions = [].concat.apply([], target.querySelectorAll("option"));
            if (deepEqual.shallow(allOptions, savedOptions)) return;
            savedOptions = allOptions;
            list = selectList(allOptions, target.multiple);
            if (!target.multiple) {
                onclick(list, _remove);
            }
            bindEvent();
        };
    }
    var mousedown = function () {
        initList();
        if (saved_list !== list) {
            _remove();
            if (document.activeElement !== target) target.focus();
            popup(list, target);
            saved_list = list;
        }
        else _remove();
    };
    onclick(target, mousedown);
    return target;
}