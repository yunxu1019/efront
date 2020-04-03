var vm = require("vm");
var sandbox = { console };
var context = vm.createContext(sandbox);
vm.runInContext("var f=Function;var d=this.constructor",sandbox);
console.log(sandbox);