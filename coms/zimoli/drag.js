var toCloneTarget = function (target, isMovingSource) {
    var clone = cloneVisible(target);
    var position = getScreenPosition(target);
    css(clone, `position:absolute;left:${fromOffset(position.left)};top:${fromOffset(position.top)};user-select:none;`);
    setOpacity(target, isMovingSource !== false ? 0 : 1);
    return clone;
};
var appendChild = function (a, b) {
    a.appendChild(b);
};
var getOffset = function (e) {
    if (isFinite(e.offsetLeft)) return [e.offsetLeft, e.offsetTop];
    if (isFinite(e.screenLeft)) return [e.screenLeft, e.screenTop];
    if (isFinite(e.screenX)) return [e.screenX, e.screenY];
};
function drag(target, initialEvent, preventOverflow, isMovingSource) {
    if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName)) return;
    if (target.dragable === false) return;
    initialEvent.preventDefault();
    if (isArray(target)) {
        var extraTargets = target.slice(1);
        target = target[0];
    } else {
        var extraTargets = target.with ? [].concat(target.with) : [];
    }

    var target_offset = getOffset(target);
    var saved_delta = { x: target_offset[0] - initialEvent.screenX, y: target_offset[1] - initialEvent.screenY };
    var clone;
    if (target.style) {
        var saved_opacity = target.style.opacity;
        var saved_filter = target.style.filter;
        var extraStyles = extraTargets.map(e => ({ opacity: e.style.opacity, filter: e.style.filter }));
    } else if (isFunction(target.resizeTo)) {
        var saved_width = target.outerWidth;
        var saved_height = target.outerHeight;
    }
    var extraClones;

    var mousemove = function (event) {
        if (event.moveLocked) return;
        if (/resize/i.test(getComputedStyle(document.body).cursor)) return;
        event.moveLocked = true;
        if (!saved_delta.ing) {
            var abs = Math.abs;
            var [target_left, target_top] = getOffset(target);
            if (abs(target_left - event.screenX - saved_delta.x) < MOVELOCK_DELTA && abs(target_top - event.screenY - saved_delta.y) < MOVELOCK_DELTA) return;
            saved_delta.ing = true;
            if (isElement(target) && !/absolute|fixed/.test(getComputedStyle(target).position)) {
                clone = toCloneTarget(target, isMovingSource);
                appendChild(document.body, clone);
            } else {
                clone = target;
                extraTargets = [];
            }
            var [clone_left, clone_top] = getOffset(clone);
            extraClones = extraTargets.map(toCloneTarget);
            extraClones.map(c => document.body.appendChild(c));
            saved_delta.x += clone_left - target_left;
            saved_delta.y += clone_top - target_top;
            if (clone.style) {
                clone.style.zIndex = zIndex();
                extraClones.map(e => e.style.zIndex = clone.style.zIndex);
            }
            dispatch("dragstart", target);
        }
        drag.target = clone;
        var offsetLeft = saved_delta.x + event.screenX;
        var offsetTop = saved_delta.y + event.screenY;
        var [c_left, c_top] = getOffset(clone);
        var cloneDeltaLeft = -c_left, cloneDeltaTop = -c_top;
        var [c_left, c_top] = move.call(clone, offsetLeft, offsetTop, preventOverflow);
        cloneDeltaLeft += c_left;
        cloneDeltaTop += c_top;
        if (extraClones) extraClones.map(clone => css(clone, `left:${fromOffset(clone.offsetLeft + cloneDeltaLeft)};top:${fromOffset(clone.offsetTop + cloneDeltaTop)};`));
        if (isFunction(target.resizeTo)) {
            target.resizeTo(saved_width, saved_height);
        }
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
        if (getTargetIn(actionTarget, event.target) || !isElement(actionTarget)) {
            action.call(actionTarget, event);
        }
    };
};

drag.on = function (target, actionTarget = target.dragTarget) {
    if (actionTarget) {
        var _mousedrag = bindActionTarget(mousedrag, actionTarget)
        var _touchdrag = bindActionTarget(touchdrag, actionTarget);
    } else {
        var _mousedrag = mousedrag;
        var _touchdrag = touchdrag;
    }
    onmousedown(target, _mousedrag);
    ontouchstart(target, _touchdrag);
    move.bindPosition(actionTarget || target);
};