var serialize = require("../basic/serialize");
var asm2unicode = require("../arch/asm2unicode");
function sortfile(a, b) {
    if (~a.invokes.indexOf(b.name)) {
        return -1;
    }
    if (~b.invokes.indexOf(a.name)) {
        return 1;
    }
    return 0
}

function rename(f, from, to) {
    throw new Error(i18n`暂不支持变量重命名`);
    if (from in f.datas) {
        f.datas[to] = f.datas[from];
        delete f.datas[from];
    }
    f.codes.forEach(c => {

    })

}


var getName = function (k, map) {
    var prefix = 2;
    var t = k;
    while (t in map) {
        t = k + prefix
        prefix++;
    }
    return t;
};
var lastmodel = '.model flat,stdcall';
var lastarch = '.386';
var lastoption = 'option casemap:none';
var endlabel = "";
var format = function (codes) {
    var label_count = 1;
    var result = [];
    for (var cx = 0, dx = codes.length; cx < dx; cx++) {
        var c = codes[cx];
        if (/^\.model\s/i.test(c)) {
            lastmodel = c;
            continue;
        }
        if (/^\.\d+$/i.test(c)) {
            if (!(c < lastarch)) lastarch = c;
            continue;
        }
        if (/^option\s/i.test(c)) {
            lastoption = c;
            continue;
        }
        if (/^\.(code|data\??|const)$/i.test(c)) {
            continue;
        }
        if (/^\s*end\s/i.test(c)) {
            label_count = 0;
        }
        if (/^\s*\.end(if|w)$/i.test(c)) {
            label_count--;
        }
        if (label_count) {
            c = new Array(label_count - /^(\.else(if)?|\w+\:$)/i.test(c)).fill("    ").join('') + c;
        }
        if (/^\s*\.(if|while)\s/i.test(c)) {
            label_count++;
        }
        result.push(c);
    }
    return result;
}

function toAsm(a) {
    var asms = Object.keys(a).map(k => a[k]).filter(a => a.realpath).map(a => a.data);
    var protos = {};
    var datas = {};
    var codes = [];
    var procs = [];
    var equals = {
        __UNICODE__: 1
    };
    var includes = {};
    asms.forEach(a => {
        var ds = a.datas;
        extend(includes, a.includes);
        extend(equals, a.equals);
        for (var k in ds) {
            var d = ds[k];
            if (k in datas) {
                var k2 = getName(k, datas);
                k = rename(a, k, k2);
                datas[k2] = d;
            } else {
                datas[k] = ds[k];
            }
            datas[k] = d;
        }
    });
    asms.forEach(a => {
        a.procs.forEach(p => {
            procs.push(p);
        });
        codes.push.apply(codes, a.codes);
    });
    for (var cx = 0, dx = procs.length; cx < dx; cx++) {
        var min = cx;
        for (var cy = cx, dy = procs.length; cy < dy; cy++) {
            if (!procs[cy].invokes.length) {
                min = cy;
                break;
            }
            var p = procs[cy];
            for (var cz = cx, dz = procs.length; cz < dz; cz++) {
                if (p.invokes.indexOf(procs[cz].name) > 0) {
                    break;
                }
            }
            if (cz === dz) {
                min = cy;
                break;
            }
        }
        if (min !== cx) {
            var temp = procs.splice(min, 1)[0];
            procs.splice(cx, 0, temp);
        }
    }
    procs = procs.map(p => {
        var locals = serialize(p.locals, ',', "");
        var codes = format(p.codes);
        if (locals) locals = '\r\n    local ' + locals;
        if (p.type === 'proc' || p.type === 'macro') {
            // protos[p.name] = `${p.name} PROTO ${serialize(p.params, ",", "")}`;
            return `${p.row}${locals}\r\n${codes.join("\r\n")}\r\n${p.name} end${p.type[0]}`;
        }
        else {
            protos[p.name] = `${p.name} ${p.type}\r\n    ${p.codes.join("\r\n    ")}\r\n${p.name} ends`;
        }
    }).filter(a => !!a);
    datas = Object.keys(datas).map(k => datas[k]);
    codes = format(codes);
    var code = `${lastarch}\r\n${lastmodel}\r\n${lastoption}
${Object.keys(equals).map(k => `${k} equ ${equals[k]}`).join('\r\n')}
${Object.keys(includes).join('\r\n')}
${Object.keys(protos).map(k => protos[k]).join(`\r\n`)}
.data
    ${Object.keys(datas).map(k => datas[k]).join('\r\n    ')}
.code
${procs.join("\r\n")}
${codes.join('\r\n')}

`.split(/[\r\n]+/).join("\r\n");
    var distpath = require("./environment").EXPORT_TO;
    code = asm2unicode(Buffer.from(code));
    return {
        [distpath]: {
            destpath: distpath,
            data: Buffer.from(code)
        }
    };
}