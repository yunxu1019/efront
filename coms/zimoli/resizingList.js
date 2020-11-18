onresize(window, function () {
    for (var cx = 0, dx = resizingList.length; cx < dx; cx++) {
        dispatch(resizingList[cx], 'resize');
    }
});
var resizingList = [];