var getIndexFromOrderedArray = require("./getIndexFromOrderedArray");
var saveToOrderedArray = require("./saveToOrderedArray");
var _dict = [];
var _lastIndex = 0;
var _prefix = [];
var _dist = [];
var _bitDeep = 9;
var _half = 0;
function _clear() {
    _bitDeep = 9;
    _dict = [];
}
var compare = function (flag, buff, matchLength) {
    if (matchLength !== false) if (flag.length !== buff.length) return false;
    for (var cx = 0, dx = flag.length; cx < dx; cx++) {
        if (flag[cx] !== buff[cx]) return false;
    }
    return true;
};
var _writeTo;
function _writeTo1(dist, d) {
    var half = _half;
    var nextHalf = half + _bitDeep;
    if (half) {
        dist[dist.length - 1] += d >>> _bitDeep - (8 - half);
        nextHalf -= 8;
    }
    if (nextHalf >= 8) {
        nextHalf -= 8;
        dist.push(d >>> nextHalf & 0xff);
    }
    if (nextHalf > 0) dist.push((d << 8 - nextHalf) & 0xff);
    _half = nextHalf;
    if (1 << _bitDeep <= _dict.length + 259) {
        _bitDeep++;
    }
}
function _writeTo2(dist, d) {
    var half = _half;
    var nextHalf = half + _bitDeep;
    if (half) {
        dist[dist.length - 1] |= (d & (1 << 8 - half) - 1) << half;
        nextHalf -= 8;
    }
    if (nextHalf >= 8) {
        dist.push(d >>> _bitDeep - nextHalf & 0xff);
        nextHalf -= 8;
    }
    if (nextHalf > 0) dist.push(d >>> _bitDeep - nextHalf);
    _half = nextHalf;
    if (1 << _bitDeep <= _dict.length + 258 && _bitDeep < 12) {
        _bitDeep++;
    }

}
function _findDict(prefix) {
    var dict = _dict;
    var index = getIndexFromOrderedArray(dict, prefix);
    var d = dict[index];
    if (d && compare(d, prefix)) return d.index;
}
function _addDict(prefix) {
    var dict = _dict;
    prefix.index = dict.length + 258;
    saveToOrderedArray(dict, prefix);

}
function _pass(buff) {
    if (!buff.length) return [];
    var dict = _dict;
    var dist = _dist;
    if (dict.length || _prefix.length) {
        var lastIndex = _lastIndex;
        var prefix = _prefix;
        var start = 0;
    } else {
        var lastIndex = buff[0];
        _writeTo(dist, 256);
        var prefix = [lastIndex];
        var start = 1;
    }
    for (var cx = start, dx = buff.length; cx < dx; cx++) {
        prefix.push(buff[cx]);
        var old = lastIndex;
        lastIndex = _findDict(prefix);
        if (!lastIndex) {
            _writeTo(dist, old);
            _addDict(prefix);
            lastIndex = buff[cx];
            prefix = [lastIndex];
            if (_dict.length >= 3837) {
                _writeTo(dist, 256);
                _clear();
            }
        }
    }
    _lastIndex = lastIndex;
    _prefix = prefix;
    if (_half) {
        _dist = dist.splice(dist.length - 1, 1);
    } else {
        _dist = [];
    }
    return dist;
}
function _end(dist) {
    var data = _dist;
    if (_dict.length) {
        _writeTo(data, _lastIndex);
    }
    _writeTo(data, 257);
    _prefix = [];
    _dict = [];
    _half = 0;
    _bitDeep = 9;
    _lastIndex = 0;
    _dist = [];
    _prefix = [];
    if (dist) dist.push.apply(dist, data);
    return data;
}

function encodeLZW(buff, isBigEndStart) {
    if (isBigEndStart !== false) _writeTo = _writeTo1;
    else _writeTo = _writeTo2;
    var encoded = _pass(buff);
    _end(encoded);
    return encoded;
}

module.exports = encodeLZW;