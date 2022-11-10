var onresize = on("resize");
onresize(window, function () {
    for (var r of resizingList) {
        dispatch(r, 'resize');
    }
});
var mount = function () {
    resizingList.push(this);
    dispatch(this, 'resize');
};
var unmount = function () {
    removeFromList(resizingList, this);
};
var resizingList = [];
resizingList.set = function (e, h) {
    var off1 = onmounted(e, mount);
    var off2 = on("remove")(e, unmount);
    if (isFunction(h)) var off3 = onresize(e, h);
    var offs = [off1, off2];
    if (off3) offs.push(off3);
    return function (offs) { for (var off of offs) off() };
};
resizingList.hit = function (e) {
    for (var a of this) {
        if (getTargetIn(e, a)) {
            dispatch(a, 'resize');
        }
    }
};