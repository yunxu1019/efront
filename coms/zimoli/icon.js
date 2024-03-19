console.error(i18n`图标组件的服务端已从efront移除，请勿使用！`);
var setBackGround, icon, icn;
var binaryImagePathReg = /^https?\:|\.(?:png|gif|bmp|jpe?g)$/i;
if (/MSIE\s*[2-8]/.test(navigator.userAgent)) {
    icn = new Image;
    css(icn, "display:block;width:28px;height:28px;position:relative;");
    setBackGround = function (img, src) {
        img.src = "ccon/" + src + ".png";
    };
    icon = function (path, color, hover, active) {
        var icon = icn.cloneNode();
        if (binaryImagePathReg.test(path)) {
            icon.src = path;
            return icon;
        }
        setBackGround(icon, path + "." + (color || 0).toString(16));
        return icon;
    };
} else {
    icn = document.createElement("div");
    setBackGround = function (div, src) {
        css(div, "background-image:url('data:image/png;base64," + src + "')");
    };
    icon = function (path, color, hover, active) {
        var icon = icn.cloneNode();
        if (binaryImagePathReg.test(path)) {
            css(icon, {
                backgroundImage: `url('${path}')`
            });
            return icon;
        }
        init("." + path, function (src) {
            if (color || isNumber(color)) {
                var chunks = pngdecode(src);
                var PLTE_COLOR = plte(color);
                var PLTE_HOVER = plte(hover);
                var PLTE_ACTIVE = plte(active);
                src = pngencode(chunks, PLTE_COLOR);
            }
            setBackGround(icon, src);
        });
        return icon;
    };
}




//crc
function table(sign) {
    var c, table = new Array(256);
    for (var n = 0; n < 256; n++) {
        c = n;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        table[n] = c;
    }
    return table;
}

function crc(bstr, seed) {
    var C = seed ^ -1,
        L = bstr.length - 1;
    for (var i = 0; i < L;) {
        C = C >>> 8 ^ T[(C ^ bstr[i++]) & 0xFF];
        C = C >>> 8 ^ T[(C ^ bstr[i++]) & 0xFF];
    }
    if (i === L) C = C >>> 8 ^ T[(C ^ bstr[i]) & 0xFF];
    return C ^ -1;
}

var sign = parseInt("-52l3vk", 36);
var T = table(sign);

//png decode encode
var png_leader = [137, 80, 78, 71, 13, 10, 26, 10];


function fromUInt32BE(a, b, c, d) {
    return (a << 24) + (b << 16) + (c << 8) + d;
}

function getType(chunk) {
    return String.fromCharCode(chunk[4], chunk[5], chunk[6], chunk[7]);
}

function getchunks(binaries) {
    var chunkstart = png_leader.length;
    var totalLength = binaries.length
    var chunks = [];
    while (chunkstart < totalLength) {
        var size = fromUInt32BE(binaries[chunkstart], binaries[chunkstart + 1], binaries[chunkstart + 2], binaries[chunkstart + 3]);
        var chunkend = chunkstart + size + 12;
        chunks.push(binaries.slice(chunkstart, chunkend));
        chunkstart = chunkend;
    }
    return chunks;
}


function pngdecode(base64) {
    var binaries = fromBase64(base64);
    var _chunks = getchunks(binaries);
    for (var cx = 0, dx = _chunks.length; cx < dx; cx++) {
        var chunk = _chunks[cx];
        var type = getType(chunk);
        _chunks[type] = chunk;
    }
    return _chunks;
}

function getUInt32BE(integer) {
    return [integer >>> 24, integer >>> 16 & 0xff, integer >>> 8 & 0xff, integer & 0xff];
}

function parseType(type) {
    return [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
}

function chunk(type, data) {
    if (!data) data = [];
    if (!(data instanceof Array)) {
        data = [].slice.call(data, 0);
    }
    var length = data.length;
    var typed = parseType(type).concat(data);
    return getUInt32BE(length).concat(typed, getUInt32BE(crc(typed)));
}

var tRNS = function () {
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(i);
    }
    return chunk("tRNS", data);
}();

function plte(color) {
    var r = color >>> 16 & 0xff;
    var g = color >>> 8 & 0xff;
    var b = color & 0xff;
    var PLTE = [];
    for (var cx = 0, dx = 768; cx < dx;) {
        PLTE[cx++] = r;
        PLTE[cx++] = g;
        PLTE[cx++] = b;
    }
    return chunk("PLTE", PLTE);
}

function pngencode(chunks, PLTE) {
    return toBase64(png_leader.concat(chunks.IHDR, PLTE, tRNS, chunks.IDAT, chunks.IEND));
}

//


//base64
var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

var decodeMap = function () {
    var map = {};
    for (var cx = 0, dx = encoding.length; cx < dx; cx++) {
        map[encoding[cx]] = cx;
    }
    return map;
}();

function toBase64(input) {
    for (
        // initialize result and counter
        var block, charCode, idx = 0, map = encoding, length = input.length, output = [];
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        idx < length || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output.push(encoding.charAt(63 & block >> 8 - idx % 1 * 8))
    ) {
        charCode = input[parseInt(idx += 3 / 4)];
        block = block << 8 | charCode;
    }
    return output.join("");
}


function fromBase64(input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = [];
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? (bs << 6) + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4) ? output.push(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = decodeMap[buffer];
    }
    return output;
}