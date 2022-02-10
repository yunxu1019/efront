var typescript = require("../typescript");
module.exports = function (data, isAsync, isYield) {
    if (isYield || isAsync) {
        data = `${isAsync ? "async " : ""}function${isYield ? "*" : ""}(){${data}}`;
    }
    data = data.replace(/(\sextends\s+)Array(\s||\{)/g, function (_, ex, sq) {
        return `${ex}(A=>(A.prototype=Array.prototype,A))(function(){})${sq}`;
    });
    data = typescript.transpile(data, { noEmitHelpers: true });
    if (isYield || isAsync) {
        data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/, "$1");
    }
    return data;
}