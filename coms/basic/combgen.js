function* combgen() {
    var [f, args] = Comb.args(arguments);
    var arr = new Comb(f, args);
    var i = 0;
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var res = yield arr.get(cx);
        if (res === false) {
            i++;
            if (i > args.length) break;
            var tx = args[args.length - i].length;
            cx += tx - cx % tx - 1;
        }
        else {
            i = 0;
        }
    }
}