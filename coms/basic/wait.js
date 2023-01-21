async function wait(call, time = 80, step = +time >>> 4 | 1) {
    var res;
    while (!(res = await call()) && time > 0) await new Promise(ok => setTimeout(ok, step)), time -= step;
    return res;
}