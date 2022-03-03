// 1.如果time大于0，传的和函数会延迟time执行，如果期间有新的调用，前一个调用会被忽略
// 2.如果time小于0，传入的函数会立即执行，并忽略-time内的连续调用，time时间后触发最后一次调用
// 如果time传false或0 使用requestAnimationFrame代替setTimeout按第1步执行
// 如果time传null或undefined或NaN使用requestAnimationFrame代替setTimeout按第2步执行
function lazy(run, time = false) {
    var wait = +time ? setTimeout : requestAnimationFrame;
    var ing, args, that;
    var fire = function () {
        if (time >= 0) {
            if (ing === true) {
                ing = wait(fire, +time / 2);
            }
            else if (isFinite(ing) && ing !== 0) {
                wait(fire, +time);
                ing = 0;
            }
            else if (ing === 0) {
                ing = run.apply(that, args);
            }
            else {
                ing = false;
            }
        }
        else {
            if (ing === true) {
                ing = run.apply(that, args);
                wait(fire, -time);
                if (!ing) ing = 1;
            } else {
                ing = false;
            }
        }
        if (ing instanceof Promise) ing.then(fire, fire);
    };
    return function () {
        args = arguments;
        that = this;
        if (ing) return ing = true;
        if (time >= 0) {
            ing = wait(fire, +time);
        }
        else {
            ing = run.apply(that, args);
            if (ing instanceof Promise) ing.then(fire, fire);
            ing = wait(fire, -time);
        }
    };
}
module.exports = lazy;