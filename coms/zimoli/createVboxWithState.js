function createVboxWithState(state) {
    var box = vbox.apply(null, [].slice.call(arguments, 1));
    onremove(box, function () {
        var _state = state();
        _state.vboxScrollTop = box.scrollTop;
        state(_state);
    });
    onappend(box, function () {
        box.scrollTop = state().vboxScrollTop || 0;
    });
    return box;
}