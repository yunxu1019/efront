var decodeUTF8 = require("../basic/decodeUTF8");
var encodeUTF16 = require("../basic/encodeUTF16");
var strings = require("../basic/strings");
var parseNumber = require("../basic/parseNumber");
var hex = d => (d < 16 || d > 159 ? '0' + d.toString(16) : d.toString(16)) + "h,";
var toUtf16 = function (code) {
    return encodeUTF16(code, false).map(hex).join('');
};

var toUtf8 = function (code) {
    return encodeUTF8(code).map(hex).join('');
};
var toUtf = toUtf16;
var replacePiece = function (piece, force) {
    if (/^A['"]/i.test(piece)) return piece.slice(1);
    if (/^U(tf8)?['"]/i.test(piece)) toUtf = toUtf8;
    if (/^U(tf)?16['"]/i.test(piece)) toUtf = toUtf16;
    if (!/^(\d+|\d+\.\d+|\d+\.|\.\d+)$/i.test(piece) || force) {
        if (/^[\da-f]+h$/.test(piece)) {
            if (piece.length !== 3) {
                piece = '0x' + piece.slice(0, piece.length - 1);
            }
        }
        if (/^[0\\]x[a-f\d]*$/i.test(piece)) {
            piece = toUtf(parseInt(piece.slice(2), 16));
        }
        else {
            piece = piece.replace(/[\ud800-\udfff]{2}|[\u0000-\uffff]/g, toUtf);
            piece = piece.slice(0, piece.length - 1);
        }
        if (force) piece += ",0,0"
    }
    return piece;
};
var exist = a => a;
var replaceDb = function (db) {
    var lastEnd = 0;
    var reg = /\\[\s\S]{1,16}|["',]/g;
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
                str = m;
            } else {
                piece = db.slice(lastEnd, match.index + m.length);
                lastEnd = match.index + m.length;
                piece = strings.decode(piece);
                if (piece) res.push(replacePiece(piece, !/\,/.test(db.charAt(lastEnd - 1))));
                str = '';
            }
        } else {
            var piece = db.slice(lastEnd, match.index);
            lastEnd = match.index + m.length;
            if (piece) res.push(replacePiece(piece));
        }
    }
    if (lastEnd < db.length) res.push(replacePiece(db.slice(lastEnd, db.length)));
    res = res.join(',').split(',');
    var rows = [];
    rows.push(res.splice(0, 16).join(','))
    while (res.length) {
        rows.push("        db " + res.splice(0, 16).join(','));
    }
    return rows.join('\r\n');
};
var real = function (a) {
    a = parseNumber(a).toString();
    if (!/\./.test(a)) a += '.0'
    return a;
}
var replaceReal = function (r) {
    return r.replace(/\s+/g, '').split(',').filter(exist).map(real).join(',');
};
var replaceRow = function (rowtext) {
    if (/^\s*;/.test(rowtext)) return rowtext;
    var commentIndex = rowtext.indexOf(';');
    var comment = '';
    if (commentIndex >= 0) {
        comment = rowtext.slice(commentIndex);
        rowtext = rowtext.slice(0, commentIndex);
    }
    var match = /^(\s*(?:[^\:,;\?\*\&\^\-\+=\!~`'"\<\>\.\\\/\[\]\(\)\[\]\|\%]+\s+)?)(d[dwb]|real\d)(\s+)([\s\S]*?)\s*$/i.exec(rowtext);
    if (!match) return rowtext + comment;
    var [, prefix, type, space, db] = match;
    var match = /^([\s\S]*?)(\s*dup\((?:\?|\d+)\)\s*)$/i.test(db);
    if (!match) switch (type) {
        case "dw":
            toUtf = toUtf16;
            db = replaceDb(db);
            type = 'db';
            break;
        case "db":
            toUtf = toUtf8;
            db = replaceDb(db);
            break;
        case "real4":
        case "real8":
            db = replaceReal(db);
    }
    rowtext = prefix + type + space + db;
    return rowtext + comment;
};

function asm2unicode(data) {
    var asm = decodeUTF8(data);
    asm = asm.replace(/^[\s\S]+?$/mg, replaceRow);
    return asm
}
module.exports = asm2unicode