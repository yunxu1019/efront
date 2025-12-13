var path = require("path");
var memery = require("../efront/memery");
memery.CERT_PATH = "H:\\丰县白前软件工作室\\不枝雀-cert.pem";
memery.KEY_PATH = "H:\\丰县白前软件工作室\\不枝雀-key.pem";
memery.SIGNITEMS = false;
await packexe(path.join(__dirname, "../../public/"), path.join(__dirname, "packexe_temp.exe"))
var data = require("fs").readFileSync(path.join(__dirname, "packexe_temp.exe"));
pesign$peSign_test(data);