var transitionKey = 'transition';
var bodyStyle = document.body.style;
if (!transitionKey in document.body.style) {
    if ('mozTransition' in document.body.style) transitionKey = 'mozTransition';
    else if ('webkitTransition' in bodyStyle) {
        transitionKey = 'webkitTransition';
    }
    else if ('msTransition' in bodyStyle) {
        transitionKey = 'msTransition';
    } else {
        transitionKey = '';
    }
}
function transition(target, initialStyle, isLeave) {
    if (!target) return;
    var { recoverStyle, transitionTimerStart, transitionTimerEnd } = target;
    clearTimeout(transitionTimerStart);
    clearTimeout(transitionTimerEnd);
    if (isString(initialStyle)) {
        initialStyle = parseKV(initialStyle, ";", ":");
    }
    if (target instanceof Array) {
        target.map(function (target) {
            transition(target, initialStyle, isLeave);
        });
    } else if (initialStyle instanceof Object) {
        let transitionDuration = 100;
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
            let savedStyle = {};
            {
                let originalStyle = target.style;
                for (let k in initialStyle) {
                    savedStyle[k] = originalStyle[k];
                }
            }
            recoverStyle = savedStyle;
        }
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
            transitionTimerStart = setTimeout(function () {
                delete recoverStyle.transition;
                if (transitionKey) target.style[transitionKey] = initialStyle.transition;
                extend(target.style, recoverStyle);
            });
            transitionTimerEnd = setTimeout(function (transition) {
                return function () {
                    if (transitionKey) target.style[transitionKey] = transition;
                };
            }(recoverStyle.transition || ''), transitionDuration);
        }
        target.transitionTimerStart = transitionTimerStart;
        target.transitionTimerEnd = transitionTimerEnd;
        target.recoverStyle = recoverStyle;
        if (target.with) {
            transition(target.with, initialStyle, isLeave);
        }
        return transitionDuration;
    }
}
