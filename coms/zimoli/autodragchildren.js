var recover = function (element) {
    moveMargin(element, 0);
};
var moveMargin = function (element, movePixels) {
    if (element.moved === movePixels) return;
    element.moved = movePixels;
    element.moving = new Date;
    css(element, {
        transition: "margin .1s",
        userSelect: "none",
        marginLeft: movePixels ? movePixels + "px" : "",
        marginRight: movePixels ? -movePixels + "px" : ""
    });
};
function autodragchildren(target, matcher, move) {
    onmousedown(target, function (event) {
        if (event.target === this) return;
        var targetChild = getTargetIn(matcher, event.target);
        drag(targetChild, event);
        if (isArray(targetChild)) {
            targetChild = targetChild[0];
        }
        var saved_opacity = target.style.opacity;
        var saved_filter = target.style.filter;
        var previousElements = getPreviousElementSiblings(targetChild), followedElements = getFollowedElementSiblings(targetChild);
        var offdragstart = on("dragstart")(targetChild, function () {
            previousElements = previousElements.map(cloneVisible);
            followedElements = followedElements.map(cloneVisible);
            opacity(target, 0);
            appendChild(document.body, previousElements);
            appendChild(document.body, followedElements);
        });
        var offdragend = on("dragend")(targetChild, function () {
            css(target, { opacity: saved_opacity, filter: saved_filter });
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
                isFunction(move) && move(src, dst, dst + delta, appendSibling);
                var children = this.parentNode.children;
                var srcElement = children[src];
                var dstElement = children[dst + delta];
                console.log(src, dst, srcElement, dstElement, targ)
                appendSibling(dstElement, srcElement);
            }
        });
        var cancelmousemove = onmousemove(window, function () {
            var dragTarget = drag.target;
            if (dragTarget) {
                var area = overlap(dragTarget, target);
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
        });
        var cancelmouseup = onmouseup(window, function () {
            cancelmouseup();
            cancelmousemove();
            offdragstart();
            offdragend();
        });
    });
    return target;
}
