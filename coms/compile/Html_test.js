var Html = require("./Html");
var h = new Html;
var b = h.exec("<h><a #c>b</a><c b=x>d</c><d /><e>2px</h>");
console.log(h.createScoped(b));
console.log(h.createString(b));