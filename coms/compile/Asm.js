const {
    STAMP,
    STRAP,
    LABEL,
    EXPRESS,
    COMMENT,
    SPACE,
    PROPERTY,
    QUOTED,
    VALUE,
    saveTo,
    mergeTo,
} = common;
var createScoped = function (code = this) {
    var scopes = [];
    var vars = null;
    var used = null;
    var scoped = null;
    var push = function () {
        scopes.push(scoped);
        scoped = [];
        vars = Object.create(null);
        used = Object.create(null);
        scoped.vars = vars;
        scoped.used = used;
    };
    var pop = function () {
        var envs = Object.create(null);
        var { used, vars } = scoped;
        var used0 = Object.create(null);
        for (var k in used) {
            if (!(k in vars)) {
                envs[k] = true;
                used0[k] = used[k];
            }
        }
        scoped.envs = envs;
        scoped = scopes.pop();
        mergeTo(scoped.used, used0);
    };
    push();
    for (var c of code) switch (c.type) {
        case STRAP: switch (c.text.toLowerCase()) {
            case "endp":
            case "ends":
            case "endm":
                pop();
                break;
            case "proc":
            case "macro":
            case "struct":
                push();
                break;
            case "db":
            case "dd":
            case "dw":
            case "equ":
                var p = c.prev;
                if (!p || p.type !== EXPRESS) continue;
                vars[p.text] = true;
                break;
        }
        case EXPRESS:
        case LABEL:
            var tack = /^[\.\?\:]+/.exec(c.text);
            if (!tack) continue;
            tack = tack[0];
            saveTo(used, tack, c);
    };
    return { vars };

}
class Asm extends Program {
    nocase = true;
    value_reg = new RegExp(`^(${["byte", "tbyte", "word", "dword", "qword",
        "ah", "ch", "dh", "bh", "al", "cl", "dl", "bl",
        "ax", "cx", "dx", "bx", "sp", "bp", "si", "di",
        "rax", "rcx", "rdx", "rbx", "rsp", "rbp", "rsi", "rdi",
        "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15",
        "r8d", "r9d", "r10d", "r11d", "r12d", "r13d", "r14d", "r15d",
        "r8w", "r9w", "r10w", "r11w", "r12w", "r13w", "r14w", "r15w",
        "r8b", "r9b", "r10b", "r11b", "r12b", "r13b", "r14b", "r15b",
        "eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi",
        "es", "cs", "ss", "ds", "fs", "gs",
        "mm0", "mm1", "mm2", "mm3", "mm4", "mm5", "mm6", "mm7",
        "tmm0", "tmm1", "tmm2", "tmm3", "tmm4", "tmm5", "tmm6", "tmm7",
        "xmm0", "xmm1", "xmm2", "xmm3", "xmm4", "xmm5", "xmm6", "xmm7",
        "ymm0", "ymm1", "ymm2", "ymm3", "ymm4", "ymm5", "ymm6", "ymm7",
        "zmm0", "zmm1", "zmm2", "zmm3", "zmm4", "zmm5", "zmm6", "zmm7",
        "st0", "st1", "st2", "st3", "st4", "st5", "st6", "st7", "st",
        "ptr"
    ].join("|")})$`, 'i');
    straps = [
        "include", "includelib",
        "typedef",
        "proto",
        'equ', "and", 'or', 'not', "sizeof",
        "invoke", "offset", 'addr',
        "local",
        "end",
        "enter",
        "movzx", "mov", "movq", "movss", "movsd", "movd",
        "addss", "subss", "mulss", "divss", "sqrtss", "ucomiss", "maxss", "minss",
        "fucom", "fucomp", "fucompp", "fucomi", "fucomip", "fcom", "fcomp", "fcompp",
        "fwait", "frndint",
        "fldz", "fld1", "fldpi", "fldl2t", "fldlg2", "fldln2", "fldl2e",
        "fxtract", "fxch", "fincstp", "fdecstp",
        "fprem", "fprem1",
        "fild", "fld",
        "fstcw", "fldcw",
        "sahf", "fstsw", "fclex",
        "fst", "fistp", "fstp", "fbld", "fbstp",
        "fchs", "fabs", "fsin", "fptan", "fyl2x", "f2xm1", "fscale",
        "finit", "fcos", "ffree", "fmulp", "fdivp",
        "faddp", "fsubp", "fsubrp", "fadd", "fsub", "fmul", "fdiv",
        "fist", "fiadd", "fisub", "fimul", "fidiv",
        "imul", "shr", "shr_cl", "sar", "sar_cl", "shl", "shl_cl", "mul", "div",
        "inc", "dec", "add", "sub", "test", "pause",
        "lock", "xchg", "cmpxchg", "cmpxchg8b", "cmp",
        "lea", "neg", "not", "and", "or", "xor",
        "pushad", "pusha", "popad", "popa", "pushfd", "popfd", "push", "pop",
        "align", "nop", "int3", "rdtsc",
        "je", "jz", "jne", "jnz", "jo", "jno", "js", "jns", "jp", "jnp", "jae", "ja", "jbe", "jb", "jge", "jnl", "jle", "jng", "jl", "jg",
        "jmp",
        "incopy",
        "call", "stdcall", "cominvk",
        "ret", "retn",
        "leave",
        "proc", "endp", "uses",
        "macro", 'struct', "ends",
        ".if", ".elseif", '.else', '.break', '.endif', '.while', '.endw',
        "db", 'real4', 'real8', 'dw', 'dd', 'dq', 'byte', 'word', 'dword', 'qword', 'tword', 'dt',
    ];
    control_reg = /^\.[\w]+$/;
    transive_reg = /^(\.(if|elseif|endif|while)|local|addr|offset)$/;
    stamps = [",", ":", "<", ">", "=", "&", "|", "*", "~", "!", "+", "-", '/'];
    quotes = [
        ["'", "'"],
        ['"', '"']
    ];
    scopes = [
        ["(", ")"],
        ["[", "]"],
        ["{", "}"],
        ["<", ">"],
    ];
    tags = [];
    comments = [
        [";", /(?=[\r\n\u2028\u2029])/]
    ];
};
Asm.prototype.createScoped = createScoped;

Asm.prototype.createString = common.createString;