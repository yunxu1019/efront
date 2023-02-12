var fs = require("fs");
var path = require("path");
var gbk2utf8 = require("../reptile/gbk2utf8");
var reg_set = /^\s*@?\s*(?:set|setx|export)\s+(.*?)\s*=\s*(['"`]?)([\s\S]*)\2$/im;
var reg_call = /^\s*@?\s*call\s+(["]?)(.+?)\1([\s\S]*)$/i;
var reg_for = /^\s*@?\s*for\s+([%\w]+)\s+in\s*\((.*?)\)\s*do\s+(.*?)$/i;

var reg_if =
    //00 matched_text
    //01 ignorecase
    //02 not
    //03 label
    //04 level
    //05 condition_left
    //06 condition_symbol
    //07 condition_right
    //08 qoute
    //09 exist
    //10 defined
    //11 command
    ////////////////   1  ///   2  //////           3            ///// 4 /// 5 /////                 6                  ///// 7 /////////// 8 // 9 ///////////////10 //////   11   ///
    /^\s*@?\s*if\s+(\/i\s+)?(not\s+)?(?:(cmdextversion|errorlevel)\s+(.+?)|(.+?)\s*(\=\=|\b(?:equ|neq|lss|leq|gtr|geq)\b)\s*(.+?)|exist\s+(["])(.+?)\8|defined\s+(.+?))\s+([\s\S]*?)$/i;
var if_conditions = {
    "==": (a, b) => a == b,
    "equ": (a, b) => a == b,
    "neq": (a, b) => a != b,
    "lss": (a, b) => a < b,
    "leq": (a, b) => a <= b,
    "gtr": (a, b) => a > b,
    "geq": (a, b) => a >= b
};

var call = function (file, args = []) {
    file = path.normalize(file.replace(/[\\]+/ig, "/"));
    if (!fs.existsSync(file)) {
        var _file;
        var _path = path.parse(file);
        var _dir = _path.dir;
        var _name = _path.name;
        if (!fs.existsSync(_dir) || !fs.statSync(_dir).isDirectory()) {
            return;
        }
        fs.readdirSync(_dir).forEach(function (name) {
            if (!_file) {
                if (name === _name || name.replace(/\.(\w+)$/i, '') === _name && /\.(bat|cmd|sh)$/i.test(name)) {
                    _file = path.join(_dir, name);
                }
            }
        });
        if (!_file) {
            return;
        }
        file = _file;
    }
    var data = fs.readFileSync(file);
    (
        /^\s*@\s*chcp\s*65001\b/i.test(data.slice(0, 100).toString()) ?
            String(data) : gbk2utf8(data)
    )
        .replace(/%(\d)/g, function (match, i) {
            return args[i];
        })
        .replace(/%~dp\d/ig, path.join(path.resolve(path.parse(file).dir), "./"))
        .replace(/\\/g, '/')
        .trim()
        .split(/[\r\n]+\s*/g)
        .forEach(get);
};

var get = function (text) {
    match = text.match(reg_for)
    if (match) {
        var variable = match[1];
        var set = get(match[2]).split(/[,]/);
        var function_body = match[3];
        for (var cx = 0, dx = set.length; cx < dx; cx++) {
            var executer = function_body.replace(new RegExp(variable, "ig"), set[cx]);
            get(executer);
        }
    }
    text = text
        .replace(/%(.*?)%/ig, function (match, env_name) {
            if (!env_name) return "%";
            var env_name = env_name.toUpperCase();
            if (env_name in env) return env[env_name];
            if (parent && env_name in parent) return parent[env_name];
            if (env_name in process.env) return process.env[env_name];
            return `%${env_name}%`;
        }).replace(/\\/g, "/");
    var match = text.match(reg_if);
    if (match) {
        var [matched_text, ignorecase, not, label, level, condition_left, condition_symbol, condition_right, qoute, exist, defined, command] = match;
        if (!!not ^ (
            level && env[label] == level ||
            condition_left && if_conditions[condition_symbol.toLowerCase()](
                ignorecase ? condition_left.toUpperCase() : condition_left,
                ignorecase ? condition_right.toUpperCase() : condition_right
            ) ||
            exist && fs.existsSync(path.normalize(exist.replace(/[\\]+/gi, "/"))) ||
            defined && (defined in env || defined in parent || defined in process.env)
        )) get(command);
    }
    var match = text.match(reg_set);
    if (match) {
        var k = match[1].toUpperCase(),
            v = env[k] || match[3];
        if (v)
            return env[k] = /^path\.|path$/i.test(k) ? path.normalize(v.replace(/[\\]+/g, "/")) : v || "";
        else
            return delete env[k]
    }
    var match = text.match(reg_call);
    if (match) {
        call(match[2], match[3].split(/\s+/));
    }
    return text;
};
var env = {}, parent = {};

function loadenv(file, from) {
    env = {};
    parent = from || process.env;
    call(file);
    return env;
}
module.exports = loadenv;