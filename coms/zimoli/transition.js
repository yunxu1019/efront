var transitionKey = 'transition';
var bodyStyle = document.documentElement.style;
if (!(transitionKey in bodyStyle)) {
    if ('mozTransition' in bodyStyle) transitionKey = 'mozTransition';
    else if ('webkitTransition' in bodyStyle) {
        transitionKey = 'webkitTransition';
    }
    else if ('msTransition' in bodyStyle) {
        transitionKey = 'msTransition';
    } else {
        transitionKey = '';
    }
}
function transition(target, isLeave, _initialStyle = target.initialStyle || target.enterStyle || target.leavingStyle || target.leaveStyle) {
    if (!target) return;
    if (typeof isLeave === "string") {
        isLeave = parseKV(isLeave, ';', ":");
    }
    if (isObject(isLeave) && (_initialStyle === true || !_initialStyle)) {
        var temp = _initialStyle;
        _initialStyle = isLeave;
        isLeave = temp;
    }
    if (isLeave) {
        _initialStyle = target.leavingStyle || target.leaveStyle || _initialStyle;
    }
    if (target instanceof Array) {
        target.forEach(function (target) {
            transition(target, isLeave, _initialStyle);
        });
        return;
    }
    if (!target.style) return;
    var initialStyle = _initialStyle || target.initialStyle;
    var { recoverStyle, transitionTimerStart, transitionTimerEnd } = target;
    clearTimeout(transitionTimerStart);
    clearTimeout(transitionTimerEnd);
    if (isString(initialStyle)) {
        initialStyle = parseKV(initialStyle, ";", ":");
    }
    if (isObject(initialStyle)) {
        var transitionDuration = 100;
        if (!initialStyle.transition) {
            initialStyle.transition = "all .3s ease";
        }
        if (transitionKey.length > 10) initialStyle[transitionKey] = initialStyle.transition;
        String(initialStyle.transition).replace(/([\.\d]+)(m?)s/gi, function (m, d, t) {
            if (t) transitionDuration = Math.max(+d, transitionDuration);
            else transitionDuration = Math.max(d * 1000, transitionDuration);
            return m;
        });
        transitionDuration = transitionKey ? transitionDuration || 260 : 0;
        if (!recoverStyle) {
            recoverStyle = {};
        }
        var savedStyle = Object.create(null);
        {
            let originalStyle = target.style;
            for (let k in initialStyle) {
                savedStyle[k] = originalStyle[k];
            }
        }
        extendIfNeeded(recoverStyle, savedStyle);
        if (isLeave) {
            transitionTimerStart = setTimeout(function () {
                extend(target.style, initialStyle);
            });
            transitionTimerEnd = setTimeout(function () {
                if (transitionKey) target.style[transitionKey] = recoverStyle.transition;
            }, transitionDuration + 2);
        } else {
            extend(target.style, initialStyle);
            if (transitionKey) target.style[transitionKey] = "none";
            var waitPaint = 20;
            transitionTimerStart = setTimeout(function () {
                delete recoverStyle.transition;
                if (transitionKey) target.style[transitionKey] = initialStyle.transition;
                target.transitionTimerStart = setTimeout(function () {
                    extend(target.style, recoverStyle);
                }, waitPaint);
            });
            transitionTimerEnd = setTimeout(function (transition) {
                return function () {
                    if (transitionKey) target.style[transitionKey] = transition;
                };
            }(recoverStyle.transition || ''), transitionDuration + waitPaint);
        }
        target.transitionTimerStart = transitionTimerStart;
        target.transitionTimerEnd = transitionTimerEnd;
        target.recoverStyle = recoverStyle;
        if (target.with) {
            transition(target.with, isLeave, _initialStyle);
        }
        return transitionDuration;
    }
}
