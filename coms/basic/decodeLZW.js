var _dict = [];
var _prefix = [];
var _buff = [];
var _bitDeep = 9;
var _half = 0;
var _addLength = 0;
function _clear() {
    _bitDeep = 9;
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
        d.index = dict.length + 258;
        dict.push(d);
        if (1 << _bitDeep <= dict.length + 258 + _addLength) {
            if (!_addLength && _bitDeep >= 12) return;
            _bitDeep++;
        }
    }
}
function _writeTo(dist, b) {
    var prefix = _prefix;
    var dict = _dict;
    var end = false;
    if (b < 256) {
        prefix.push(b);
        _addDict(prefix);
        prefix = [b];
    } else if (b >= 258) {
        var d = dict[b - 258];
        if (!d) {
            prefix.push(prefix[0]);
            _addDict(prefix);
            prefix = prefix.slice(0);
        } else {
            prefix.push(d[0]);
            _addDict(prefix);
            prefix = d.slice(0);
        }
    } else if (b === 256) {
        _clear();
        prefix = [];
    } else if (b === 257) {
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
    if (dict.length) {
        var dist = [];
        if (half) {
            var [b, cx] = _readFrom(_buff.concat(buff[0], buff[1]), 0);
            if (_writeTo(dist, b)) end = true;
        }
        cx = cx - 1;
    } else {
        cx = 0;
        var dist = [];
    }
    if (!end) while (cx + 1 < buff.length) {
        if (cx + 2 === buff.length) {
            if (_half + _bitDeep + 7 >>> 3 > 2) break;
        }
        [b, cx] = _readFrom(buff, cx);
        if (_writeTo(dist, b)) break;
    }
    _buff = buff.slice(cx);
    return dist;
}
function _end() {
    _dict = [];
    _prefix = [];
    _buff = [];
    _half = 0;
    _bitDeep = 9;
    return [];
}

function decodeLZW(buff, isBigEndStart) {
    if (isBigEndStart !== false) _readFrom = _readFrom1, _addLength = 1;
    else _readFrom = _readFrom2, _addLength = 0;
    var decoded = _pass(buff);
    _end();
    return decoded;
}

module.exports = decodeLZW;