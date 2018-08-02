var recover = function (element) {
    moveMargin(element, 0);
};
var moveMargin = function (element, movePixels) {
    if (element.moved === movePixels) return;
    element.moved = movePixels;
    element.moving = new Date;
    css(element, {
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
        var previousElements = getPreviousElementSiblings(targetChild), followedElements = getFollowedElementSiblings(targetChild);
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
            var dst, append, delta;
            if (previousElements.length && previousElements[0].moved) for (var cx = 1, dx = previousElements.length + 1; cx < dx; cx++) {
                if (!previousElements[cx]) {
                    dst = 0;
                    delta = 0;
                    append = appendChild.before;
                    append(previousElements[cx - 1], targetChild);
                } else if (!previousElements[cx].moved) {
                    dst = previousElements.length - cx;
                    delta = -1;
                    append = appendChild.after;
                    append(previousElements[cx], targetChild);
                    break;
                }
            }

            if (followedElements.length && followedElements[0].moved) for (var cx = 1, dx = followedElements.length + 1; cx < dx; cx++) {
                if (!followedElements[cx]) {
                    dst = followedElements.length + previousElements.length;
                    delta = 0;
                    append = appendChild.after;
                    append(followedElements[cx - 1], targetChild);
                } else if (!followedElements[cx].moved) {
                    dst = previousElements.length + cx;
                    delta = 1;
                    append = appendChild.before;
                    append(followedElements[cx], targetChild);
                    break;
                }
            }
            previousElements.map(recover);
            followedElements.map(recover);
            cancelmouseup();
            cancelmousemove();
            if (append && isFunction(move)) move(previousElements.length, dst, dst + delta, append);
        });
    });
    return target;
}
