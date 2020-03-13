var saved_list;
var _remove = function () {
    var removing_list = saved_list;
    if (removing_list) {
        var target = this;
        setTimeout(function () {
            if (removing_list !== saved_list) return remove(removing_list);
            var { activeElement } = document;
            if (!getTargetIn(removing_list, activeElement)) {
                remove(removing_list);
                if (removing_list === saved_list) saved_list = null;
            } else {
                once('blur')(activeElement, function () {
                    setTimeout(function () {
                        if (document.activeElement === target) return;
                        _remove();
                    });
                });
            }
        });
    }
};
var preventDefault = function (event) {
    event.preventDefault();
};
var lastTimeClick = 0;
function select(target, list, removeOnSelect) {
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
        if (removeOnSelect !== false && removeOnSelect !== null) {
            onclick(list, function (event) {
                if (!event.defaultPrevented) {
                    _remove();
                }
            });
        }
        if (removeOnSelect === null) {
            onmousedown(list, preventDefault);
        }
        onremove(list, () => {
            if (saved_list === list) {
                saved_list = null;
            }
        });
    };
    if (list) {
        var initList = bindEvent;
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