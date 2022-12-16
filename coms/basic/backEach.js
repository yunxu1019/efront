var backEach = function (arr, run, context) {
    for (var cx = arr.length - 1; cx >= 0; cx--) {
        run.call(context, arr[cx], cx, arr);
    }
};
module.exports = backEach;