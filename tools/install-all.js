var console = require("../coms/efront/colored_console");
var child_process = require("child_process");
var queue = require("../coms/basic/queue");
var versions = child_process.execSync("npm view . versions");
var localIP = require("../coms/efront/getLocalIP")();
var parsed = JSON.parse(String(versions).replace(/\'/g, '"')).reverse();
var scripts = `
npm install -g efront
efront version
efront help
efront help version
efront -v
efront --version
`.trim().split(/[\r\n]+/);
var run = function (script, timelimit) {
    if (!timelimit) timelimit = 200000;
    if (timelimit < 2000) timelimit = 2000;
    var timeStart = +new Date;
    var gram = child_process.exec(script, {
        timeout: timelimit,
    });
    gram.stderr.pipe(process.stderr);
    gram.stdout.pipe(process.stdout);
    var timer = 0;
    return Promise.race([
        ok => gram.once("exit", ok),
        ok => timer = setTimeout(ok, timelimit)
    ].map(
        a => new Promise(a)
    )).then(function () {
        gram.kill();
        clearTimeout(timer);
        console.info(`执行: <gray>${script}</gray>，用时: <gray>${((new Date - timeStart) / 1000).toFixed(2)}</gray>秒\r\n`);
    });
};
queue.call(parsed, function (version, index) {
    var commands = scripts.slice(0);
    commands[0] += "@" + version;
    if (Math.random() * (index + 120) / 240 > .5) return;
    console.time(version);
    return queue.call(commands, run).then(function () {
        if (!localIP) return;
        if (index < 7) return run('efront live 80 443', 20000);
        return new Promise(a => setTimeout(a, 1600));
    });
});
