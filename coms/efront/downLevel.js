var typescript = require("../typescript");
var scanner2 = require("../compile/scanner2");
var { rename, COMMENT, EXPRESS, STRAP, STAMP, createString } = require("../compile/common");
var renameArguments = function (scoped, id) {
    if (scoped.isfunc && (scoped.aster || scoped.async) && scoped.body && scoped.used.arguments) {
        var arglist = scoped.body.prev;
        var newname;
        do {
            newname = "_arguments" + id++;
        } while (newname in scoped.used);
        rename(scoped.used, 'arguments', newname);
        arglist.unshift(...scanner2(`${newname}=arguments,`));
    }
    for (var s of scoped) renameArguments(s, id);
};
var recoverArguments = function (scoped) {
    if (scoped.isfunc && scoped.body && scoped.used.arguments
        && scoped.body.first && scoped.body.first.type === STRAP && scoped.body.first.text === 'if') {
        var index = -1;
        if (scoped.used.__awaiter) {
            index = scoped.body.indexOf(scoped.used.__awaiter[0].prev);
        }
        else if (scoped.used.__generator) {
            index = scoped.body.indexOf(scoped.used.__generator[0].prev);
        }
        var arglist = scoped.body.prev;
        if (index >= 0 && arglist.length) {
            var newname = arglist.shift();
            arglist.shift();
            if (scoped.used.arguments.length === 2) scoped.used.arguments[1].text = newname.text;
            scoped.body.splice(0, index, ...scanner2(`var ${newname.text} = arguments;`));
        }
    }
    for (var s of scoped) recoverArguments(s);
};
var replaceArray = function (a, i, arr) {
    var p = a.prev;
    if (!p || p.type !== STRAP || p.text !== "extends") return;
    a.text = "Array2";
    var used = this.used;
    var envs = this.envs;
    if (!used.Array2) {
        envs.Array2 = true;
        used.Array2 = [];
    }
    arr.splice(i, 1);
    used.Array2.push(a);
};
var downLevelCode = function (code) {
    var isAsync = code.async;
    var isYield = code.yield;
    if (code.envs.Array) backEach(code.used.Array, replaceArray, code);
    renameArguments(code.scoped, 0);
    code.keepcolor = false;
    var data = code.toString();
    data = downLevel(data, isAsync, isYield);
    code = scanner2(data);

    recoverArguments(code.scoped);
    return code;
};
var downLevel = module.exports = function (data, isAsync, isYield) {
    if (isYield || isAsync) {
        data = `${isAsync ? "async " : ""}function${isYield ? "*" : ""}(){${data}}`;
    }
    if (isAsync) downLevel.isAsync = true;
    data = typescript.transpile(data, { noEmitHelpers: true });
    if (isYield || isAsync) {
        data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/, "$1");
    }
    return data;
};

downLevel.code = downLevelCode;