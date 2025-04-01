function* combgen() {
    var [f, args] = Comb.geta(arguments);
    var arr = new Comb(f, args);
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var res = yield arr.get(cx);
        if (res === false) {
            i++;
            if (i > argsList.length) break;
            var tx = argsList[argsList.length - i].length;
            cx += tx - cx % tx - 1;
        }
        else {
            i = 0;
        }
    }
}