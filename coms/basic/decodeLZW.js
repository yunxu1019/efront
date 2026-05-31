var _dict = [];
var _prefix = [];
var _buff = [];
var _bitDeep = 9;
var _bitInit = 9;
var _dictSize = 258;
var _half = 0;
var _addLength = 0;
function _clear() {
    _bitDeep = _bitInit;
    _dict = [];
}

var _readFrom;

function _readFrom2(buff, cx) {
    var half = _half;
    var b = 0;
    var bit = 0;
    var nextHalf = half + _bitDeep;
    if (half) {
        b = buff[cx] >>> half;
        bit = 8 - half;
        cx++;
        nextHalf -= 8;
    }
    if (nextHalf >= 8) {
        nextHalf -= 8;
        b += buff[cx] << bit;
        bit += 8;
        cx++;
    }
    if (nextHalf > 0) {
        b += (buff[cx] << 8 - nextHalf & 0xff) >> 8 - nextHalf << bit;
    }
    _half = nextHalf;
    return [b, cx];

}

function _readFrom1(buff, cx) {
    var half = _half;
    var b = 0;
    var nextHalf = half + _bitDeep;
    if (half) {
        b = (buff[cx] << half & 0xff) >> half;
        cx++;
        nextHalf -= 8;
    }
    if (nextHalf >= 8) {
        nextHalf -= 8;
        b = (b << 8) + buff[cx];
        cx++;
    }
    if (nextHalf > 0) b = (b << nextHalf) + (buff[cx] >>> 8 - nextHalf);
    _half = nextHalf;
    return [b, cx];
}
function _addDict(d) {
    if (d.length > 1) {
        var dict = _dict;
        d.index = dict.length + _dictSize;
        dict.push(d);
        if (1 << _bitDeep <= dict.length + _dictSize + _addLength) {
            if (!_addLength && _bitDeep >= 12) return;
            _bitDeep++;
        }
    }
}
function _writeTo(dist, b) {
    var prefix = _prefix;
    var dict = _dict;
    var end = false;
    if (b < _dictSize - 2) {
        prefix.push(b);
        _addDict(prefix);
        prefix = [b];
    } else if (b >= _dictSize) {
        var d = dict[b - _dictSize];
        if (!d) {
            prefix.push(prefix[0]);
            _addDict(prefix);
            prefix = prefix.slice(0);
        } else {
            prefix.push(d[0]);
            _addDict(prefix);
            prefix = d.slice(0);
        }
    } else if (b === _dictSize - 2) {
        _clear();
        prefix = [];
    } else if (b === _dictSize - 1) {
        end = true;
        prefix = [];
    }
    _prefix = prefix;
    dist.push.apply(dist, prefix);
    return end;
}
function _pass(buff) {
    if (!buff.length) return [];
    var dict = _dict;
    var half = _half;
    var end = false;
    var dist = [];
    var cx = 0;
    if (_buff.length) {
        var bl = _buff.length;
        do {
            var [b, cx] = _readFrom(_buff.concat(buff[0], buff[1]), cx);
            if (_writeTo(dist, b)) {
                end = true;
                break;
            }
        } while (cx < bl);
        cx = cx - bl;
    }
    if (!end) while (cx + 1 < buff.length) {
        if (cx + 2 === buff.length) {
            if (_half + _bitDeep + 7 >>> 3 > 2) break;
        }
        [b, cx] = _readFrom(buff, cx);
        if (_writeTo(dist, b)) break;
    }
    _buff = buff.slice(cx);
    if (_buff.length === 1) _buff = [_buff[0]];
    else _buff = Array.apply(null, _buff);
    return dist;
}
function _end() {
    _dict = [];
    _prefix = [];
    _buff = [];
    _half = 0;
    _bitDeep = 9;
    _bitInit = 9;
    return [];
}

function decodeLZW(buff, isBigEndStart, lzw_size) {
    open(isBigEndStart, lzw_size);
    var decoded = _pass(buff);
    _end();
    return decoded;
}
var open = decodeLZW.open = function (isBigEndStart, lzw_size = 8) {
    if (isBigEndStart !== false) _readFrom = _readFrom1, _addLength = 1;
    else _readFrom = _readFrom2, _addLength = 0;
    _dictSize = (1 << lzw_size) + 2;
    _bitDeep = _bitInit = lzw_size + 1;
};
decodeLZW.pass = _pass;
decodeLZW.close = _end;
module.exports = decodeLZW;