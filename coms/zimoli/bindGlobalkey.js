/**
 * @param {any} item
 * @param {Event} event
 */
var emitEvent = function (item, event) {
    if (event.defaultPrevented) return;
    event.preventDefault(true);
    if (item.disabled) return;
    active(this, item, "global", this.$src ? createItemTarget.call(this, item) : this);
};

var bindonly = function (elem, hotkey, item) {
    hotkey = hotkey.toLowerCase().replace(/[\s\+\.\_]+/, '.');
    return bind("keydown.only." + hotkey)(elem, isFunction(item) ? item : emitEvent.bind(elem, item));
}

function bindGlobalkey(elem, keymap, item) {
    if (isString(keymap)) {
        keymap = keymap.split(",");
    }
    if (isArray(keymap)) {
        for (var k of keymap) bindonly(elem, k, item);
        return;
    }
    if (elem.$keyoff) {
        for (var off of elem.$keyoff) {
            off();
        }
    }
    if (!keymap) return;
    var keyoff = [];
    for (let k in keymap) {
        keyoff.push(bindonly(elem, k, item));
    }
    elem.$keyoff = keyoff;
}
