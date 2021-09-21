function arriswise_test() {
    var a = function (a) {
        var b = a.width;
        return b;
    };
    var b = function (a) {
        var b = a.height;
        return b;
    };
    var result = arriswise(a).toString() === b.toString();
    console.log(result);
}