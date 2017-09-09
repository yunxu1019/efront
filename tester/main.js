process.stdin.resume();
require("../process/setupenv");
process.env.IN_TEST_MODE = true;
require("../main");
if (process.argv.indexOf("--electron") >= 0) require("./deploy/electron");