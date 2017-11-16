var needrestart = false,
    restarttimer = false;
var restart_process = function () {
    needrestart = false;
    restarttimer = -1;
    var git_push = require("child_process").spawn("git pull", {
        shell: true
    });
    git_push.on("exit", function () {
        if (needrestart) clearTimeout(restarttimer), restarttimer = setTimeout(restart_process, 2000);
        else restarttimer = 0;
    });
};
module.exports = function WebHook(message, then) {
    if (restarttimer) needrestart = true;
    else clearTimeout(restarttimer), restarttimer = setTimeout(restart_process, 200);
}