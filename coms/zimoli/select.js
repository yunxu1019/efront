var saved_list;
var _remove = function () {
    var removing_list = saved_list;
    if (removing_list) {
        requestAnimationFrame(function run() {
            if (removing_list !== saved_list) return remove(removing_list);
            var { activeElement } = document;
            a: if (!getTargetIn(removing_list, activeElement) && !getTargetIn(removing_list.target, activeElement)) {
                var extras = [].concat(removing_list.with);
                for (var e of extras) {
                    if (getTargetIn(e, activeElement)) break a;
                }
                remove(removing_list);
                removing_list.target.focus();
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
});
var setEmpty = function () {
    if (isEmpty(this.value)) {
        if (!this.empty) {
            this.empty = true;
            this.setAttribute('empty', '')
        }
    }
    else {
        if (this.empty) {
            this.empty = false;
            this.removeAttribute('empty');
        }
    }
};
var setFocus = function () {
    if (saved_list && saved_list.target === this) {
        if (!this.focused) {
            this.focused = true;
            this.setAttribute('focus', '');
        }
    }
    else {
        if (this.focused) {
            this.focused = false;
            this.removeAttribute('focus');
        }
    }
}
function select() {
    var [target, list, removeOnSelect, direction] = arguments;
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
            this.innerHTML = options.map(o => `<option value="${o.key || o.value}">${o.name || o.innerHTML}</option>`).join("");
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
        on("touchend")(target, preventDefault);// 兼容火狐 android
        on("touchend")(list, preventDefault);// 兼容火狐 android
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
    var setListValue = function () {
        if (list.setVaLue instanceof Function) {
            list.setVaLue(target.value);
        }
        else {
            list.value = target.value;
        }
    };
    if (isNode(list)) {
        var initList = function () {
            bindEvent();
            setListValue();
            initList = function () { };
        };
        var setIcon = function () {
        };
    }
    else if (target.$src) {
        var generator = getGenerator(target);
        var optionsMap = {};
        var $key = 'key';
        var $name = 'name';
        var template = target.$template;
        var isIndexedKey = false;
        if (template) {
            var { attrs, binds } = template.childNodes[0].$struct;
            if (attrs.value) $key = attrs.value;
            if ($key === target.$src.indexName || $key === target.$src.keyName) isIndexedKey = true;
            $name = binds.bind || binds.html || binds.text || $name;
        }
        var initList2 = function (src) {
            if (isIndexedKey) optionsMap = src;
            else src.forEach(s => {
                optionsMap[seek(s, $key)] = s;
                if (isObject(s)) s.selected = s.key === target.value;
            });
            list = selectList(generator, src, !!target.multiple, !!target.editable);
            setListValue();
            if (!target.multiple) {
                onclick(list, onlistclick);
            }
            if (optionsMap[target.value]) target.setValue(target.value);
            bindEvent();
        };
        target.setValue = function (v) {
            var s = optionsMap[v];
            var name = s ? s.name : '';
            if (s && template) {
                name = this.$eval($name, this.$src.createScope(s, v, v));
            }
            this.innerHTML = `<option selected value="${v}">${name || ''}</option>`;
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
            if (shallowEqual(lastSelected, selected)) return;
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
            if (shallowEqual(allOptions, savedOptions)) return;
            savedOptions = allOptions;
            list = selectList(allOptions, !!target.multiple, !!target.editable);
            setListValue();
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
            if (saved_list && saved_list !== list) remove(saved_list);
            popup(list, target, direction);
            requestAnimationFrame(/*兼容safari*/function () {
                if (document.activeElement !== target) target.focus();
            })
            if (getTargetIn(list, document.activeElement)) {
                on('blur')(document.activeElement, removeByBlur);
            }
            saved_list = list;
        }
        else {
            remove(list);
            if (saved_list === list) {
                saved_list = null;
                target.focus();
            }
        }
    };
    if (!target.$renders) {
        target.$renders = [setEmpty, setFocus];
    }
    target.$renders.push(setIcon);
    onclick(target, mousedown);
    return target;
}