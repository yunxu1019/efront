var message = require("../message");
var similar = require("./similar");
var JSAM = require("../basic/JSAM");

message.uptime = function () {
    return process.uptime();
};
message.rehost = function () {
    console.info(i18n`服务器重启`);
    var argv = process.__proto__ && process.__proto__.argv || process.argv;
    if (message.quit) message.quit();
    else process.exit();
    var child = require("child_process").spawn(argv[0], argv.slice(1), {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
};

message.logsimilar = function (a) {
    a = JSON.parse(a);
    similar.log(a);
};
message.allsimilar = function () {
    return JSAM.stringify(similar.all());
};

message.receive = function ([cid, uid]) {
    var client = clients.get(cid);
    if (client) {
        var msgs = client.getMessages(uid);
        return msgs;
    }
};
