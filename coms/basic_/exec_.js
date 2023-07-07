var tick = Promise.resolve();
var exec_ = function (args, ok, oh, int) {
    var p = null, index = 0, r, e, finished = false, t = this;
    var next = function (arg) {
        p = arg;
        run();
    };
    var catches = [], catch_, throwed;
    var thro = function (err) {
        if (catch_) {
            fina();
        }
        else if (catches.length) {
            catch_ = catches.pop();
            [index, p, throwed] = catch_;
            index += p & 0xffff;
            if (p >>> 16) {
                next(err);
            }
            else {
                e = err;
                fina();
            }
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
        if (!catch_) catch_ = catches.pop();
        [index, p] = catch_;
        catch_ = null;
        index += (p >>> 16) + (p & 0xffff);
        next();
    };
    var fine = function () {
        index++;
        next();
    }
    var run = function () {
        var args_length = args.length, i;
        if (!catch_ || index >= args_length) {
            if (throwed) {
                return oh(e);
            }
            if (finished) return ok(r);
        }
        catch_ = null;
        while (index < args_length) {
            try {
                var a = args[index].call(t, p) || [1, 0];
                p = a[0];
                i = a[1];
            } catch (e) {
                p = null;
                thro(e);
                break;
            }
            switch (i) {
                case 0: index += p; break; // reflow
                case 1:
                    index++; // await p;
                    if (p && isFunction(p.then)) {
                        try {
                            return p.then(next, thro);
                        } catch (e) {
                            return Promise.reject(e).then(next, thro);
                        }
                    }
                    else return next(p);
                case 2: return finished = true, retn(p); // return p;
                case 3: return index++, int(p, next); // yield p;
                case 7: index++; catches.push([index, p]); break; // try catch finally?
                case 8: index++; catches.push([index, p, 1]); break; // try finally
                case 9: return p ? fine() : fina(); // finally
                default: throw console.log(a), "代码异常！";
            }
        }
        retn();
    };
    var ticked = false;
    tick.then(() => {
        if (ticked) return oh(e);
        ticked = true;
    })
    next();
};