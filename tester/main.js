process.stdin.resume();
require("../process/setupenv");
process.title = `服务器地址：${require("../process/getLocalIP")()}`;

process.env.IN_TEST_MODE = true;
require("../main");
if (process.argv.indexOf("--electron") >= 0) require("./deploy/electron");