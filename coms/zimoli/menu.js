var getPreviousElementSiblings = function (target) {
    var previousElements = [];
    while (target.previousSibling) target = target.previousSibling, target.nodeType === 1 && previousElements.push(target);
    return previousElements;
};
var getFollowedElementSiblings = function (target) {
    var nextElements = [];
    while (target.nextSibling) target = target.nextSibling, target.nodeType === 1 && nextElements.push(target);
    return nextElements;
};
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

function autodragchildren(target, matcher, MOV) {
    onmousedown(target, function (event) {
        if (event.target === this) return;
        var targetChild = getTargetIn(matcher, event.target);
        drag(targetChild, event);
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
            if (previousElements.length && previousElements[0].moved) for (var cx = 1, dx = previousElements.length + 1; cx < dx; cx++) {
                if (!previousElements[cx]) {
                    if (isFunction(MOV)) MOV(previousElements.length, 0);
                    appendChild.before(previousElements[cx - 1], targetChild);
                } else if (!previousElements[cx].moved) {
                    if (isFunction(MOV)) MOV(previousElements.length, previousElements.length - cx);
                    appendChild.after(previousElements[cx], targetChild);
                    break;
                }
            }

            if (followedElements.length && followedElements[0].moved) for (var cx = 1, dx = followedElements.length + 1; cx < dx; cx++) {
                if (!followedElements[cx]) {
                    if (isFunction(MOV)) MOV(previousElements.length, followedElements.length + previousElements.length);
                    appendChild.after(followedElements[cx - 1], targetChild);
                } else if (!followedElements[cx].moved) {
                    if (isFunction(MOV)) MOV(previousElements.length, previousElements.length + cx);
                    appendChild.before(followedElements[cx], targetChild);
                    break;
                }
            }
            previousElements.map(recover);
            followedElements.map(recover);
            cancelmouseup();
            cancelmousemove();
        });
    });
    return target;
}

function move(array, src, dst) {
    var temp = array.splice(src, 1);
    if (temp.length) array.splice(dst, 0, temp[0]);
}
function menu(buttons, map = buttons.map((a, cx) => cx)) {
    var btns = buttons.map(function (a, cx) {
        return cx in map ? buttons[map[cx]] : a;
    });
    var menu_box = div();
    var menu_items = lattice(btns, 100);
    menu_items.nodrag = true;
    addClass(menu_items, "lattice");
    var menu_extra = button("");
    addClass(menu_extra, "more");
    onappend(menu_items, function () {
        menu_items.go(0);
    });
    autodragchildren(menu_items, e => e.parentNode && e.parentNode.parentNode === menu_items, function (c1, c2) {
        move(btns, c1, c2);
        move(map, c1, c2);
    });
    appendChild(menu_box, menu_items, menu_extra);
    return menu_box;
}