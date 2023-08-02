async function wait(call, time = 80, step = +time >>> 4 | 1) {
    var res;
    if (isFunction(call)) while (!(res = await call()) && time > 0) await new Promise(ok => setTimeout(ok, step)), time -= step;
    else res = new Promise(ok => setTimeout(ok, call));
    return res;
}