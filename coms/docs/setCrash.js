var idregs = [];
var getReg = function (i) {
    if (idregs[i]) return idregs[i];
    return idregs[i] = new RegExp("\\$" + i);
};
var setCrash = function (d) {
    var { fanyi, caps } = d;
    var crash = Object.create(null);
    var errorCount = 0;
    for (var k in fanyi) {
        for (var cx = 1, dx = caps; cx <= dx; cx++) {
            var r = getReg(cx);
            if (!r.test(fanyi[k])) {
                crash[k] = true;
                errorCount++;
                break;
            }
        }
    }
    d.crash = crash;
    d.crashCount = errorCount;
};