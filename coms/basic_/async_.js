var exec = function (args, ok, oh) {
    var p = null, index = 0, r, finished = false;
    var next = function (arg) {
        p = arg;
        run();
    };
    var catches = [];
    var thro = function (err) {
        if (catches.length) {
            [index, p] = catches[catches.length - 1]
            index += p >>> 16;
            p = err;
            next();
        }
        else {
            oh(err);
        }
    };
    var retn = function (p) {
        r = p;
        finished = true;
        if (catches.length) fina();
        else ok(r);
    };
    var fina = function () {
        // 仅在try或catch未结束时使用
        [index, p] = catches[catches.length - 1];
        index += (p >>> 16) + (p & 0xffff);
        next();
    };
    var fine = function () {
        catches.pop();
        next();
    }
    var run = function () {
        var args_length = args.length, i;
        if (finished && !catches.length || index > args_length) return ok(r);
        loop: while (index < args_length) {
            try {
                [p, i] = args[index](p) || [1, 0];
            } catch (e) {
                p = null;
                thro(e);
                break;
            }
            switch (i) {
                case 0: index += p; break; // reflow
                case 1: index += 1; break loop; // await p;
                case 2: return finished = true, retn(p); // return p;
                case 7: index++; catches.push([index, p]); break; // try start
                case 9: return p ? fine() : fina(); // finally
                default: throw "代码异常！";
            }
        }
        if (p && isFunction(p.then)) p.then(next, thro);
        else next(p);
    };
    next();
};
function async_() {
    return new Promise(exec.bind(null, arguments));
}