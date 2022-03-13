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
resizingList.set = function (e) {
    on('append')(e, mount);
    on("remove")(e, unmount);
};
resizingList.hit = function (e) {
    for (var a of this) {
        if (getTargetIn(e, a)) {
            dispatch(a, 'resize');
        }
    }
};