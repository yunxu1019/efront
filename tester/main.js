#!/usr/bin/env node
process.stdin.resume();
require("../process/setupenv");
require("../process/console");
process.env.IN_TEST_MODE = true;
require("../server/main");
if (process.argv.indexOf("--electron") >= 0) require("./deploy/electron");