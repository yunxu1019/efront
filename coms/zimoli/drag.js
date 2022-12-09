var toCloneTarget = function (target, isMovingSource) {
    target.setAttribute("dragclone", '');
    var clone = cloneVisible(target);
    target.removeAttribute("dragclone");
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
var z;
var addZIndex = function (clone) {
    if (clone.style) clone.style.zIndex = z + (+clone.style.zIndex || 0);
};
var setZIndex = function () {
    var target = this;
    if (!isElement(target)) return;
    var computed = getComputedStyle(target);
    var z0 = zIndex(0);
    if (!z || +computed.zIndex < z0) {
        z = zIndex();
        if (/^(absolute|fixed)$/i.test(computed.position)) {
            css(target, { zIndex: z });
        }
    }
    else if (z < +computed.zIndex) {
        z = +computed.zIndex;
    }
};
function drag(target, initialEvent, preventOverflow, isMovingSource) {
    if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(a => a.nodrag || a.hasAttribute('nodrag'), initialEvent.target)) return;
    if (isArrayLike(target)) {
        var extraTargets = Array.prototype.slice.call(target, 0);
        var index = extraTargets.length - 1;
        while (index > 0 && !getTargetIn(extraTargets[index], initialEvent.target)) index--;
        [target] = extraTargets.splice(index, 1);
    } else {
        var extraTargets = target.with ? [].concat(target.with) : [];
    }
    if ((!target.hasAttribute || target.hasAttribute('draggable')) && target.draggable === false) return;
    initialEvent.preventDefault();
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
        if (!saved_delta.ing) {
            var [target_left, target_top] = getOffset(target);
            if (!onclick.preventClick) return;
            saved_delta.ing = true;
            drag.target = target;
            if (isElement(target) && !/absolute|fixed/.test(getComputedStyle(target).position)) {
                clone = toCloneTarget(target, isMovingSource);
                z = zIndex(0) + 1;
                addZIndex(clone);
                appendChild(document.body, clone);
            } else {
                clone = target;
                extraTargets = [];
                if (target.style) css(target, { zIndex: z });
            }
            var [clone_left, clone_top] = getOffset(clone);
            extraClones = extraTargets.map(toCloneTarget);
            extraClones.forEach(addZIndex);
            extraClones.map(c => document.body.appendChild(c));
            saved_delta.x += clone_left - target_left;
            saved_delta.y += clone_top - target_top;
            target.setAttribute("dragging", '');
            dispatch("dragstart", target);
        }
        event.moveLocked = true;
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
        if (saved_delta.ing) target.removeAttribute("dragging"), dispatch("dragend", target);
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
    if (getTargetIn(target, actionTarget, false)) [target, actionTarget] = [actionTarget, target];
    if (!actionTarget) {
        if (target.dragHandle) {
            actionTarget = target;
            target = target.dragHandle;
        }
    }
    if (actionTarget) {
        var _mousedrag = bindActionTarget(mousedrag, actionTarget)
        var _touchdrag = bindActionTarget(touchdrag, actionTarget);
    } else {
        var _mousedrag = mousedrag;
        var _touchdrag = touchdrag;
    }
    onmousedown(actionTarget || target, setZIndex);
    ontouchstart(actionTarget || target, setZIndex);
    on("drop")(actionTarget || target, setZIndex);
    onmousedown(target, _mousedrag);
    ontouchstart(target, _touchdrag);
};