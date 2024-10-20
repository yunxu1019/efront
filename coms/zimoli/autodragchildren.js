var moveMarginX = function moveMarginX(element, movePixels) {
    if (element.moved === movePixels) return;
    element.moved = movePixels;
    css(element, {
        transition: movePixels !== false ? "margin .1s" : '',
        userSelect: "none",
        marginLeft: movePixels ? fromOffset(movePixels) : "",
        marginRight: movePixels ? fromOffset(-movePixels) : ""
    });
    if (isArray(element.with)) {
        element.with.map(function (element) {
            moveMarginX(element, movePixels);
        });
    }
};
var moveChildrenX = function (targetBox, previousElements, followedElements, moveMargin, recover) {
    var dragTarget = drag.shadow;
    if (dragTarget) {
        var area = overlap(dragTarget, targetBox);
        if (area > 0) {
            var dragPosition = getScreenPosition(dragTarget);
            var dragPositionLeft = dragPosition.left;
            var dragPositionRight = dragPosition.left + dragPosition.width;
            previousElements.forEach(function (element) {
                var elementPosition = getScreenPosition(element);
                var elementCenter = elementPosition.left + elementPosition.width / 2;
                var delta = elementCenter - (element.moved || 0);
                if ((!element.hasAttribute || element.hasAttribute('draggable')) && element.draggable === false);
                else if (delta + 2 <= dragPositionLeft) {
                    recover(element);
                }
                else if (delta - 2 >= dragPositionLeft) {
                    moveMargin(element, dragPosition.width);
                }
            });
            followedElements.forEach(function (element) {
                var elementPosition = getScreenPosition(element);
                var elementCenter = elementPosition.left + elementPosition.width / 2;
                var delta = elementCenter - (element.moved || 0);
                if ((!element.hasAttribute || element.hasAttribute('draggable')) && element.draggable === false);
                else if (delta + 2 <= dragPositionRight) {
                    moveMargin(element, -dragPosition.width);
                }
                else if (delta - 2 >= dragPositionRight) {
                    recover(element);
                }
            });
        } else {
            previousElements.forEach(recover);
            followedElements.forEach(recover);
        }
    } else {
        previousElements.forEach(recover);
        followedElements.forEach(recover);
    }
};
var scrollX = function (targetBox, moveChildren) {
    var dragTarget = drag.shadow;
    if (!dragTarget || !targetBox) return;
    targetBox = getTargetIn(function (a) {
        var computed = getComputedStyle(a);
        return (computed.overflowX || computed.overflow) !== 'visible' && a.scrollWidth > a.clientWidth;
    }, targetBox);
    var areaPosition = getScreenPosition(targetBox);
    var dragPosition = getScreenPosition(dragTarget);
    var scrollDelta = 0;
    if (dragPosition.left - 40 < areaPosition.left && dragPosition.right + 20 > areaPosition.left) {
        scrollDelta = dragPosition.left - 20 - areaPosition.left;
    } else if (dragPosition.right + 40 > areaPosition.right && dragPosition.left - 20 < areaPosition.right) {
        scrollDelta = dragPosition.right + 20 - areaPosition.right;
    }
    if (scrollDelta) {
        if (targetBox === document.documentElement) return;
        vscroll.X.call(targetBox, scrollDelta / 16, false);
        moveChildren();
    }
    return scrollDelta;
};
var scrollY = arriswise(scrollX, arguments);
var moveMarginY = arriswise(moveMarginX, arguments);
var moveChildrenY = arriswise(moveChildrenX, arguments);
var getMoveFuncs = function (child) {
    child = child instanceof Array ? child[0] : child;
    if (child && /cell|inline/i.test(getComputedStyle(child).display)) {
        return [moveMarginX, moveChildrenX, scrollX];
    } else {
        return [moveMarginY, moveChildrenY, scrollY];
    }
};
var bindTarget = function (index, element) {
    var value = new Number(index);
    value.target = element;
    return value;
};

var hooka = function (matcher, move, event, targetChild, isMovingSource) {
    var boxfinder;
    var isMovingSource = isMovingSource !== false;
    if (isMovingSource === false) boxfinder = matcher, matcher = null;
    var that = this;

    var draggingSourceOpacity = isMovingSource !== false ? 0 : 1;

    var recover = function (element) {
        moveMargin(element, 0);
    };
    var cloneCell = function (element) {
        var targets = matcher ? getTargetIn(matcher, element, false) : element;
        if (isArray(targets)) {
            var extra = targets.slice(1);
            targets = cloneVisible(targets[0]);
            targets.extraStyles = extra.map(function (extra) {
                var style = extra.style;
                return [style.opacity, style.filter];
            });
            targets.extra = extra;
            once("remove")(targets, function () {
                var { extra, extraStyles } = this;
                extra.map(function (elem, cx) {
                    var [opacity, filter] = extraStyles[cx];
                    extend(elem.style, {
                        opacity,
                        filter
                    });
                });
                delete this.extra;
            });
            targets.with = extra.map(cloneVisible);
            extra.map(function (elem) {
                setOpacity(elem, draggingSourceOpacity);
            });
        } else {
            targets = cloneVisible(targets);
        }
        return targets;
    };
    var getBoundingClientRect = function () { return getScreenPosition(this.target) }
    var bindExtra = function (element) {
        if (!matcher) return element;
        var targets = getTargetIn(matcher, element, false);
        if (isArray(targets)) {
            var [target] = targets;
            return {
                style: target.style, target, getBoundingClientRect,
                with: targets,
                draggable: !target.hasAttribute('draggable') || target.draggable,
            };
        }
        return targets;
    };
    if (event.target === this) return;
    // var targetChild = getTargetIn(matcher, event.target);
    if (!targetChild) return;
    drag(targetChild, event, false, isMovingSource);
    if (isArray(targetChild)) {
        targetChild = targetChild[0];
    }
    var targetBox, saved_opacity, saved_filter, moveMargin, moveChildren;
    var previousElements, followedElements, rebuildTargets, scroll;
    var draginit = function () {
        that.setAttribute('dragchildren', '');
        if (targetBox) addClass(targetBox, 'dropping');
        if (isMovingSource !== false) {
            targetBox = targetChild.parentNode;
            previousElements = getPreviousElementSiblings(targetChild);
            followedElements = getFollowedElementSiblings(targetChild);
            saved_filter = targetBox.style.filter;
            saved_opacity = targetBox.style.opacity;
            rebuildTargets = function () { };
            [moveMargin, moveChildren, scroll] = getMoveFuncs(targetChild);
            moveChildren = moveChildren.bind(null, that, previousElements, followedElements, moveMargin, recover);
        } else {
            previousElements = [];
            followedElements = [];
            moveChildren = () => { };
            rebuildTargets = function () {
                var temp = boxfinder(drag.target);
                if (temp === targetBox) return;
                if (previousElements) previousElements.map(recover);
                if (followedElements) followedElements.map(recover);
                if (targetBox) {
                    removeClass(targetBox, "dropping");
                }
                targetBox = temp;
                if (!targetBox) {
                    previousElements = [];
                    followedElements = [];
                    moveChildren = () => { };
                    return;
                }
                addClass(targetBox, "dropping");
                previousElements = [].slice.call(targetBox.children, 0).reverse();
                followedElements = [];
                [moveMargin, moveChildren, scroll] = getMoveFuncs(previousElements[0]);
                moveChildren = moveChildren.bind(null, targetBox, previousElements, followedElements, moveMargin, recover);
            };
        }
    };
    var dragfire = function () {
        if (!targetBox) return;
        that.removeAttribute('dragchildren');
        removeClass(targetBox, "dropping");
        var dst, appendSibling, delta;
        var k0 = -1;
        for (var k0 in previousElements) break;
        var target = drag.target;
        if (isMounted(target)) {
            if (previousElements.length) var src = previousElements.length - k0;
            else var src = 0;
        }
        else {
            var src = target.index;
        }
        if (k0 >= 0 && previousElements[k0].moved) for (var k in previousElements) {
            var cx = +k + 1;
            if (!previousElements[cx]) {
                dst = 0;
                delta = 0;
                appendSibling = appendChild.before;
            } else if (!previousElements[cx].moved) {
                dst = previousElements.length - cx;
                delta = -1;
                appendSibling = appendChild.after;
                break;
            }
        }
        var k0 = -1;
        for (var k0 in followedElements) break;
        if (k0 >= 0 && followedElements[k0].moved) for (var k in followedElements) {
            var cx = +k + 1;
            if (!followedElements[cx]) {
                dst = targetBox.children.length - 1;
                delta = 0;
                appendSibling = appendChild.after;
            } else if (!followedElements[cx].moved) {
                dst = targetBox.children.length - followedElements.length + cx - 1;
                delta = 1;
                appendSibling = appendChild.before;
                break;
            }
        }
        if (appendSibling) {
            var children = targetBox.children;
            var srcElement = target;
            var dstElement = children[dst + delta];
            if (srcElement) {
                src = bindTarget(src, isMovingSource ? targetChild : srcElement);
                dst = bindTarget(dst, dstElement);
            }
            var needFire = !isFunction(move) || move(src, dst, dst + delta, appendSibling, targetBox) !== false;
            if (needFire && srcElement === children[src] && dstElement === children[dst + delta] && srcElement && dstElement) appendSibling(dstElement, srcElement);
        } else if (isMovingSource === false) {
            move(previousElements.length, previousElements.length, previousElements.length, null, targetBox);
        }
    };

    var offall = function () {
        offmousup();
        offtouchend();
        offdragstart();
        offtouchconcel();
    };
    var offtouchconcel = on("touchconcel")(targetChild, offall);
    var offtouchend = on("touchend")(targetChild, offall);
    var offmousup = on("mouseup")(window, offall);
    var autoScroll = function () {
        if (autoScroll.ing) return;
        if (scroll) autoScroll.ing = setInterval(function () {
            var delta = scroll(targetBox, dragmove);
            if (isFunction(matcher)) return;
            if (isMovingSource === false) { }
            else if (delta < 0) {
                var p = null;
                for (var k in previousElements) {
                    if (!previousElements[k].parentNode) {
                        delete previousElements[k];
                        continue;
                    }
                    if (previousElements[+k + 1] && previousElements[k].previousElementSibling !== previousElements[+k + 1]) {
                        previousElements.splice(+k + 1, previousElements.length - k - 1);
                        break;
                    }
                }
                var k = 0;
                for (var k in followedElements) {
                    if (followedElements[k].parentNode) break;
                    delete followedElements[k];
                }
                var p = previousElements[previousElements.length - 1] || followedElements[k];
                if (p && p.previousElementSibling) {
                    k -= 1;
                    if (k >= 0) followedElements[k] = p.previousElementSibling;
                    else if (p === followedElements[0]) setOpacity(p.previousElementSibling, draggingSourceOpacity);
                    else previousElements.push(p.previousElementSibling);
                }
            }
            else if (delta > 0) {
                for (var k in followedElements) {
                    if (!followedElements[k].parentNode) {
                        delete followedElements[k];
                        continue;
                    }
                    if (followedElements[+k + 1] && followedElements[k].nextElementSibling !== followedElements[+k + 1]) {
                        followedElements.splice(+k + 1, followedElements.length - k - 1);
                        break;
                    }
                }

                var k = 0;
                for (var k in previousElements) {
                    if (previousElements[k].parentNode) break;
                    delete previousElements[k];
                }
                var f = followedElements[followedElements.length - 1] || previousElements[k];
                if (f && f.nextElementSibling) {
                    k -= 1;
                    if (k >= 0) previousElements[k] = f.nextElementSibling;
                    else if (f === previousElements[0]) setOpacity(f.nextElementSibling, draggingSourceOpacity);
                    else followedElements.push(f.nextElementSibling);
                }
            }
        }, 16);
    };
    var cancelScroll = function () {
        clearInterval(autoScroll.ing);
        autoScroll.ing = 0;
    };
    var dragmove = lazy(function (event) {
        rebuildTargets();
        moveChildren.call(this, event);
    }, -100);

    // 修改margin无效的情况
    function dragclone() {
        draginit();
        rebuildTargets();
        var _previousElements = previousElements.map(cloneCell);
        var _followedElements = followedElements.map(cloneCell);
        previousElements.splice(0, previousElements.length);
        followedElements.splice(0, followedElements.length);
        previousElements.push.apply(previousElements, _previousElements);
        followedElements.push.apply(followedElements, _followedElements);
        appendChild(document.body, previousElements);
        appendChild(document.body, followedElements);
        var offall = function () {
            offdragstart();
            offdragmove();
            offdragend();
        };
        var offdragstart = on('dragstart')(targetChild, function () {
            var c = drag.shadow;
            var zIndex = c.style.zIndex - 1;
            var copyZIndex = function (e) {
                e.style.zIndex = zIndex;
                var z = zIndex - 1;
                if (e.with) for (var w of e.with) w.style.zIndex = z;
            };
            if (zIndex > 2) {
                previousElements.forEach(copyZIndex);
                followedElements.forEach(copyZIndex);
            }
            setOpacity(targetBox, draggingSourceOpacity);
        });
        var offdragend = on("dragend")(targetChild, function () {
            offall();
            dragfire();
            css(targetBox, { opacity: saved_opacity, filter: saved_filter });
            remove(previousElements);
            remove(followedElements);
            previousElements.map(recover);
            followedElements.map(recover);
            previousElements.splice(0, previousElements.length);
            followedElements.splice(0, followedElements.length);
        });
        var offdragmove = on("dragmove")(targetChild, dragmove);
    }
    // 仅修改Margin就可以实现拖拽效果
    function draglist() {
        draginit();
        rebuildTargets();
        var _previousElements = previousElements.map(bindExtra);
        var _followedElements = followedElements.map(bindExtra);
        previousElements.splice(0, previousElements.length);
        followedElements.splice(0, followedElements.length);
        previousElements.push.apply(previousElements, _previousElements);
        followedElements.push.apply(followedElements, _followedElements);
        autoScroll();
        var offall = function () {
            cancelScroll();
            offdragmove();
            offdragend();
        };
        var offdragend = on("dragend")(targetChild, function () {
            offall();
            dragfire();
            previousElements.forEach(e => moveMargin(e, false));
            followedElements.forEach(e => moveMargin(e, false));
        });
        var offdragmove = on("dragmove")(targetChild, dragmove);
    }
    if (/^table/i.test(getComputedStyle(targetChild).display)) {
        var offdragstart = on("dragstart")(targetChild, dragclone);
    } else {
        var offdragstart = on("dragstart")(targetChild, draglist);
    }
};
var hookEvent = function (matcher, move, event) {
    if (event.target === this) return;
    var targetChild = getTargetIn(matcher, event.target, false);
    if (!targetChild) return;
    hooka.call(this, matcher, move, event, targetChild);
};
function addhook() {
    var mousedownEvent, targetElement, callback, boxfinder, dropid, allowdrops;
    [].forEach.call(arguments, function (arg) {
        switch (typeof arg) {
            case "string":
                dropid = arg;
                break;
            case "function":
                if (!callback) {
                    callback = arg;
                } else {
                    boxfinder = callback;
                    callback = arg;
                }
                break;
            case "object":
                if (arg instanceof Array) {
                    allowdrops = arg;
                    break;
                }
                if (isElement(arg)) {
                    targetElement = arg;
                    break;
                }
                if (arg !== null) mousedownEvent = arg;
                break;
        }
    });
    if (!targetElement && isElement(this)) {
        targetElement = this;
    }
    if (!mousedownEvent) return;
    var target = targetElement || mousedownEvent.currentTarget;
    hooka.call(targetElement, function (target) {
        var res = Array.prototype.filter.call(allowdrops || (boxfinder ? boxfinder(target) : document.querySelectorAll("[allowdrop]")), function (child) {
            return target && overlap(child, target);
        }).filter(e => {
            var a = e.getAttribute("allowdrop");
            if (!a || !dropid) return true;
            return a === dropid;
        });
        if (res instanceof Array) {
            return res[res.length - 1];
        }
        return res;
    }, function (_, dst, _a, _b, parentNode) {
        if (isFunction(callback) && parentNode) callback(dst, parentNode);
    }, mousedownEvent, target, false);
}
function autodragchildren(target, matcher, move) {
    onmousedown(target, hookEvent.bind(target, matcher, move));
    ontouchstart(target, hookEvent.bind(target, matcher, move));
    return target;
}
autodragchildren.hook = addhook;
