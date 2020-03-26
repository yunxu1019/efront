var hookx = function (matcher, move, event, targetChild) {
    var recover = function (element) {
        moveMargin(element, 0);
    };
    var moveMargin = function (element, movePixels) {
        if (element.moved === movePixels) return;
        element.moved = movePixels;
        element.moving = new Date;
        css(element, {
            transition: movePixels !== false ? "margin .1s" : '',
            userSelect: "none",
            marginLeft: movePixels ? fromOffset(movePixels) : "",
            marginRight: movePixels ? fromOffset(-movePixels) : ""
        });
        if (isArray(element.with)) {
            element.with.map(function (element) {
                moveMargin(element, movePixels);
            });
        }
    };
    var cloneCell = function (element) {
        var targets = getTargetIn(matcher, element, false);
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
                setOpacity(elem, 0);
            });
        } else {
            targets = cloneVisible(targets);
        }
        return targets;
    };
    if (event.target === this) return;
    // var targetChild = getTargetIn(matcher, event.target);
    if (!targetChild) return;
    drag(targetChild, event);
    if (isArray(targetChild)) {
        targetChild = targetChild[0];
    }
    var targetBox = targetChild.parentNode;
    var saved_opacity = targetBox.style.opacity;
    var saved_filter = targetBox.style.filter;
    var previousElements = getPreviousElementSiblings(targetChild), followedElements = getFollowedElementSiblings(targetChild);
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

        autoScroll.ing = setInterval(function () {
            var dragTarget = drag.target;
            if (!dragTarget) return;
            var areaPosition = getScreenPosition(targetBox);
            var dragPosition = getScreenPosition(dragTarget);
            var scrollDelta = 0;
            if (dragPosition.left - 40 < areaPosition.left && dragPosition.right + 20 > areaPosition.left) {
                scrollDelta = dragPosition.left - 20 - areaPosition.left;
            } else if (dragPosition.right + 40 > areaPosition.right && dragPosition.left - 20 < areaPosition.right) {
                scrollDelta = dragPosition.right + 20 - areaPosition.right;
            }
            if (scrollDelta) {
                vscroll.X.call(targetBox, scrollDelta / 16, false);
                moveChildren();
            }
        }, 16);
    };
    var cancelScroll = function () {
        clearInterval(autoScroll.ing);
        autoScroll.ing = 0;
    };
    var moveChildren = function () {
        var dragTarget = drag.target;
        if (dragTarget) {
            var area = overlap(dragTarget, targetBox);
            if (area > 0) {
                var dragPosition = getScreenPosition(dragTarget);
                var dragPositionLeft = dragPosition.left;
                var currentTime = new Date;
                previousElements.map(function (element) {
                    if (currentTime - element.moving < 100) return;
                    var elementPosition = getScreenPosition(element);
                    var elementCenter = elementPosition.left + elementPosition.width / 2;
                    if (elementCenter - (element.moved || 0) <= dragPositionLeft) {
                        recover(element);
                    } else {
                        moveMargin(element, dragPosition.width);
                    }
                });
                var dragPositionRight = dragPosition.left + dragPosition.width;
                followedElements.map(function (element) {
                    if (currentTime - element.moving < 100) return;
                    var elementPosition = getScreenPosition(element);
                    var elementCenter = elementPosition.left + elementPosition.width / 2;
                    if (elementCenter - (element.moved || 0) <= dragPositionRight) {
                        moveMargin(element, -dragPosition.width);
                    } else {
                        recover(element);
                    }
                });
            } else {
                previousElements.map(recover);
                followedElements.map(recover);
            }
        } else {
            previousElements.map(recover);
            followedElements.map(recover);
        }
    };
    // 修改margin无效的情况
    function dragclone() {
        addClass(targetBox, 'dropping');
        previousElements = previousElements.map(cloneCell);
        followedElements = followedElements.map(cloneCell);
        setOpacity(targetBox, 0);
        appendChild(document.body, previousElements);
        appendChild(document.body, followedElements);
        var offall = function () {
            offdragmove();
            offdragend();
            removeClass(targetBox, "dropping");
        };
        var offdragend = on("dragend")(targetChild, function () {
            offall();
            css(targetBox, { opacity: saved_opacity, filter: saved_filter });
            remove(previousElements);
            remove(followedElements);
            var dst, appendSibling, delta;
            var src = previousElements.length;
            if (previousElements.length && previousElements[0].moved) for (var cx = 1, dx = previousElements.length + 1; cx < dx; cx++) {
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

            if (followedElements.length && followedElements[0].moved) for (var cx = 1, dx = followedElements.length + 1; cx < dx; cx++) {
                if (!followedElements[cx]) {
                    dst = followedElements.length + previousElements.length;
                    delta = 0;
                    appendSibling = appendChild.after;
                } else if (!followedElements[cx].moved) {
                    dst = previousElements.length + cx;
                    delta = 1;
                    appendSibling = appendChild.before;
                    break;
                }
            }
            previousElements.map(recover);
            followedElements.map(recover);
            if (appendSibling) {
                var children = this.parentNode.children;
                var srcElement = children[src];
                var dstElement = children[dst + delta];
                isFunction(move) && move(src, dst, dst + delta, appendSibling, this.parentNode);
                appendSibling(dstElement, srcElement);
            }
        });
        var offdragmove = on("dragmove")(targetChild, moveChildren);
    }
    // 仅修改Margin就可以实现拖拽效果
    function draglist() {
        addClass(targetBox, 'dropping');
        autoScroll();
        var style = targetBox.style;
        var savedStyle = { overflow: style.overflow, display: style.display };
        css(targetBox, "overflow:hidden;display:block");
        var offall = function () {
            cancelScroll();
            offdragmove();
            offdragend();
            removeClass(targetBox, "dropping");
            css(targetBox, savedStyle);
        };
        var offdragend = on("dragend")(targetChild, function () {
            offall();
            css(targetBox, { opacity: saved_opacity, filter: saved_filter });
            var dst, appendSibling, delta;
            var src = previousElements.length;
            if (previousElements.length && previousElements[0].moved) for (var cx = 1, dx = previousElements.length + 1; cx < dx; cx++) {
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

            if (followedElements.length && followedElements[0].moved) for (var cx = 1, dx = followedElements.length + 1; cx < dx; cx++) {
                if (!followedElements[cx]) {
                    dst = followedElements.length + previousElements.length;
                    delta = 0;
                    appendSibling = appendChild.after;
                } else if (!followedElements[cx].moved) {
                    dst = previousElements.length + cx;
                    delta = 1;
                    appendSibling = appendChild.before;
                    break;
                }
            }
            previousElements.map(e => moveMargin(e, false));
            followedElements.map(e => moveMargin(e, false));
            if (appendSibling) {
                var children = this.parentNode.children;
                var srcElement = children[src];
                var dstElement = children[dst + delta];
                isFunction(move) && move(src, dst, dst + delta, appendSibling, this.parentNode);
                appendSibling(dstElement, srcElement);
            }
        });
        var offdragmove = on("dragmove")(targetChild, moveChildren);
    }
    if (/^table/i.test(getComputedStyle(targetChild).display)) {
        var offdragstart = on("dragstart")(targetChild, dragclone);
    } else {
        var offdragstart = on("dragstart")(targetChild, draglist);
    }
};
var hooky = arriswise(hookx,arguments);
var hook = function (matcher, move, event) {
    if (event.target === this) return;
    var targetChild = getTargetIn(matcher, event.target, false);
    if (!targetChild) return;
    var run;
    if (/cell|inline/i.test(getComputedStyle(targetChild instanceof Array ? targetChild[0] : targetChild).display)) {
        run = hookx;
    } else {
        run = hooky;
    }
    run.call(this, matcher, move, event, targetChild);
};

function autodragchildren(target, matcher, move) {
    onmousedown(target, hook.bind(target, matcher, move));
    ontouchstart(target, hook.bind(target, matcher, move));
    return target;
}
