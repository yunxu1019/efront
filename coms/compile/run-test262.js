var fs = require("fs/promises");
var path = require("path");
var vm = require("vm");
var testpath = path.join(__dirname, '../../../test262');
var $262 = await async function () {
    var $262 = {
        evalScript(script) {
            script = downLevel(script);
            vm.runInNewContext(script);
        },
        createRealm() {
            return;
        },
    };
    $262.global = vm.createContext({ $262 });
    var v8agent = await fs.readFile(path.join(testpath, "implementation-contributed/v8/test262/harness-agent.js"));
    new Function("$262", [v8agent].join("\r\n"))($262);
    return $262;
}();
var harness = await async function () {
    var hpath = path.join(testpath, "harness");
    var nameMap = { "-gc": "GC" };
    var files = await fs.readdir(hpath, { withFileTypes: true });
    var codes = await queue.call(files.filter(f => /\.js$/i.test(f.name)), async (f) => {
        var n = f.name;
        var p = path.join(hpath, n);
        var code = scanner2(String(await fs.readFile(p)));
        n = n.replace(/\.js$/i, '').replace(/\-\w+/g, function (a) {
            return a in nameMap ? nameMap[a] : a[1].toUpperCase() + a.slice(2);
        });
        code.name = n;
        return code;
    });
    var vars = {};
    codes.sort((a, b) => {
        var aenvs = a.envs;
        var avars = a.vars;
        var bvars = b.vars;
        var benvs = b.envs;
        for (var k in aenvs) if (k in bvars) return -1;
        for (var k in benvs) if (k in avars) return 1;
        return 0;
    });
    codes.forEach(c => extend(vars, c.vars));
    return new Function("$262", 'print', codes.join("\r\n") + `\r\nreturn {${Object.keys(vars).map(a => `${a}:${a}`).join(',')}}`)($262, console.info);
}();
await async function () {
    extend(harness, {
        aster_,
        async_,
        asyncAster_,
        isFunction,
        restIter_,
        rest_,
        exec_,
    })
    extend(global, harness);
    var rest = [path.join(testpath, 'test')];
    var ignore = [
        "dynamic-import",
        "intl402",
        "built-ins",
    ];
    ignore.forEach(k => ignore[k] = true);
    var testFiles = [];
    while (rest.length) {
        var p = rest.pop();
        var names = await fs.readdir(p, { withFileTypes: true });
        for (var n of names) {
            if (n.name in ignore) continue;
            var p1 = path.join(p, n.name);
            if (n.isDirectory()) rest.push(p1);
            else if (!/\.js$/i.test(p1)) continue;
            else testFiles.push(p1);
        }
    }
    // testFiles = testFiles.slice(4053,9153);
    testFiles.skip = 0;
    var currentTest, currentText;
    var currentIndex = 0;
    var running = false;
    var interupt = function (e) {
        if (this == 'r' && !running) return;
        console.fail(this, currentIndex, currentTest + "\r\n");
        console.log(currentText);
        if (e) console.trace(e);
        process.exit();
    };
    process.on("uncaughtException", interupt.bind('e'));
    process.on("unhandledRejection", interupt.bind('r'));
    await queue.call(testFiles, async function (f, i) {
        var runText = async function (text) {
            /**
             * @type {vm.RunningCodeInNewContextOptions}
             */
            var ctxOptions = {
                filename: f,
                displayErrors: false,
            };
            running = true;
            if (code.envs.$DONE) harness.$DONE = function (e) {
                if (e) console.fail(ti, f + "\r\n"), console.log(currentText), console.trace(e), process.exit();
            };
            vm.runInThisContext(text, ctxOptions);
            running = false;
        };
        var ti = `${i}/${testFiles.length}`;
        var data = await fs.readFile(f);
        var de;
        try {
            console.test("解析", ti, f);
            var code = scanner2(String(data));
            console.test("降级", ti, f);
            var text = downLevel.code(code).toString();
        } catch (e) {
            de = e;
        }
        currentTest = f;
        currentText = text;
        currentIndex = ti;
        if (text) {
            try {
                console.test("执行", ti, f);
                await runText(text);
            } catch (e) { de = e };
        }
        if (de) try {
            try {
                console.test("检查", ti, f);
                await runText(data);
            } catch (e) { de = null };
        } catch { de = null; }
        if (!text && de) {
            console.log(de)
            console.fail(ti, f);
            throw de;
        }
        console.pass(path.relative(testpath, f));
    }, 1, null);
    console.log(`\r\n完成 ${testFiles.length} 个测试项！`);
}();