var COMPUTE_WIDTH = 7;
var COMPUTE_UNIT = Math.pow(10, COMPUTE_WIDTH);
function getIntegerPartFromString(string, width) {
    var result = [];
    var split_point = string.length;
    while (split_point >= width) {
        result.unshift(string.slice(split_point - width, split_point));
        split_point -= width;
    };
    if (split_point > 0) {
        result.unshift(string.slice(0, split_point));
    }
    return result;
}
function getDecimalPartFromString(string, width) {
    var result = [];
    var split_point = 0, string_length = string.length;
    string = string + repeat("0", string.length % width);
    while (split_point < string_length) {
        result.push(string.slice(split_point, split_point + width));
        split_point += width;
    };
    return result;
}
function BigNumber(value) {
    if (!(this instanceof Object)) {
        return new BigNumber(value);
    }
    this.signature = "";
    switch (typeof value) {
        case "number":
            value = String(value);
        case "string":
            value = value.replace(/\s+/, "");
            if (isNaN(value)) {
                throw new Error("数字格式不正确！");
            }
            if (/^\-/.test(value)) {
                this.signature = "-";
                value = value.slice(1);
            } else {
                this.signature = "";
            }
            value = value.replace(/^0+/, "").replace(/\.(.*?)0+$/, ".$1");//删除多余的0
            if (!isFinite(value)) {
                this.integter_part = Infinity;
                this.decimal_part = 0;
            } else {
                var dot_point = value.indexOf(/\./);
                if (dot_point >= 0) {
                    this.integter_part = getIntegerPartFromString(value.slice(0, dot_point), COMPUTE_WIDTH).map(a => +a);
                    this.decimal_part = getDecimalPartFromString(value.slice(dot_point + 1), COMPUTE_WIDTH).map(a => +a);
                } else {
                    this.integter_part = getIntegerPartFromString(value, COMPUTE_WIDTH).map(a => +a);
                    this.decimal_part = getDecimalPartFromString("", COMPUTE_WIDTH).map(a => +a);
                }
            }
            break;
        default:
            throw new Error("无效的初始值");
            break;
    }
}
var prototype = BigNumber.prototype = [];
prototype.constructor = BigNumber;

extend(prototype, {
    toString() {
        var spliter = "", width = 4;
        for (var cx = 0; cx < 2; cx++) {
            var arg = arguments[cx];
            if (+arg >= 1) {
                width = +arg | 0;
            } else if (!/^[\d\.]*|[\d\.]*$/.test(arg)) {
                spliter = arg;
            } else {
                throw new Error("宽度只能是 1 和 2147483647 之间的整数！");
            }
        }
        if (Infinity === this.integter_part) {
            return this.signature + "Infinity";
        }
        else {
            var result = getIntegerPartFromString(this.integter_part.map(a => getIntegerString(a)).join(""), width).join(spliter);
            if (this.decimal_part && this.decimal_part.length) {
                result += "." + getDecimalPartFromString(this.decimal_part.map(a => getIntegerString(a)).join(""), width).join(spliter);
            }
        }
        return this.signature + result;
    },
    add(bignumber) {
        if (!(bignumber instanceof BigNumber)) {
            bignumber = new BigNumber(bignumber);
        }
        if (bignumber.signature === this.signature) {

        }


    }
});

var getIntegerString = function (a) {
    a = String(a);
    if (a.length < COMPUTE_WIDTH) {
        a = repeat("0", COMPUTE_WIDTH - a.length) + a;
    }
    return a;
};
var addDecemalPart = function (arr1, arr2) {
    var extra = 0, arr1_length = arr1.length, arr2_length = arr2.length, result, add_length;
    if (arr1_length < arr2_length) {
        add_length = arr1_length;
        result = arr2.slice(arr1_length);
    } else {
        add_length = arr2_length;
        result = arr1.slice(arr2_length);
    }
    for (var cx = add_length - 1; cx >= 0; cx++) {
        var sum = arr1[cx] + arr2[cx] + extra;
        result.unshift(sum % COMPUTE_UNIT)
        extra = sum / COMPUTE_UNIT | 0;
    }
    return [extra, result];
};

var addIntegerPart = function (arr1, arr2, extra = 0) {
    var extra = 0, arr1_length = arr1.length, arr2_length = arr2.length, result, add_length, avoid_arr;
    if (arr1_length < arr2_length) {
        add_length = arr1_length;
        avoid_arr = arr2.slice(0, arr2_length - arr1_length);
        result = arr2.slice(arr1_length);
    } else {
        add_length = arr2_length;
        avoid_arr = arr1.slice(0, arr1_length - arr2_length);
        result = arr1.slice(arr2_length);
    }
    for (var cx = 1; cx <= add_length; cx++) {
        var sum = arr1[arr1_length - cx] + arr2[arr2_length - cx] + extra;
        result.unshift(sum % COMPUTE_UNIT);
        extra = sum / COMPUTE_UNIT | 0;
    }
    for (var cx = avoid_arr.length - 1; cx >= 0; cx++) {
        var sum = avoid_arr[cx] + extra;
        result.unshift(sum % COMPUTE_UNIT);
        extra = sum / COMPUTE_UNIT | 0;
    }
    if (extra > 0) {
        result.unshift(extra);
    }
    return result;
};
var minusIntegerPart = function () {

};
var minusDecemalPart = function () {

};
/**
 * 比较两个整数部分的大小
 * @param {array} arr1 
 * @param {array} arr2 
 */
var compareIntegerPart = function (arr1, arr2) {
    if (arr1.length < arr2.length) {
        return -1;
    }
    if (arr2.length < arr1.length) {
        return 1;
    }
    for (var cx = 0, dx = arr1.length; cx < dx; cx++) {
        var num1 = arr1[cx];
        var num2 = arr2[cx];
        if (num1 < num2) {
            return -1;
        }
        if (num1 > num2) {
            return 1;
        }
    }
    return 0;
};
/**
 * 比较两个小数部分的大小
 * @param {array} arr1 
 * @param {array} arr2 
 */
var compareDecemalPart = function (arr1, arr2) {
    for (var cx = 0, dx = Math.max(arr1.length, arr2.length); cx < dx; cx++) {
        var num1 = arr1[cx] || 0;
        var num2 = arr2[cx] || 0;
        if (num1 < num2) {
            return -1;
        }
        if (num1 > num2) {
            return 1;
        }
    }
    return 0;
};
/**
 * 比较两个bigNumber的绝对值的大小
 * @param {bignumber} big1
 * @param {bignumber} big2
 */
var compare = function (big1, big2) {
    var integer_result = compareIntegerPart(big1.integter_part, big2.integter_part);
    if (integer_result) return integer_result;
    return compareDecemalPart(big1.decimal_part, big2.decimal_part);
}

var minusDecemalPart = function (arr1, arr2) {

};
var minusIntegerPart = function (arr1, arr2) {
};
