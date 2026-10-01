var { VALUE, EXPRESS, QUOTED, SCOPED } = require("./common");
var { decode } = require("../basic/strings");
// <!--
var getRegExp = function () {
    var readable = [], start, end, prefix = "";
    var straft = a => "\\u" + (0b110111 << 10 | a & 0x3ff).toString(16);
    var strpre = a => "\\u" + (0b110110 << 10 | a).toString(16);
    var aftaft = function (start, end) {
        if (!((start & 0x3ff) <= (end & 0x3ff))) throw new Error(`参数异常${straft(start)}-${straft(end)}`);
        if (start === end) return `${straft(start)}`;
        if (start === end - 1) return straft(start) + straft(end);
        return straft(start) + "-" + straft(end);
    }
    var toString = function () {
        var { start, end } = this;
        var lastprefix = prefix;
        if (start > end) throw new Error("区间异常", start + "-" + end)
        if (end > 0xffff) {
            if (start <= 0xffff) throw new Error('区间异常');
            if (!prefix) prefix = '';
            end -= 0x10000;
            start -= 0x10000;
            prefix = start >>> 10;
            if (prefix !== end >>> 10) {
                var sprefix = "";
                if (prefix !== lastprefix) {
                    sprefix = sprefix + `]|${strpre(prefix)}[${aftaft(start, 0x3ff)}`;
                    prefix++;
                }
                else {
                    sprefix = sprefix + `${aftaft(start, 0x3ff)}`;
                    prefix++;
                }

                if (prefix !== end >>> 10) {
                    if (prefix === (end >>> 10) - 1) {
                        sprefix += `]|${strpre(prefix)}[${aftaft(0, 0x3ff)}`;
                    }
                    else {
                        sprefix += `]|[${strpre(prefix)}-${strpre((end >>> 10) - 1)}]|[${aftaft(0, 0x3ff)}`;
                    }
                    prefix = end >>> 10;
                }
                sprefix += `]|${strpre(prefix)}|[${aftaft(0, end)}`;
                return sprefix;
            }
        }
        else {
            prefix = '';
        }
        if (prefix === lastprefix) {
            if (prefix) return aftaft(start, end);
            if (!(start <= end)) throw new Error(`区间异常${start.toString(16)}-${end.toString(16)}`)
            if (/^[a-zA-Z$_0-9]$/.test(String.fromCharCode(start))) {
                start = String.fromCharCode(start);
                end = String.fromCharCode(end);
            }
            else {
                start = start.toString(16);
                end = end.toString(16);
                start = "\\u" + Array(5 - start.length).join('0') + start;
                end = "\\u" + Array(5 - end.length).join('0') + end;
            }
            // start = String.fromCharCode(start);
            // end = String.fromCharCode(end);
            if (start === end) return start;
            if (this.start === this.end - 1) return start + end;
            return `${start}-${end}`;
        }
        else {
            return `]|${strpre(prefix)}[${aftaft(start, end)}`;
        }
    };
    var valueOf = function () {
        return this.end;
    };
    for (var cx = +readable[cx] + 1 >>> 0, dx = 0x10ffff; cx < dx; cx++) {
        try {
            if ((cx & 0xffff) === 0) console.info(`正在检查0x${cx.toString(16)}-0x${(cx + 0xffff).toString(16)}`);
            eval(`(function(a${String.fromCodePoint(cx)}9_){}())`);
            if (!start) start = cx, end = cx;
            else end = cx;
        } catch {
            if (start && start !== end) readable.push({ start, end, valueOf, toString }), console.info(`检查到可用区间0x${start.toString(16)}-0x${end.toString(16)}`);
            else if (start) readable.push({ start, end, valueOf, toString }), console.info(`检查到可用字符0x${start.toString(16)}(${String.fromCodePoint(start)})`);
            start = null;
        }
    }
    var reg = readable.join('').replace(/\\[ux]([a-f0-9]+)-\\[ux]([a-f0-9]+)/gi, function (m, a, b, index, input) {
        if (a.length > 4 || b.length > 4) throw console.warn(input.slice(Math.max(index, index - 10), index + 30)), new Error(`编码区间异常：${m} `)
        if (parseInt(a, 16) > parseInt(b, 16)) {
            throw new Error('区间异常：' + m);
        }
        eval(new RegExp(`[\\u${a}-\\u${b}]`))
        return m;
    }).replace(/([^\\])-([^\\])/g, function (m, a, b) {
        if (a > b) throw new Error(`区间异常${a.CodePointAt().toString(16)}-${b.CodePointAt().toString(16)}(${a}-${b})`)
        return m;
    });
    return `/(?:[${reg}])+/g`;
}
// console.info(getRegExp());
// -->
// 正则表达式，用于匹配各语种的非变量名字符，不含首字符，由前边的函数生成
var everReg = /(?:[$0-9A-Z_a-z\u00aa\u00b5\u00b7\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05ef-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u07fd\u0800-\u082d\u0840-\u085b\u0860-\u086a\u0870-\u0887\u0889-\u088f\u0897-\u08e1\u08e3-\u0963\u0966-\u096f\u0971-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u09fc\u09fe\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0af9-\u0aff\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c00-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3c-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58-\u0c5a\u0c5c\u0c5d\u0c60-\u0c63\u0c66-\u0c6f\u0c80-\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cdc-\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1-\u0cf3\u0d00-\u0d0c\u0d0e-\u0d10\u0d12-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d54-\u0d57\u0d5f-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d81-\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ece\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1369-\u1371\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1715\u171f-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u1820-\u1878\u1880-\u18aa\u18b0-\u18f5\u1900-\u191e\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19da\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1ab0-\u1abd\u1abf-\u1add\u1ae0-\u1aeb\u1b00-\u1b4c\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1c80-\u1c8a\u1c90-\u1cba\u1cbd-\u1cbf\u1cd0-\u1cd2\u1cd4-\u1cfa\u1d00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099-\u309f\u30a1-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua7dc\ua7f1-\ua827\ua82c\ua840-\ua873\ua880-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua8fd-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\ua9e0-\ua9fe\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff65-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]|\ud800[\udc00-\udc0b\u000d-\u0026\u0028-\u003a\u003c\u003d\u003f-\u004dP-]\u0080-\u00fa\u0140-\u0174\u01fd\u0280-\u029c\u02a0-\u02d0\u02e0\u0300-\u031f\u032d-\u034a\u0350-\u037a\u0380-\u039d\u03a0-\u03c3\u03c8-\u03cf\u03d1-\u03d5]|\ud801[\udc00-\udc9d\udca0-\udca9\udcb0-\udcd3\udcd8-\udcfb\udd00-\udd27\udd30-\udd63\udd70-\udd7a\udd7c-\udd8a\udd8c-\udd92\udd94\udd95\udd97-\udda1\udda3-\uddb1\uddb3-\uddb9\uddbb\uddbc\uddc0-\uddf3\ude00-\udf36\udf40-\udf55\udf60-\udf67\udf80-\udf85\udf87-\udfb0\udfb2-\udfba]|\ud802[\udc00-\udc05\udc08\udc0a-\udc35\udc37\udc38\udc3c\udc3f-\udc55\udc60-\udc76\udc80-\udc9e\udce0-\udcf2\udcf4\udcf5\udd00-\udd15\udd20-\udd39\udd40-\udd59\udd80-\uddb7\uddbe\uddbf\ude00-\ude03\ude05\ude06\ude0c-\ude13\ude15-\ude17\ude19-\ude35\ude38-\ude3a\ude3f\ude60-\ude7c\ude80-\ude9c\udec0-\udec7\udec9-\udee6\udf00-\udf35\udf40-\udf55\udf60-\udf72\udf80-\udf91]|\ud803[\udc00-\udc48\udc80-\udcb2\udcc0-\udcf2\udd00-\udd27\udd30-\udd39\udd40-\udd65\udd69-\udd6d\udd6f-\udd85\ude80-\udea9\udeab\udeac\udeb0\udeb1\udec2-\udec7\udefa-\udf1c\udf27\udf30-\udf50\udf70-\udf85\udfb0-\udfc4\udfe0-\udff6]|\ud804[\udc00-\udc46\udc66-\udc75\udc7f-\udcba\udcc2\udcd0-\udce8\udcf0-\udcf9\udd00-\udd34\udd36-\udd3f\udd44-\udd47\udd50-\udd73\udd76\udd80-\uddc4\uddc9-\uddcc\uddce-\uddda\udddc\ude00-\ude11\ude13-\ude37\ude3e-\ude41\ude80-\ude86\ude88\ude8a-\ude8d\ude8f-\ude9d\ude9f-\udea8\udeb0-\udeea\udef0-\udef9\udf00-\udf03\udf05-\udf0c\udf0f\udf10\udf13-\udf28\udf2a-\udf30\udf32\udf33\udf35-\udf39\udf3b-\udf44\udf47\udf48\udf4b-\udf4d\udf50\udf57\udf5d-\udf63\udf66-\udf6c\udf70-\udf74\udf80-\udf89\udf8b\udf8e\udf90-\udfb5\udfb7-\udfc0\udfc2\udfc5\udfc7-\udfca\udfcc-\udfd3\udfe1\udfe2]|\ud805[\udc00-\udc4a\udc50-\udc59\udc5e-\udc61\udc80-\udcc5\udcc7\udcd0-\udcd9\udd80-\uddb5\uddb8-\uddc0\uddd8-\udddd\ude00-\ude40\ude44\ude50-\ude59\ude80-\udeb8\udec0-\udec9\uded0-\udee3\udf00-\udf1a\udf1d-\udf2b\udf30-\udf39\udf40-\udf46]|\ud806[\udc00-\udc3a\udca0-\udce9\udcff-\udd06\udd09\udd0c-\udd13\udd15\udd16\udd18-\udd35\udd37\udd38\udd3b-\udd43\udd50-\udd59\udda0-\udda7\uddaa-\uddd7\uddda-\udde1\udde3\udde4\ude00-\ude3e\ude47\ude50-\ude99\ude9d\udeb0-\udef8\udf60-\udf67\udfc0-\udfe0\udff0-\udff9]|\ud807[\udc00-\udc08\udc0a-\udc36\udc38-\udc40\udc50-\udc59\udc72-\udc8f\udc92-\udca7\udca9-\udcb6\udd00-\udd06\udd08\udd09\udd0b-\udd36\udd3a\udd3c\udd3d\udd3f-\udd47\udd50-\udd59\udd60-\udd65\udd67\udd68\udd6a-\udd8e\udd90\udd91\udd93-\udd98\udda0-\udda9\uddb0-\udddb\udde0-\udde9\udee0-\udef6\udf00-\udf10\udf12-\udf3a\udf3e-\udf42\udf50-\udf5a\udfb0]|\ud808[\udc00-\udf99]|\ud809[\udc00-\udc6e\udc80-\udd43]|\ud80b[\udf90-\udff0]|\ud80c[\udc00-\udfff]|\ud80d|[\udc00-\udc2f\udc40-\udc55\udc60-\udfff]|[\ud80e-\ud80f]|[\udc00-\udfff]|\ud810|[\udc00-\udffa]|\ud811[\udc00-\ude46]|\ud818[\udd00-\udd39]|\ud81a[\udc00-\ude38\ude40-\ude5e\ude60-\ude69\ude70-\udebe\udec0-\udec9\uded0-\udeed\udef0-\udef4\udf00-\udf36\udf40-\udf43\udf50-\udf59\udf63-\udf77\udf7d-\udf8f]|\ud81b[\udd40-\udd6c\udd70-\udd79\ude40-\ude7f\udea0-\udeb8\udebb-\uded3\udf00-\udf4a\udf4f-\udf87\udf8f-\udf9f\udfe0\udfe1\udfe3\udfe4\udff0-\udff6]|\ud81c[\udc00-\udfff]|[\ud81d-\ud822]|[\udc00-\udfff]|\ud823|[\udc00-\udcd5\udcff-\udd1e\udd80-\uddf2]|\ud82b[\udff0-\udff3\udff5-\udffb\udffd\udffe]|\ud82c[\udc00-\udd22\udd32\udd50-\udd52\udd55\udd64-\udd67\udd70-\udefb]|\ud82f[\udc00-\udc6a\udc70-\udc7c\udc80-\udc88\udc90-\udc99\udc9d\udc9e]|\ud833[\udcf0-\udcf9\udf00-\udf2d\udf30-\udf46]|\ud834[\udd65-\udd69\udd6d-\udd72\udd7b-\udd82\udd85-\udd8b\uddaa-\uddad\ude42-\ude44]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e\udc9f\udca2\udca5\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb\udfce-\udfff]|\ud836[\ude00-\ude36\ude3b-\ude6c\ude75\ude84\ude9b-\ude9f\udea1-\udeaf]|\ud837[\udf00-\udf1e\udf25-\udf2a]|\ud838[\udc00-\udc06\udc08-\udc18\udc1b-\udc21\udc23\udc24\udc26-\udc2a\udc30-\udc6d\udc8f\udd00-\udd2c\udd30-\udd3d\udd40-\udd49\udd4e\ude90-\udeae\udec0-\udef9]|\ud839[\udcd0-\udcf9\uddd0-\uddfa\udec0-\udede\udee0-\udef5\udefe\udeff\udfe0-\udfe6\udfe8-\udfeb\udfed\udfee\udff0-\udffe]|\ud83a[\udc00-\udcc4\udcd0-\udcd6\udd00-\udd4b\udd50-\udd59]|\ud83b[\ude00-\ude03\ude05-\ude1f\ude21\ude22\ude24\ude27\ude29-\ude32\ude34-\ude37\ude39\ude3b\ude42\ude47\ude49\ude4b\ude4d-\ude4f\ude51\ude52\ude54\ude57\ude59\ude5b\ude5d\ude5f\ude61\ude62\ude64\ude67-\ude6a\ude6c-\ude72\ude74-\ude77\ude79-\ude7c\ude7e\ude80-\ude89\ude8b-\ude9b\udea1-\udea3\udea5-\udea9\udeab-\udebb]|\ud83e[\udff0-\udff9]|\ud840[\udc00-\udfff]|[\ud841-\ud868]|[\udc00-\udfff]|\ud869|[\udc00-\udedf\udf00-\udfff]|[\ud86a-\ud86d]|[\udc00-\udfff]|\ud86e|[\udc00-\udc1d\udc20-\udfff]|[\ud86f-\ud872]|[\udc00-\udfff]|\ud873|[\udc00-\udead\udeb0-\udfff]|[\ud874-\ud879]|[\udc00-\udfff]|\ud87a|[\udc00-\udfe0\udff0-\udfff]|\ud87b|[\udc00-\ude5d]|\ud87e[\udc00-\ude1d]|\ud880[\udc00-\udfff]|[\ud881-\ud883]|[\udc00-\udfff]|\ud884|[\udc00-\udf4a\udf50-\udfff]|[\ud885-\ud88c]|[\udc00-\udfff]|\ud88d|[\udc00-\udc79]|\udb40[\udd00-\uddef])+/g;

var getReadableKey = function (text) {
    var type = /^\//.test(text) ? 'R' : 'T';
    if (type === 'T') text = decode(text);
    if (currentMap && text in currentMap) return currentMap[text];
    var avaiable = [, type];
    text.slice(0, 20).replace(everReg, function (a) {
        avaiable.push(a);
    });
    avaiable.push(type);
    var k = type + avaiable.join('\\');
    k = k.replace(/(\d+)px/ig, "$1_px");

    var i = 0;
    if (k in quotedMap && text !== quotedMap[k]) {
        var i = 0;
        while (k + i in quotedMap && text !== quotedMap[k + i]) i++;
        k += i;
        quotedMap[k] = text;
    }
    if (currentMap) currentMap[text] = k;
    return k;
}
var quotedMap = Object.create(null);
var currentMap = null;
var strkeeps = null;
var trimStringLiteral = function (code) {
    for (var o of code) switch (o.type) {
        case QUOTED:
            if (!o.length) throw new Error("无法处理有参数的模板串！");
            if (o.keep) {
                strkeeps.push(o);
                continue;
            }
            o.text = getReadableKey(o.text);
            o.type = EXPRESS;
            break;
        case SCOPED:
            o.forEach(trimStringLiteral);
            break;
    }
};
function breakcode(code) {
    currentMap = Object.create(null);
    strkeeps = [];
    var keys = Object.keys(currentMap).map(k => currentMap[k]);
    code.strkeys = keys;
    code.strkeeps = strkeeps;
    currentMap = null;
    strkeeps = null;
}

breakcode.getkey = function (string) {
    return getReadableKey(string);
}

Object.defineProperty(breakcode, 'quoted', {
    get() {
        return quotedMap;
    },
    set(v) {
        quotedMap = v;
    }
});
module.exports = breakcode;