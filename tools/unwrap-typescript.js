var data = fs.readFileSync(path.join(__dirname, "../coms/typescript/index.js")).toString();
var { STRAP, SCOPED, createString, SPACE, EXPRESS, relink } = compile$common;
var code = compile$scanner2(data)
var wraped = code.filter(c => c.type === SCOPED);
if (wraped.length !== 4) throw "数据异常";
var unwraped = [...code.slice(0, code.indexOf(wraped[0]) - 3), ...wraped[0][2]];
for (var cx = unwraped.length - 1; cx >= 0; cx--) {
    var o = unwraped[cx];
    if (o.type === STRAP && o.text === 'return') {
        o.text = "module.exports";
        o.type = EXPRESS;
        unwraped.splice(cx + 1, 0, ...compile$scanner2(" = "));
        break;
    }
}
relink(unwraped);
var replaceSpace = function (c) {
    if (c.type === SPACE) {
        c.text = c.text.replace(/[^\r\n]+/g, function (text) {
            return Array(text.length >> 1).join("    ");
        });
    }
    else if(c.length){
        c.forEach(replaceSpace);
    }
};
replaceSpace(unwraped);
fs.writeFileSync(path.join(__dirname, "../coms/typescript/index.js"), createString(unwraped));
