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
var removeByBlur = function () {
    if (!getTargetIn(this, document.activeElement)) _remove();
};
on('touchend')(window, function (event) {
    var { activeElement } = document;
    var target = getTargetIn(activeElement, event.target);
    if (target) return;
    if (saved_list) {
        if (getTargetIn(saved_list, event.target)) return;
    }
    activeElement.blur();
})
function select(target, list, removeOnSelect, direction) {
    if (/^[yvxh]/i.test(removeOnSelect)) {
        direction = removeOnSelect;
        removeOnSelect = arguments[3];
    }
    if (!target) {
        target = document.createElement("select");
    }
    target.tabIndex = 0;
    onblur(target, removeByBlur);
    if (/select/i.test(target.tagName)) {
        onmousedown(target, preventDefault);
    }
    var onlistchange = function () {
        if (target.multiple) {
        } else {
            target.value = this.value;
            dispatch(target, "change");
        }
    };
    var onlistclick = function (event) {
        if (!event.defaultPrevented) {
            _remove();
        }
    };
    var onlistremove = function () {
        if (saved_list === this) {
            saved_list = null;
        }
    };
    var bindEvent = function () {

        on("change")(list, onlistchange);
        if (removeOnSelect !== false && removeOnSelect !== null) {
            onclick(list, onlistclick);
        }
        if (removeOnSelect === null) {
            onmousedown(list, preventDefault);
        }
        onremove(list, onlistremove);
    };
    if (isNode(list)) {
        var initList = function () {
            bindEvent();
            initList = function () { };
        };
        var setIcon = function () {
        };
    } else {
        var savedOptions;
        removeOnSelect = null;
        var lastSelected = [];
        var setIcon = function () {
            var hasIcon = false;
            var selected = [].filter.call(target.querySelectorAll("option"), function (o) {
                if (!hasIcon && o.getAttribute("icon")) {
                    hasIcon = true;
                }
                return o.selected;
            });
            if (deepEqual.shallow(lastSelected, selected)) return;
            lastSelected = selected;
            if (hasIcon) {
                var icon = selected.length === 1 && selected[0].getAttribute('icon');
                if (icon) {
                    css(target, { backgroundImage: `url('${icon}')` });
                } else {
                    css(target, { backgroundImage: '' });
                }
                target.setAttribute('iconed', '');
            } else {
                target.removeAttribute('iconed');
            }
        };
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
            popup(list, target, direction);
            saved_list = list;
        }
        else _remove();
    };
    if (!target.renders) {
        target.renders = [];
    }
    target.renders.push(setIcon);
    onclick(target, mousedown);
    return target;
}