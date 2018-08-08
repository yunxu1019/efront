function getMarginLeft(offsetLeft, offsetWidth, innerWidth) {
    // -marginLeft/offsetWidth=(-marginLeft+offsetLeft)/innerWidth
    // marginLeft/innerWidth-marginLeft/offsetWidth=offsetLeft/innerWidth
    // marginLeft*offsetWidth-marginLeft*innerWidth=offsetLeft*offsetWidth
    // marginLeft(offsetWidth-innerWidth)=offsetLeft*offsetWidth
    // marginLeft=offsetLeft*offsetWidth/(offsetWidth-innerWidth)
    if (offsetWidth === +innerWidth) return -offsetWidth / 2;
    return offsetLeft * offsetWidth / (offsetWidth - innerWidth);
}
var toCloneTarget = function (target) {
    var clone = cloneVisible(target);
    var position = getScreenPosition(target);
    css(clone, `position:absolute;left:${position.left}px;top:${position.top}px;user-select:none;`);
    opacity(target, 0);
    return clone;
};
function drag(target, event, overflow = false) {
    if (isArray(target)) {
        var extraTargets = target.slice(1);
        target = target[0];
    } else {
        var extraTargets = target.with ? [].concat(target.with) : [];
    }
    var saved_delta = { x: target.offsetLeft - event.clientX, y: target.offsetTop - event.clientY };
    var clone;
    var saved_opacity = target.style.opacity;
    var saved_filter = target.style.filter;
    var extraStyles = extraTargets.map(e => ({ opacity: e.style.opacity, filter: e.style.filter }));
    var extraClones;
    var cancelmousemove = onmousemove(window, function (event) {
        if (event.defaultPrevented) return;
        if (!saved_delta.ing) {
            var abs = Math.abs;
            if (event.which !== 1) return clear();
            if (abs(target.offsetLeft - event.clientX - saved_delta.x < 3) && abs(target.offsetTop - event.clientY - saved_delta.y) < 3) return;
            saved_delta.ing = true;
            if (!/absolute|fixed/.test(getComputedStyle(target).position)) {
                clone = toCloneTarget(target);
                appendChild(document.body, clone);
            } else {
                clone = target;
            }
            extraClones = extraTargets.map(toCloneTarget);
            appendChild(document.body, extraClones);
            saved_delta.x += clone.offsetLeft - target.offsetLeft;
            saved_delta.y += clone.offsetTop - target.offsetTop;
            clone.style.zIndex = zIndex();
            extraClones.map(e => e.style.zIndex = clone.style.zIndex);
            dispatch("dragstart", target);
        }
        drag.target = clone;
        event.preventDefault();
        var offsetLeft = saved_delta.x + event.clientX;
        var offsetTop = saved_delta.y + event.clientY;
        var {
            offsetHeight,
            offsetWidth
        } = target;
        if (!overflow) {
            if (offsetLeft + offsetWidth > innerWidth) {
                offsetLeft = innerWidth - offsetWidth;
            }
            if (offsetTop + offsetHeight > innerHeight) {
                offsetTop = innerHeight - offsetHeight;
            }
            if (offsetLeft < 0) {
                offsetLeft = 0;
            }
            if (offsetTop < 0) {
                offsetTop = 0;
            }
        }
        var marginLeft = getMarginLeft(offsetLeft, offsetWidth, innerWidth);
        var marginTop = getMarginLeft(offsetTop, offsetHeight, innerHeight);
        var left = offsetLeft - marginLeft;
        var top = offsetTop - marginTop;
        var cloneDeltaLeft = - clone.offsetLeft;
        var cloneDeltaTop = - clone.offsetTop;
        css(clone, `left:${left * 100 / innerWidth}%;top:${top * 100 / innerHeight}%;margin-left:${marginLeft}px;margin-top:${marginTop}px`);
        cloneDeltaLeft += clone.offsetLeft;
        cloneDeltaTop += clone.offsetTop;
        extraClones.map(clone => css(clone, `left:${clone.offsetLeft + cloneDeltaLeft}px;top:${clone.offsetTop + cloneDeltaTop}px;`));
    });
    var clear = function () {
        if (clone !== target) remove(clone), css(target, { opacity: saved_opacity, filter: saved_filter });
        remove(extraClones);
        extraTargets.map((target, cx) => css(target, extraStyles[cx]));
        cancelmousemove();
        cancelmouseup();
        if (saved_delta.ing) dispatch("dragend", target);
        drag.target = null;
        saved_delta = null;
    };
    var cancelmouseup = onmouseup(window, clear);
}