require("../efront/console");
console.test("efront demo");
var demo_process = require("child_process").spawn('node', [process.env.APPDATA + '\\npm\\node_modules\\efront\\main.js', 'demo'], {
    stdio: false,
    env: {
        http_port: 2020
    }
});
var reportPass = function (buff) {
    console.pass(String(buff));
};
var reportFail = function (buff) {
    console.fail(String(buff));
};
require("http").get("http://127.0.0.1:2020", function (response) {
    var dist = [];
    response.on("data", function (buff) {
        dist.push(buff);
    });
    response.on("end", function () {
        var data = Buffer.concat(dist);
        if (response.headers["content-encoding"] === "gzip") {
            data = require("zlib").gunzipSync(data);
        }
        var a = /<title>/i.test(String(data));
        if (!a) {
            reportFail("出错了！");
        } else {
            reportPass("efront demo\r\n");
        }
        demo_process.kill("SIGINT");
    });
});