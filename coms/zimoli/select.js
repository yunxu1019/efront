var saved_list;
var _remove = function () {
    var removing_list = saved_list;
    if (removing_list) {
        setTimeout(function run() {
            if (removing_list !== saved_list) return remove(removing_list);
            var { activeElement } = document;
            a: if (!getTargetIn(removing_list, activeElement)) {
                var extras = [].concat(removing_list.with);
                for (var e of extras) {
                    if (getTargetIn(e, activeElement)) break a;
                }
                remove(removing_list);
                if (removing_list === saved_list) saved_list = null;
                return;
            }
            once('blur')(activeElement, function () {
                if (!isMounted(this)) return removing_list.target.focus();
                _remove();
            });
        });
    }
};
var preventDefault = function (event) {
    event.preventDefault();
};
var preventDefault1 = function (event) {
    if (saved_list) return;
    event.preventDefault();
}
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
    if (direction === undefined) {
        direction = target.getAttribute("direction") || target.direction;
    }
    target.tabIndex = 0;
    onblur(target, removeByBlur);
    if (/select/i.test(target.tagName)) {
        onmousedown(target, preventDefault);
        care(target, 'add-option', function (a) {
            var o = document.createElement('option');
            o.value = a.value || a;
            o.innerHTML = a.name || a;
            this.appendChild(o);
        });
        care(target, 'set-options', function (options) {
            this.innerHTML = options.map(o => `<option value="${o.value}">${o.name}</option>`).join("");
        });
        on('focus')(target, preventDefault);
    }
    var onlistchange = function () {
        if (target.multiple) {
        } else {
            if (target.value !== this.value) {
                if (!savedOptions) {
                    target.innerHTML = `<option selected value="${this.value}">${this.name || this.value}</option>`
                }
                target.value = this.value;
            }
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
        on("keydown.up")(target, preventDefault);
        on("keydown.down")(target, preventDefault);
        on("keydown.enter")(target, preventDefault1);
        on("keydown.space")(target, preventDefault1);
        var pop = function () {
            if (saved_list !== list) mousedown.call(this);
        };
        on("keydown.down")(target, pop);
        on("keydown.enter")(target, pop);
        onremove(list, onlistremove);
    };
    if (isNode(list)) {
        var initList = function () {
            bindEvent();
            list.value = target.value;
            initList = function () { };
        };
        var setIcon = function () {
        };
    }
    else if (target.$src) {
        var generator = getGenerator(target);
        var optionsMap = {};
        var initList2 = function (src) {
            src.forEach(s => {
                optionsMap[s.key] = s;
                if (isObject(s)) s.selected = s.key === target.value;
            });
            list = selectList(generator, src, !!target.multiple, !!target.editable);
            list.value = target.value;
            if (!target.multiple) {
                onclick(list, onlistclick);
            }
            if (target.value) {
                target.setValue(target.value);
            }
            bindEvent();
        };
        target.setValue = function (v) {
            var s = optionsMap[v];
            this.innerHTML = `<option selected value="${v}">${s ? s.name : ''}</option>`;
            this.value = v;
            if (s) s.selected = true;
            if (list) list.value = v;
        };
        care(target, initList2);
        var initList = function () {
        };
        var setIcon = function () {
        };
    }
    else {
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
            list = selectList(allOptions, !!target.multiple, !!target.editable);
            if (!target.multiple) {
                onclick(list, onlistclick);
            }
            removeOnSelect = undefined;
            bindEvent();
        };
    }
    var mousedown = function () {
        initList();
        if (saved_list !== list || !isMounted(list)) {
            if (saved_list && saved_list !== list) _remove();
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