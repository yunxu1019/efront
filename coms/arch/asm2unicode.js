var decodeUTF8 = require("../basic/decodeUTF8");
var prefix = ",0,00,000,0000".split(",").reverse();
var strings = require("../basic/strings");
var hexindex = [[2, 4], [0, 2]];
var toHex = function (code) {
    code = code.charCodeAt(0).toString(16);
    code = prefix[code.length] + code;
    return hexindex.map(([a, b]) => (/\d/.test(code.charAt(a)) ? "" : "0") + code.slice(a, b) + "h,").join("");
};

var replacePiece = function (piece, force) {
    var match = /^([\s\S]*?)(\s*dup\((?:\?|\d+)\)\s*)$/i.exec(piece);
    if (match) {
        var [, piece, dup] = match;
    }
    if (!/^(\d+|\d+\.\d+|\d+\.|\.\d+)$/i.test(piece) || force) {
        if (/^[\da-f]+h$/.test(piece)) {
            if (piece.length !== 3) {
                piece = '0x' + piece.slice(0, piece.length - 1);
            }
        }
        if (/^[0\\]x[a-f\d]*$/i.test(piece)) {
            piece = toHex(parseInt(piece.slice(2), 16));
        }
        else {
            piece = piece.replace(/[\u0000-\uffff]/g, toHex);
            piece = piece.slice(0, piece.length - 1);
        }
        if(force) piece+=",0,0"
    }
    if (dup) piece += dup;
    return piece;
};
var exist = a => a;
var replaceDb = function (db) {
    var lastEnd = 0;
    var reg = /\\[\s\S]|["',]/g;
    var str = '';
    var res = [];
    while (lastEnd < db.length) {
        var match = reg.exec(db);
        if (!match) break;
        var m = match[0]
        if (m.length > 1) continue;
        if (str && m !== str) continue;
        if (m !== ",") {
            if (!str) {
                var piece = db.slice(lastEnd, match.index);
                lastEnd = match.index;
                if (piece) res.push(replacePiece(piece));
                str = m;
            } else {
                piece = db.slice(lastEnd, match.index + match.length);
                lastEnd = match.index + m.length;
                piece = strings.decode(piece);
                if (piece) res.push(replacePiece(piece, true));
                str = '';
            }
        } else {
            var piece = db.slice(lastEnd, match.index);
            lastEnd = match.index + m.length;
            if (piece) res.push(replacePiece(piece));
        }
    }
    if (lastEnd < db.length) res.push(replacePiece(db.slice(lastEnd, db.length)));
    return res.join(",");
};

var replaceRow = function (rowtext) {
    if (/^\s*;/.test(rowtext)) return rowtext;
    var commentIndex = rowtext.indexOf(';');
    var comment = '';
    if (commentIndex >= 0) {
        comment = rowtext.slice(commentIndex);
        rowtext = rowtext.slice(0, commentIndex);
    }
    var match = /^(\s*[a-z]\w*\s+db\s+)([\s\S]*?)\s*$/i.exec(rowtext);
    if (!match) return rowtext + comment;
    var [, prefix, db] = match;
    rowtext = prefix + replaceDb(db);
    return rowtext + comment;
};

function asm2unicode(data) {
    asm = decodeUTF8(data);
    asm = asm.replace(/^[\s\S]+?$/mg, replaceRow);
    return asm
}
module.exports = asm2unicode