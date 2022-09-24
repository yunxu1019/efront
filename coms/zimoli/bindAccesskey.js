var keyMap = {};
/**
 * @param {KeyboardEvent} event
 */
var keydownhandler = function (event) {
    if (event.defaultPrevented) return;
    var { which } = event;
    switch (event.which) {
        case 18: // alt
            event.preventDefault();
            break;
        default:
            var key = String.fromCharCode(which);
            var elems = keyMap[key];
            if (elems) while (elems.length) {
                var elem = elems[elems.length - 1];
                if (isMounted(elem)) break;
                else elems.pop();
            }
            if (elem) {
                var parent = elem.parentNode;
                if (event.altKey || parent === document.activeElement || parent.ispop) {
                    if (!(event.metaKey || event.shiftKey || event.ctrlKey)) {
                        event.preventDefault();
                        elem.click();
                    }
                }
            }
    }
}
on("keydown")(window, keydownhandler);
var bindAccesskey = function (btn, k) {
    if (!keyMap[k]) keyMap[k] = [];
    on("remove")(btn, function () {
        removeFromList(keyMap[k], btn);
    });
    onmounted(btn, function () {
        removeFromList(keyMap[k], btn);
        keyMap[k].push(btn);
    })
};
var getKeyFromText = function (btn) {
    var { innerText } = btn;
    var match = /\(\s*\_?\w\s*\)|\[\s*\_?\w\s*\]|\{\s*\_?\w\s*\}/.exec(innerText);
    if (match) {
        var accesskey = match[0].replace(/^\W*(\w)\W*$/g, '$1');
    } else {
        var accesskey = btn.getAttribute("accesskey");
    }
    if (!accesskey) return;
    return accesskey.toUpperCase();
}
function main(elem, key = getKeyFromText(elem)) {
    if (!key) return;
    bindAccesskey(elem, key);
    return elem;
}