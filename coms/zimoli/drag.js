var toCloneTarget = function (target) {
    var clone = cloneVisible(target);
    var position = getScreenPosition(target);
    css(clone, `position:absolute;left:${position.left}px;top:${position.top}px;user-select:none;`);
    setOpacity(target, 0);
    return clone;
};
function drag(target, initialEvent, overflow) {
    initialEvent.preventDefault();
    if (isArray(target)) {
        var extraTargets = target.slice(1);
        target = target[0];
    } else {
        var extraTargets = target.with ? [].concat(target.with) : [];
    }
    var saved_delta = { x: target.offsetLeft - initialEvent.clientX, y: target.offsetTop - initialEvent.clientY };
    var clone;
    var saved_opacity = target.style.opacity;
    var saved_filter = target.style.filter;
    var extraStyles = extraTargets.map(e => ({ opacity: e.style.opacity, filter: e.style.filter }));
    var extraClones;
    var mousemove = function (event) {
        if (event.moveLocked) return;
        if (!saved_delta.ing) {
            var abs = Math.abs;
            if (abs(target.offsetLeft - event.clientX - saved_delta.x < MOVELOCK_DELTA) && abs(target.offsetTop - event.clientY - saved_delta.y) < MOVELOCK_DELTA) return;
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
        event.moveLocked = true;
        var offsetLeft = saved_delta.x + event.clientX;
        var offsetTop = saved_delta.y + event.clientY;
        var cloneDeltaLeft = - clone.offsetLeft;
        var cloneDeltaTop = - clone.offsetTop;
        move.call(clone, offsetLeft, offsetTop, overflow);
        cloneDeltaLeft += clone.offsetLeft;
        cloneDeltaTop += clone.offsetTop;
        extraClones.map(clone => css(clone, `left:${fromPixel(clone.offsetLeft + cloneDeltaLeft)};top:${fromPixel(clone.offsetTop + cloneDeltaTop)};`));
    };
    var clear = function () {
        if (clone !== target) remove(clone), css(target, { opacity: saved_opacity, filter: saved_filter });
        remove(extraClones);
        extraTargets.map((target, cx) => css(target, extraStyles[cx]));
        if (saved_delta.ing) dispatch("dragend", target);
        drag.target = null;
        saved_delta = null;
    };
    moveupon(target, {
        move: mousemove,
        end: clear
    }, initialEvent);
}
var mousedrag = function (event) {
    drag(this, event);
};
var touchdrag = function (event) {
    extendTouchEvent(event);
    drag(this, event);
};
drag.on = function (target) {
    onmousedown(target, mousedrag);
    ontouchstart(target, touchdrag);
};