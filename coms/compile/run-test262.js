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
    return new Function("$262", 'print', codes.join("\r\n") + `\r\nreturn {${Object.keys(vars).map(a => `${a}:${a}`).join(',')}}`)($262, console.log);
}();
var tests = await async function () {
    extend(harness, {
        aster_,
        async_,
        asyncAster_,
        exec_,
    });
    var rest = [testpath];
    var testFiles = [];
    while (rest.length) {
        var p = rest.pop();
        var names = await fs.readdir(p, { withFileTypes: true });
        for (var n of names) {
            var p1 = path.join(p, n.name);
            if (n.isDirectory()) rest.push(p1);
            else if (!/\.js$/i.test(p1)) continue;
            else testFiles.push(p1);
        }
    }
    await queue.call(testFiles, async function (f) {
        var data = await fs.readFile(f);
        try {
            var de;
            try {
                console.test("解析", f);
                var code = scanner2(String(data));
                console.test("降级", f);
                var debugname = `async-func-dstr-const-ary-ptrn-elem-id-init-hole.js`;
                downLevel.debug = f.endsWith(debugname);
                var text = downLevel.code(code).toString();
            } catch (e) {
                de = e;
            }
            try {
                console.test("执行", f);
                var ctx = vm.createContext(harness);
                vm.runInContext(text || data, ctx);
            } catch { de = null; }
            if (!text && de) throw de;
        } catch (e) {
            console.fail(f, text);
            throw e;
        }
        console.pass(path.relative(testpath, f));
    })
}();
// require("child_process").execSync(`efront run `)