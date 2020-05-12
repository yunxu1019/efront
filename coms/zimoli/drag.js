var toCloneTarget = function (target) {
    var clone = cloneVisible(target);
    var position = getScreenPosition(target);
    css(clone, `position:absolute;left:${fromOffset(position.left)};top:${fromOffset(position.top)};user-select:none;`);
    setOpacity(target, 0);
    return clone;
};
var appendChild = function (a, b) {
    a.appendChild(b);
};
function drag(target, initialEvent, preventOverflow) {
    if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName)) return;
    if (target.dragable === false) return;
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
                extraTargets = [];
            }
            extraClones = extraTargets.map(toCloneTarget);
            extraClones.map(c => document.body.appendChild(c));
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
        move.call(clone, offsetLeft, offsetTop, preventOverflow);
        cloneDeltaLeft += clone.offsetLeft;
        cloneDeltaTop += clone.offsetTop;
        if (extraClones) extraClones.map(clone => css(clone, `left:${fromOffset(clone.offsetLeft + cloneDeltaLeft)};top:${fromOffset(clone.offsetTop + cloneDeltaTop)};`));
        dispatch("dragmove", target);
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
var bindActionTarget = function (action, actionTarget) {
    return function (event) {
        if (getTargetIn(actionTarget, event.target)) {
            action.call(actionTarget, event);
        }
    };
};
drag.on = function (target, actionTarget) {
    if (actionTarget) {
        var _mousedrag = bindActionTarget(mousedrag, actionTarget)
        var _touchdrag = bindActionTarget(touchdrag, actionTarget);
    } else {
        var _mousedrag = mousedrag;
        var _touchdrag = touchdrag;
    }
    onmousedown(target, _mousedrag);
    ontouchstart(target, _touchdrag);
};