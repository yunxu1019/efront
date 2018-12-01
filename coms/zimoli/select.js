var saved_list;
var _remove = function () {
    console.log(arguments)
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
    onmousedown(list, preventDefault);
    css(list, {
        zIndex: zIndex()
    });
    onremove(list, () => saved_list = null);
    var mousedownfired = false;
    var mousedown = function () {
        if (mousedownfired) return;
        mousedownfired = true;
        if (saved_list !== list) {
            _remove();
            if (document.activeElement !== target) target.focus();
            popup(list, target);
            saved_list = list;
        }
        else _remove();
    };
    onmousedown(target, mousedown);
    onclick(target, function(){
        mousedown();
        mousedownfired = false;
    });
    return target;
}