function 颜色帧(c1, c2, point) {
    c1 = color.parse(c1);
    c2 = color.parse(c2);
    var hsl1 = color.rgb2hsl(c1);
    var hsl2 = color.rgb2hsl(c2);
    var h = 浮点帧(hsl1[0], hsl2[0], point);
    var s = 浮点帧(hsl1[1], hsl2[1], point);
    var l = 浮点帧(hsl1[2], hsl2[2], point);
    var rgb = color.hsl2rgb([h, s, l]);
    if (c1.length > 3) {
        var a = 浮点帧(c1[3], c2[3], point);
        rgb.push(a);
    }
    return color.stringify(rgb);
}
function 浮点帧(f1, f2, point) {
    return f1 * point + f2 * (1 - point);
}
function 参数帧(a1, a2, point) {
    return a1.map((a, i) => {
        return 单位帧(a.trim(), (a2[i] || '0').trim(), point);
    });
}
function 函数帧(p1, p2, point) {
    var r = /([^\(\)]+?)\(([^\)]*)\)/g;
    var o2 = Object.create(null);
    p2.replace(r, function (_, n, p) {
        o2[n] = p;
    });
    return p1.replace(r, function (_, n, p) {
        var v = o2[n];
        if (!v) {
            switch (n) {
                case 'translate':
                    v = '0,0';
                    break;
                case "scale":
                    v = '1,1';
                    break;
                default:
                    v = '1,0,0,0,1,0';
            }
        }
        return `${n}(${参数帧(p.split(','), v.split(','), point).join(',')})`;
    });
}
var targetWidth = innerWidth;
var unitFloatReg = /^(\d+(?:\.\d+)?|\.\d+)([^\d]*)$/;
function 单位帧(u1, u2, point) {
    var m1 = unitFloatReg.exec(u1);
    if (!m1) return u1;
    var [, v1, p1] = m1;
    var m2 = unitFloatReg.exec(u2);
    if (m2) {
        if (m1[1] === m2[1]) return 浮点帧(m1[0], m2[2], point) + m1[1];
        var [, v2, p2] = m2;
        if (p2 === "%") {
            v2 = targetWidth * v2;
        }
        if (p1 === "%") {
            v2 = v2 / targetWidth;
        }
    }
    else v2 = 0;
    return 浮点帧(v1, v2, point) + p1;
}
function 值帧(k, v1, v2, point) {
    if (/color|background/.test(k)) {
        return 颜色帧(v1, v2, point);
    }
    if (/\(/.test(v1)) {
        return 函数帧(v1, v2, point);
    }
    else {
        v1 = v1.trim().split(/\s+/);
        v2 = v2.trim().split(/\s+/);
        if (v2.length < v1.length) {
            switch (v2.length) {
                case 1:
                    v2[1] = v1[0];
                case 2:
                    v2[2] = v1[0];
                case 3:
                    v2[3] = v1[1];
            }
        }
        return 参数帧(v1, v2, point).join(' ');
    }
}
function 帧样式(style, captureStyle, point) {
    var newStyle = new InnerStyle;
    for (var k in style) {
        newStyle[k] = 值帧(k, style[k], captureStyle[k], point);
    }
    return newStyle;
}
function InnerStyle(o) {
    for (var k in o) {
        var v = o[k];
        this[css.transformNodeKey(k)] = css.transformValue(v);
    }
}

var transitionKey = css.transformNodeKey("transition");

function transition(target, _isLeave, _initialStyle) {
    if (!target) return;
    if ((isObject(_isLeave) || typeof _isLeave === "string") && (isFinite(_initialStyle) || !_initialStyle)) {
        var temp = _initialStyle;
        _initialStyle = _isLeave;
        _isLeave = temp;
    }
    if (target instanceof Array) {
        target.forEach(function (target) {
            transition(target, _isLeave, _initialStyle);
        });
        return;
    }
    if (!target.style) return;
    var isLeave = _isLeave;
    var point = null;
    if (isNumber(isLeave)) {
        point = isLeave;
    }
    var hasInitialStyle = !!_initialStyle;
    if (!_initialStyle) {
        _initialStyle = target.initialStyle || target.enterStyle || target.leavingStyle || target.leaveStyle;
        if (isLeave) {
            _initialStyle = target.leavingStyle || target.leaveStyle || _initialStyle;
        }
    }
    var initialStyle = _initialStyle;
    if (typeof initialStyle === "string") {
        initialStyle = parseKV(initialStyle, ';', ":");
    }
    if (!(initialStyle instanceof InnerStyle)) initialStyle = new InnerStyle(initialStyle);
    if (hasInitialStyle) _initialStyle = initialStyle;
    var { recoverStyle, transitionTimerStart, transitionTimerEnd, captureStyle } = target;
    clearTimeout(transitionTimerStart);
    clearTimeout(transitionTimerEnd);
    var transitionDuration = 100;
    if (!initialStyle[transitionKey]) {
        initialStyle[transitionKey] = "all .3s ease";
        transitionDuration = 300;
    }
    String(initialStyle[transitionKey]).replace(/([\.\d]+)(m?)s/gi, function (m, d, t) {
        if (t) transitionDuration = Math.max(+d, transitionDuration);
        else transitionDuration = Math.max(d * 1000, transitionDuration);
        return m;
    });
    transitionDuration = transitionDuration || 260;
    if (!recoverStyle) recoverStyle = {};
    if (!captureStyle) captureStyle = {};
    var savedStyle = Object.create(null);
    {
        let originalStyle = target.style;
        for (let k in initialStyle) {
            savedStyle[k] = originalStyle[k];
        }
        let computedStyle = getComputedStyle(target);
        for (let k in initialStyle) {
            if (!(k in captureStyle)) captureStyle[k] = computedStyle[k];
        }
    }
    extendIfNeeded(recoverStyle, savedStyle);
    if (point === 0 || point === 1) {
        isLeave = point === 1;
        point = null;
        var transitionValue = initialStyle[transitionKey];
        delete initialStyle[transitionKey];
        initialStyle = 帧样式(initialStyle, captureStyle, point);
        initialStyle[transitionKey] = transitionValue;
    }
    if (point !== null) {
        delete initialStyle[transitionKey];
        target.style[transitionKey] = 'none';
        initialStyle = 帧样式(initialStyle, captureStyle, point);
        extend(target.style, initialStyle);
    }
    else if (isLeave) {
        transitionTimerStart = setTimeout(function () {
            extend(target.style, initialStyle);
            delete target.recoverStyle;
            delete target.captureStyle;
        });
        transitionTimerEnd = setTimeout(function () {
            if (transitionKey) target.style[transitionKey] = recoverStyle[transitionKey];
            extend(target.style, recoverStyle);
        }, transitionDuration + 29);
    } else {
        extend(target.style, initialStyle);
        if (transitionKey) target.style[transitionKey] = "none";
        var waitPaint = 20;
        transitionTimerStart = setTimeout(function () {
            delete recoverStyle[transitionKey];
            if (transitionKey) target.style[transitionKey] = initialStyle[transitionKey];
            target.transitionTimerStart = setTimeout(function () {
                extend(target.style, recoverStyle);
                delete target.recoverStyle;
                delete target.captureStyle;
            }, waitPaint);
        });
        transitionTimerEnd = setTimeout(function (transition) {
            return function () {
                if (transitionKey) target.style[transitionKey] = transition;
            };
        }(recoverStyle[transitionKey] || ''), transitionDuration + waitPaint);
    }
    target.transitionTimerStart = transitionTimerStart;
    target.transitionTimerEnd = transitionTimerEnd;
    target.recoverStyle = recoverStyle;
    target.captureStyle = captureStyle;
    if (target.with) {
        transition(target.with, _isLeave, _initialStyle);
    }
    return transitionDuration;
}

