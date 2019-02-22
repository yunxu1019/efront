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
            initialStyle.transition = "all .3s ease-out";
        }
        String(initialStyle.transition).replace(/([\.\d]+)(m?)s/gi, function (m, d, t) {
            if (t) transitionDuration = Math.max(+d, transitionDuration);
            else transitionDuration = Math.max(d * 1000, transitionDuration);
            return m;
        });
        transitionDuration = transitionDuration || 100;
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
            extend(target.style, initialStyle);
            transitionTimerEnd = setTimeout(function () {
                target.style.transition = recoverStyle.transition;
            }, transitionDuration + 2);
        } else {
            extend(target.style, initialStyle);
            transitionTimerStart = setTimeout(function () {
                delete recoverStyle.transition;
                extend(target.style, recoverStyle);
            });
            transitionTimerEnd = setTimeout(function (transition) {
                return function () {
                    target.style.transition = transition;
                };
            }(recoverStyle.transition), transitionDuration);
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
