"use strict";
var typescript = require("../typescript");
var esprima = require("../esprima");
var getVariables = require("../compile/variables");
function getRequired(data) {
    data = typescript.transpile(data);
    var code = esprima.parse(data);
    var require = getVariables(code).unDeclaredVariables.require;
    require = require instanceof Array ? require.map(a => a.value) : [];
    return require;
}
module.exports = getRequired;