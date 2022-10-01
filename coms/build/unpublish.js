var commbuilder = require("../efront/commbuilder");
var scanner = require("../compile/scanner");
var backskip = function (data, lastIndex) {
    var count = 0;
    while (--lastIndex > 0) {
        if (data[lastIndex] === "}") {
            count++;
        }
        else if (data[lastIndex] === "{") {
            if (count === 0) break;
            count--;
        }
    }
    return lastIndex;
};
var autoskip = scanner.autoskip;
var readBlocks = function (data, lastIndex) {
    var blocks = [];
    scanner(data, 1).forEach(a => {
        if (a.type === a.regexp_quote_scanner) {
            blocks.push(data.slice(a.start, a.end));
            lastIndex = a.end;
            return;
        }
        if (a.type === a.double_quote_scanner || a.type === a.single_quote_scanner) {
            if (lastIndex < a.start) return;
            var next = data.indexOf(',', a.end);
            var piece = data.slice(a.end, next);
            var isblank = /^\s*$/.test(piece);
            if (isblank) {
                blocks.push(data.slice(a.start, a.end));
            } else {
                var isTypeof = false;
                piece = piece.replace(/^[\s\S]*\?([\w\d\$\s]+)\:([\w\d\$\s]+)$/i, (_, a, b) => {
                    isTypeof = true;
                    a = a.trim();
                    b = b.trim();
                    if (/\s/.test(a)) return b;
                    return a;
                });
                if (isTypeof) blocks.pop();
                blocks.push(piece);
            }
            lastIndex = next + 1;
            return;
        }
        if (a.type !== a.block_code_scanner) {
            lastIndex = a.end;
            return;
        }

        var piece = data.slice(lastIndex, a.end);
        var index = 0;
        while (index < piece.length) {
            var start = piece.indexOf("[", index);
            blocks.push.apply(blocks,
                piece.slice(index, start >= 0 ? start : piece.length).split(",").map(a => a.trim()).filter(a => a)
            );
            if (start < 0) {
                lastIndex = a.end;
                return;
            } else {
            }
            index = piece.indexOf("{", start);
            if (index < 0) {
                index = piece.indexOf("]", start) + 1;
                if (index === 0) {
                    lastIndex = lastIndex + start;
                    return;
                }
                blocks.push(piece.slice(start, index));
                continue;
            }
            index = autoskip(piece, index + 1);
            var end = piece.indexOf(']', index) + 1;
            if (end === 0) {
                lastIndex = lastIndex + start;
                return;
            }
            var module = piece.slice(start, end);
            var imported = /^\s*\[([\d,\s]*)/.exec(module);
            module = module.slice(imported[0].length, module.length - 1).replace(/^(function\s*\([^\)]*\)\s*\{)\s*return\s+function\s*\(\s*\)\s*\{([\s\S]*)\}\s*\(\s*\)[;\s]*(\})\s*$/, "$1$2$3");
            blocks.push({
                module,
                imported: imported[1].split(",").map(a => a.trim()).filter(a => a),
                importedid: "imported - " + ++importedId
            });

            index = end;
        }
        lastIndex = lastIndex + index;
    });
    return blocks;
};
var importedId = 0;

var manybuilder = function (buffer, filename) {
    var sign = /^[^\(]*?\(\[([\s\S]*?by\s+efront\b[\s\S]*?)\]\.map[\s\S]*\[(\d+)\]\(\)([^\(]+)?/i.exec(buffer);
    if (!sign) return commbuilder.apply(null, arguments);
    var data = String(buffer);
    var lastIndex = data.lastIndexOf("}");
    var fEnd = lastIndex;
    lastIndex = backskip(data, lastIndex);
    var fStart = data.lastIndexOf("function", lastIndex);
    var decoder = data.slice(fStart, fEnd);
    var isEncrypted = !/[A-Za-z]\s*\=\s*function\s*\(\s*?\)\s*\{\s*return\s+[a-zA-Z]\s*\;?\s*\}/.test(decoder);
    if (isEncrypted) return commbuilder.apply(null, arguments);

    lastIndex = autoskip(data, data.indexOf("{") + 1);
    var aStart = data.indexOf("[", lastIndex) + 1;
    var aEnd = data.lastIndexOf("]", fStart);
    data = data.slice(aStart, aEnd);
    var blocks = readBlocks(data);
    var [, comment, index, exports] = sign;

    for (var cx = 0, dx = blocks.length; cx < dx; cx++) {
        var b = blocks[cx];
        if (b.imported) {
            var hasRequired = false, requiredIndex;
            b.imported = b.imported.map((a, i) => {
                var b = blocks[a - 1];
                if (b === '[]') {
                    b = "require";
                    requiredIndex = i;
                    hasRequired = true;
                }
                else if (b[0] === '[') {
                    b = b.length > 6 ? "module" : "exports";
                }
                if (b.module) b.marked = true;
                return b;
            });
            var params = /^\s*function[^\(]*\(([^\)]*)\)/.exec(b.module)[1].split(',');
            if (hasRequired) {
                var requiredName = params[requiredIndex].trim();
                b.module = b.module.replace(new RegExp(/(^|[\=\-\+\/&\*\?\;~!><,\]\[\}\{\|'";\(\)])\s*/.source + requiredName + /\s*\(\s*(\d+)\s*([,\)])/.source, 'g'), function (m, eq, required, qt) {
                    required -= 1;
                    blocks[required].marked = true;
                    return eq + requiredName + "(\"" + blocks[required].importedid + "\"" + qt;
                });
            }

        }

    }
    var block = blocks[index];
    block.marked = true;
    if (exports) {
        block = {
            marked: true,
            imported: [block, exports.replace(/\[(['"])([\s\S]*)\1\]|\.([\s\S]*)/g, '"$2$3"')],
            module: `function(a,b){return a[b]}`
        };
        blocks.push(block);
    }
    block.sign = comment;
    block.all = blocks.filter(b => b.marked);
    return block;
};
module.exports = manybuilder;