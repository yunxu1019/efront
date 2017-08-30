process.stdin.resume();
require("../process/setupenv");
process.env.IN_TEST_MODE = true;
return require("../main");
