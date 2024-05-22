var { SCOPED, QUOTED, SPACE, STAMP, STRAP, EXPRESS, PROPERTY } = compile$common;
var asm = new compile$Javascript;
asm.straps = [
    "include", "includelib",
    "typedef",
    "proto",
    'equ', "and", 'or', 'not', "sizeof",
    "invoke", "offset", 'addr',
    "end", "start",
    "proc", "endp", "uses",
    "macro", 'struct', "ends",
    ".if", ".elseif", '.else', '.break', '.endif', '.while', '.endw', "db", 'real4', 'real8', 'dw', 'dd', 'dq', 'byte', 'word', 'dword', 'qword', 'tword', 'dt',
];
asm.control_reg = /^\.[\w]+$/;
asm.stamps = [",", ":", "<", ">", "=", "&", "|", "*", "~", "!", "+", "-", '/'];
asm.quotes = [
    ["'", "'"],
    ['"', '"']
];
asm.comments = [
    [";", /(?=[\r\n\u2028\u2029])/]
];

var go = new compile$Javascript;
go.straps = ["var", 'for', 'package', "import", 'type', 'func', 'struct', 'return', 'go', 'const', 'if', 'else', 'switch', 'case', 'default', 'range'];
go.istype = function (o) {
    var last = o.prev;
    if (!last) return;
    if (last.type === EXPRESS) return true;
};

var typescript = new compile$Javascript;
typescript.straps = typescript.straps.concat(
    "interface", "implements", "declare", "module", "namespace",
    "readonly", "private", "asserts", "is",
    "enum", "type");
typescript.tags[0].push("{");
var js = new compile$Javascript;
js.tags[0].push("{");
var json = new compile$Javascript;
json.inExpress = true;
var gl = new compile$Javascript;
gl.straps = gl.straps.concat(
    "in", "out", "inout", "uniform", "buffer", "shared",
    "highp", "mediump", "lowp",
    "invariant", "const", "varying", "attribute",
    "sampler2D", "texture2D",
    "sampler3D", "texture3D",
    "coherent", "volatile", "restrict", "readonly", "writeonly",
    "flat", "noperspective", "smooth",
    "packed", "shared", "std140", "std340", "row_major", "colum_major",
    "location", "set", "binding", "offset", "index", "xfb_buffer", "xfb_offset", "local_size",
    "void",
    'require', 'enable', 'disable', 'warn',
    'struct',
    'float', 'int',
    'vec4', 'vec3', 'vec2',
    'mat4', 'mat3', 'mat2',
    'bool', 'const', 'precision',
    "step", "smoothstep",
    "mix", "clamp"
);
var rust = new compile$Javascript;
rust.powermap = Object.assign({}, rust.powermap);
rust.powermap["->"] = 0;
rust.straps = ["let", 'use', 'mut', 'fn', 'if', 'else', 'loop', 'while', 'for', 'in', 'break', 'true', 'false', 'struct', 'enum', 'impl', 'self', 'match', 'pub', 'mod', 'trait'];
var struct_reg = /^(while|do|for|with|switch|case|default|if|else|try|catch|finally|loop|import|export)$/;

gl.setType = function (o) {
    var { type } = o;
    var queue = o.queue;
    var last = o.prev;
    if (type & (SCOPED | EXPRESS | PROPERTY)) {
        if (last && last === queue[queue.length - 1] && last.type & (EXPRESS | STRAP | PROPERTY)) {
            last.istype = !struct_reg.test(last.text);
        }
    }
}
var 素心 = new compile$素馨.素心;
素心.scopes.push(['[', ']']);
素心.straps.push('important',
    'after', 'backdrop', 'before',
    'cue', 'cue-range',
    'file-selector-button', 'first-letter', 'last-letter', 'first-line',
    'grammer-error', 'highlight', 'marker', 'part',
    'placeholder', 'selection', 'slotted', 'spelling-error', 'target-text',
    'view-transition', 'view-transition-group', 'view-transition-image-pair', 'view-transition-new', 'view-transition-old',
    'active', 'any-link', 'autofill',
    'blank',
    'checked', 'current',
    'dir', 'default', 'defined', 'disabled',
    'empty', 'enabled',
    'first', 'first-child', 'first-of-type', 'future', 'focus', 'focus-visible', 'focus-within', 'fullscreen',
    'has', 'host', 'host-context', 'hover',
    'indeterminate', 'in-range', 'invalid', 'is',
    'lang', 'last-child', 'last-of-type', 'left', 'link', 'local-link',
    'modal',
    'not', 'nth-child', 'nth-col', 'nth-last-child', 'nth-last-col', 'nth-last-of-type', 'nth-of-type',
    "only-child", 'only-of-type', 'optional', 'out-of-range',
    'past', 'picture-in-picture', 'placeholder-shown', 'paused', 'playing',
    'read-only', 'read-write', 'required', 'right', 'root',
    'scope', 'state',
    'target', 'target-within',
    'user-invalid',
    'valid', 'visited',
    'where'
);
素心.stamps.push("=");
var setless = function (c) {
    var set = function (o) {
        if (o.type === PROPERTY) {
            var q = o.queue;
            if (q.type === SCOPED && q.entry !== "{") return;
            var next = o.next;
            if (next && (next.type !== STAMP || !/^[\:\=]$/.test(next.text))) {
                o.text = `<selector>${o.text}</selector>`;
                return;
            }
            if (next && (next.type === STAMP && next.text === ':')) {
                while (next && next.type !== SCOPED) {
                    if (next.type === STAMP && next.text === ';') return;
                    next = next.next;
                }
                if (next) o.text = `<selector>${o.text}</selector>`;
            }
            return;
        }
        if (o.type === EXPRESS) {
            var next = o.next;
            if (next?.type === SCOPED) return;
            if (!o.length) o.type = QUOTED;
            return;
        }
        if (o.type === STRAP) {
            if (!o.isprop) return o.type = EXPRESS;
            var p = o.prev;
            if (!/^@/.test(o.text) && (!p || p.type !== STAMP || !/\:$/.test(p.text))) o.type = PROPERTY;
            return;
        }

        if (o.type === SCOPED && o.length) {
            o.forEach(set);
        }
    };
    c.forEach(set);
};
var 语言 = {
    javascript(a) {
        return 扫描(a, js);
    },
    typescript(a) {
        return 扫描(a, typescript);
    },
    go(a) {
        return 扫描(a, go);
    },
    json(a) {
        return 扫描(a, json);
    },
    less(a) {
        var c = 扫描(a, 素心);
        setless(c);
        return c;
    },
    rs(a) {
        return 扫描(a, rust);
    },
    glsl(a) {
        return 扫描(a, gl);
    },
    asm(a) {
        return 扫描(a, asm);
    },
    html(a) {
        var code = 扫描(a, 'html');
        var scoped = code.scoped;
        backEach(scoped.richNodes, n => {
            if (n.isScript || n.isStyle) {
                var s = n.isScript ? js : 素心;
                var c = [];
                compile$common.createString(n).replace(/^(\s*\<\!--)([\s\S]*)(--\!?\>\s*)$|^[\s\S]*$/, (m, p, a, f) => {
                    if (!a) {
                        c = 扫描(m, s);
                    }
                    else {
                        c = 扫描(a, s);
                        c.unshift(
                            { type: compile$common.COMMENT, text: p },
                        );
                        c.push(
                            { type: compile$common.COMMENT, text: f }
                        );
                    }
                    if (n.isStyle) setless(c);
                });
                n.splice(0, n.length, ...c);
            }
        })
        return code;
    }
};

语言.gl = 语言.glsl;
语言.cmd = 语言.bat;
语言.css = 语言.less;
语言.cjs = 语言.mjs = 语言.jsx = 语言.js = 语言.javascript;
语言.tsx = 语言.ts = 语言.typescript;
语言.xht = 语言.jsp = 语言.asp = 语言.php = 语言.xml = 语言.html;
语言.vue = 语言.xht;
return 语言;