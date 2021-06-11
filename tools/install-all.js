var console = require("../coms/efront/colored_console");
var child_process = require("child_process");
var queue = require("../coms/basic/queue");
var versions = child_process.execSync("npm view . versions");
var parsed = JSON.parse(String(versions).replace(/\'/g, '"'));
var scripts = `
npm install -g efront
efront version
efront ip
efront help
efront help version
efront -v
efront --version
efront simple from kugou
efront build
`.trim().split(/[\r\n]+/);

queue.call(parsed, function (version) {
    var version = parsed.pop();
    var commands = scripts.slice(0);
    commands[0] += "@" + version;
    return queue.call(commands, function (script) {
        var timeStart = +new Date;
        var gram = child_process.exec(script, {
            shell: true
        });
        gram.stdout.pipe(process.stderr);
        gram.stdout.pipe(process.stdout);
        return new Promise(ok => gram.once("exit", ok)).then(function () {
            console.info(`执行: <gray>${script}</gray>，用时: <gray>", ${((new Date - timeStart) / 1000).toFixed(2)}</gray>秒`);
        });
    });
});
