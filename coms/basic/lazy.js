// 1.如果time大于0，传的和函数会延迟time执行，如果期间有新的调用，前一个调用会被忽略
// 2.如果time小于0，传入的函数会立即执行，并忽略-time内的连续调用，time时间后触发最后一次调用
// 如果time传false或0 使用requestAnimationFrame代替setTimeout按第1步执行
// 如果time传null或undefined或NaN使用requestAnimationFrame代替setTimeout按第2步执行

/**
 * @param {Function} run 主程序
 * @param {number|undefined} time 间隔
 * @param {any} ret 指定调用结束后返回的结果
 */

function lazy(run, time, ret) {
    var wait = +time ? setTimeout : requestAnimationFrame;
    var quit = wait === setTimeout ? clearTimeout : cancelAnimationFrame;
    var ing, args, that, id, p;
    var hire = function () {
        if (!ing) return;
        if (time >= 0) {
            if (ing === true) id = ing = wait(fire, +time / 2);
            else id = wait(fire, +time / 2), ing = -2;
        }
        else {
            id = wait(fire, -time);
        }
    };
    var fire = function () {
        if (!ing) return;
        if (time >= 0) {
            if (ing === true) {
                id = ing = wait(fire, +time / 2);
            }
            else if (ing > 0) {
                id = wait(fire, +time / 2);
                ing = -1;
            }
            else if (ing === -1) {
                ing = run.apply(that, args);
                if (ing instanceof Promise) p = ing.then(hire, hire);
                else ing = false;
            }
            else {
                ing = false;
            }
        }
        else {
            if (ing === true) {
                ing = run.apply(that, args);
                if (ing instanceof Promise) p = ing.then(hire, hire);
                else id = ing = wait(fire, -time);
            } else {
                ing = false;
            }
        }
    };
    var exec = function () {
        args = arguments;
        that = this;
        if (ing || p) return ing = true;
        if (time >= 0) {
            id = ing = wait(fire, +time);
        }
        else if (time < 0) {
            ing = run.apply(that, args);
            if (ing instanceof Promise) ing.then(hire, hire);
            else id = ing = wait(fire, -time);
        }
        else {
            ing = true; id = wait(fire);
        }
        return ret;
    };
    exec.cancel = function () {
        quit(id);
        ing = false;
        id = 0;
    };
    return exec;
}
module.exports = lazy;