var strings = require("../basic/strings");
var child_process = require("child_process");
var run = function (shell, cmd) {
    var res = child_process.spawnSync(`${shell} ${cmd}`, { shell: true, stdio: ["inherit", "pipe", "inherit"] }).stdout.buffer;
    return Buffer.from(res).toString();
};
class OSReg {
    get(key) {
        return this.run('get', key);
    }
    del(key) {
        this.run('del', key);
    }
    set(key, value) {
        return this.run('set', key, value);
    }
    run(cmd, key, value) {
        if (!this.cmdmap || !this.pathmap) throw new Error(i18n`注册表操作暂不支持当前操作系统！`);
        if (!this.cmdmap.hasOwnProperty(cmd)) {
            throw new Error(i18n`注册表操作不支持${cmd}`);
        }
        if (!this.pathmap.hasOwnProperty(key)) {
            throw new Error(i18n`注册表操作不支持此项 ${key}`);
        }
        var cmdarg = this.cmdmap[cmd] + " " + this.pathmap[key];
        if (value) value = this.format(value);
        if (!isEmpty(value)) cmdarg += " " + value;
        var res = run(this.shell, cmdarg);
        if (this.filter) res = this.filter(res, arguments);
        return res;
    }
    constructor({ shell, format, cmdmap, pathmap, filter }) {
        this.format = format;
        this.shell = shell;
        this.cmdmap = cmdmap;
        this.pathmap = pathmap;
        this.filter = filter;
    }
}
var reg;
switch (process.platform) {
    case "win32":
        reg = new OSReg({
            shell: 'reg',
            format(value = '') {
                var type = 'REG_EXPAND_SZ';
                value = `"${strings.decode(value)}"`;
                if (value) value = `/t ${type} /d ${value} /f`;
                return value;
            },
            filter(res, [cmd, key, value]) {
                if (cmd === "set") {
                    if (/^pathx?$/i.test(key)) {
                        value = value.replace(/\^[\s\S]|[%]/g, a => a.length === 1 ? "^" + a : a);
                        child_process.execSync(`setx path ${value};`, { stdio: 'inherit' });
                    }
                    return;
                }
                if (cmd !== 'get') return;
                res = res.trim().split('\r\n').map(a => a.trim());
                var res = res.pop().trim();
                var i = res.indexOf(" ");
                var name = res.slice(0, i);
                res = res.slice(i).trim();
                i = res.indexOf(" ");
                var type = res.slice(0, i);
                var value = res.slice(i).trim();
                return value;
            },
            cmdmap: {
                "get": "query",
                "set": "add",
                "del": "delete"
            },
            pathmap: {
                pathm: "HKEY_LOCAL_MACHINE\\SYSTEM\\ControlSet001\\Control\\Session Manager\\Environment /v Path",
                path: "HKEY_CURRENT_USER\\Environment /v Path",
            }
        });
        break;
    default:
        reg = new OSReg({});
}
return reg;
