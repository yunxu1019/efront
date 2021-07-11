var js_keywords = `
if,in,do,
var,for,new,try,let,
this,else,case,void,with,enum,elif,from,
async,while,break,catch,throw,const,yield,class,
return,typeof,delete,switch,export,import,
default,finally,extends,
function,continue,debugger,Infinity,abstract,nonlocal,
null|true|false|NaN|Infinity|undefined|arguments
instanceof,implements
`;
var c_java_go_python = `
go,or,as,is,
len,map,int,and,
make,func,goto,chan,type,sync,byte,char,long,auto,pass,open
label,purge,stack,
defer,range,final,float,short,super,union,model,
global,assert,except,lambda,
inline,select,struct,public,native,static,strict,throws,double,extern,signed,sizeof
package,private,boolean,
typedef
interface,transient,
fullthrough
synchronized
_Bool,_Complex,_Imaginary
_Alignas,_Alignof,_Atomic,_Static_assert,_Noreturn,_Thread_local,_Generic
False,None,True
strictfp,volatile,unsigned,restrict,
`

var others = `
fi,md,rd,rm,cd,ls
rem,
ren,
clc,cld,cli,chs,cls,dir,
cmp
ins,
dec,inc,pop,ptr,
seg,set,
lea
shl,shr
cat
popa,popf,fstp,fist,fadd,fsub,fmul,fdiv,fild
endp,ends,proc,idiv,imul,
call,chcp,
code,data,even,
loop,push,
test,find,
open,
exit,
move,
copy,
echo,
help,
type,
popd,
more,
wmic,
setx
clear,print,
pushd,
assoc,ftype,mkdir,xcopy,
enter,bound,cupid,group,raise,start,local
subst,
title,
fistp,fiadd,fisub,fimul,fidiv,
rename,
assume,offset,
segment,startup,
template
`;
var keywords = [js_keywords, c_java_go_python, others].join("|").trim().split(/[,\r\n\s\|]+/).join("|");
keywords = new RegExp(`^(${keywords})$`, 'i');
var source = `abcdefghijklmnopqrstuvwxyz`;
source += source.toUpperCase() + "_$";
var number = source + '0123456789';
var counts = [
    54,
    54 * 64,
    54 * 64 * 64,
    54 * 64 * 64 * 64,
    54 * 64 * 64 * 64 * 64
];
function create(n, length) {
    var rest = [];
    while (length > 0) {
        rest[length] = (number[n & 0b111111]);
        length--;
        n = n >>> 6;
    }
    rest[0] = source[n];
    return rest.join("");
}
function namelist(count, prevent, skip) {
    var dist = [];
    if (!prevent) prevent = {};
    var skip0 = skip;
    for (var cy = 0, dy = counts.length; cy < dy; cy++) {
        if (count <= 0) break;
        var limit = counts[cy];
        if (skip >= limit) {
            skip -= limit;
            continue;
        }
        if (skip) count += skip;
        count -= limit;
        for (var cx = skip | 0, dx = count < 0 ? limit + count : limit; cx < dx; cx++) {
            var a = create(cx, cy);
            if (keywords.test(a) || a in prevent) {
                if (dx < limit) {
                    dx++;
                    count++;
                } else {
                    count++;
                }
            } else {
                dist.push(a);
            }
        }
        skip0 += dx - skip;
        skip = 0;
    }
    dist.skip = skip0;
    return dist;
}
module.exports = namelist;