var console = require("../coms/efront/colored_console");
var child_process = require("child_process");
var queue = require("../coms/basic/queue");
var versions = child_process.execSync("npm view . versions");
var parsed = JSON.parse(String(versions).replace(/\'/g, '"'));
var scripts = `
npm install -g efront
efront version
efront help
efront help version
efront -v
efront --version
`.trim().split(/[\r\n]+/);
var run = function (script, timelimit) {
    if (!timelimit) timelimit = 20000;
    if (timelimit < 2000) timelimit = 2000;
    var timeStart = +new Date;
    var gram = child_process.exec(script, {
        shell: true
    });
    gram.stdout.pipe(process.stderr);
    gram.stdout.pipe(process.stdout);
    var timer = 0;
    return Promise.race([
        ok => gram.once("exit", ok),
        ok => timer = setTimeout(ok, timelimit)
    ].map(
        a => new Promise(a)
    )).then(function () {
        if (!gram.killed) gram.kill();
        clearTimeout(timer);
        console.info(`执行: <gray>${script}</gray>，用时: <gray>", ${((new Date - timeStart) / 1000).toFixed(2)}</gray>秒`);
    });
};
queue.call(parsed, function (version) {
    var version = parsed.pop();
    var commands = scripts.slice(0);
    commands[0] += "@" + version;
    v = versions.split('.').map(a => parseInt(a));
    return queue.call(commands, run).then(function () {
        if (v[0] > 1 || v[1] >= 19) return run('efront live 80 443', 20000);
    });
});
