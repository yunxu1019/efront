var Comb = require("./Comb");
function combine() {
    var [f, args] = Comb.args(arguments);
    var arr = new Comb(f, args);
    var dist = new Array(arr.length);
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        dist[cx] = arr.get(cx);
    }
    return dist;
}
module.exports = combine;