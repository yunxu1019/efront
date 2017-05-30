var fs = require("fs");
var path = require("path");
var gbk2utf8=require("./gbk2utf8");
var map = {};
var reg_set = /^\s*@?\s*(?:set|setx)\s+(.*?)\s*=\s*(['"`]?)([\s\S]*)\2$/im
var reg_call = /^\s*@?\s*call\s+(["]?)(.*?)\1([\s\S]*)$/i;
var reg_for = /^\s*@?\s*for\s+([%\w]+)\s+in\s*\((.*?)\)\s*do\s+(.*?)$/i
var env = process.env;
var call = function (file,args = []) {
    if(!fs.existsSync(file)){
        var _file;
        var _path=path.parse(file);
        var _dir=_path.dir;
        var _name=_path.name;
        if(!fs.existsSync(_dir)||!fs.statSync(_dir).isDirectory()){
            return;
        }
        fs.readdirSync(_dir).forEach(function(name){
            if(!_file){
                if(name.startsWith(_name)&&/\.(bat|cmd)$/i.test(name)){
                    _file=path.join(_dir,name);
                }
            }
        });
        if(!_file){
            return;
        }
        file=_file;
    }
    gbk2utf8(
            fs.readFileSync(file)
        )
        .replace(/%(\d)/g, function (match, i) {
            return args[i];
        })
        .replace(/%~dp\d/ig, path.join(path.resolve(path.parse(file).dir),"./"))
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
            return env[env_name];
        })
    var match = text.match(reg_set);
    if (match) {
        var k = match[1],
            v = match[3];
        return env[k] = v;
    }
    var match = text.match(reg_call);
    if (match) {
        call(match[2], match[3].split(/\s+/));
    }
    return text;
};
call("./_envs/setup.bat");