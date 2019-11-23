var getVariables = require("./variables");
var esprima = require("../esprima");
function variables_test(data) {
    var ast = esprima.parse(data);
    var variables = getVariables(ast);
    console.log(variables);
}
variables_test(`var c,a=b,b;d=typeof e`);
variables_test(`var c,a=b,b;d=typeof e?e:f`);