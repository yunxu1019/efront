var tick = Promise.resolve();
var exec_ = function (args, ok, oh, int) {
    var p = null, index = 0, r, e, finished = false;
    var next = function (arg) {
        p = arg;
        run();
    };
    var catches = [], catch_, throwed = false;
    var thro = function (err) {
        e = err;
        if (catch_) {
            throwed = true;
            fina();
        }
        else if (catches.length) {
            catch_ = catches.pop();
            [index, p] = catch_;
            throwed = false;
            index += p & 0xffff;
            if (p >>> 16) {
                next(err);
            }
            else {
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
        if (catch_ || catches.length) fina();
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
        if (throwed) thro(e);
        else if (finished) retn(r);
        else {
            index++;
            next();
        }
    }
    var run = function () {
        var args_length = args.length, i;
        while (index < args_length) {
            try {
                var a = args[index](p) || [1, 0];
                p = a[0];
                i = a[1];
            } catch (e) {
                thro(e);
                return;
            }
            switch (i) {
                case 0: index += p; break; // reflow
                case 1:
                    index++; // await p;
                    if (p && isFunction(p.then)) {
                        try {
                            return p.then(next, thro);
                        } catch (e) {
                            return Promise.reject(e).then(null, thro);
                        }
                    }
                    else return next(p);
                case 2: return finished = true, retn(p); // return p;
                case 3: return index++, int(p, next); // yield p;
                case 4: return thro(p); // throw p; 目前无此返回值
                case 7: index++; catches.push([index, p]); break; // try catch finally?
                case 8: index++; catches.push([index, p, 1]); break; // try finally
                case 9: return p ? fine() : fina(); // finally
                default: throw console.log(a), i18n`代码异常！`;
            }
            catch_ = null;
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