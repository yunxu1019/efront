function reload() {
    clearTimeout(reload_timmer);
    reload_timmer = setTimeout(function () {
        require("electron").remote.getCurrentWebContents().reload();
    }, 20);
}
var reload_timmer;
function reloader() {
    var xhr = new XMLHttpRequest;
    var http_port = require("../coms/efront/memery").HTTP_PORT;
    xhr.open("post", `http://localhost${http_port ? ":" + http_port : ""}/reload`);
    xhr.timeout = 0;
    xhr.onerror = reload;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) reload();
    };
    xhr.send("haha");
};
new reloader;