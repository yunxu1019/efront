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
    element.moved = movePixels;
    css(element, {
        marginLeft: movePixels ? movePixels + "px" : "",
        marginRight: movePixels ? -movePixels + "px" : ""
    });
};

function autodragchildren(target, matcher) {
    onmousedown(target, function (event) {
        if (event.target === this) return;
        var targetChild = getTargetIn(matcher, event.target);
        drag(targetChild, event);
        var preivousElements = getPreviousElementSiblings(targetChild), followedElements = getFollowedElementSiblings(targetChild);
        var cancelmousemove = onmousemove(window, function () {
            var dragTarget = drag.target;
            if (dragTarget) {
                var area = overlap(dragTarget, target);
                if (area > 0) {
                    var dragPosition = getScreenPosition(dragTarget);
                    var dragPositionLeft = dragPosition.left;
                    preivousElements.map(function (element) {
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
                        var elementPosition = getScreenPosition(element);
                        var elementCenter = elementPosition.left + elementPosition.width / 2;
                        if (elementCenter - (element.moved || 0) <= dragPositionRight) {
                            moveMargin(element, -dragPosition.width);
                        } else {
                            recover(element);
                        }
                    });
                } else {
                    preivousElements.map(recover);
                    followedElements.map(recover);
                }
            } else {
                preivousElements.map(recover);
                followedElements.map(recover);
            }
        });
        var cancelmouseup = onmouseup(window, function () {
            if (preivousElements.length && preivousElements[0].moved) for (var cx = 1, dx = preivousElements.length + 1; cx < dx; cx++) {
                if (!preivousElements[cx]) {
                    appendChild.before(preivousElements[cx - 1], targetChild);
                } else if (!preivousElements[cx].moved) {
                    appendChild.after(preivousElements[cx], targetChild);
                    break;
                }
            }

            if (followedElements.length && followedElements[0].moved) for (var cx = 1, dx = followedElements.length + 1; cx < dx; cx++) {
                if (!followedElements[cx]) {
                    appendChild.after(followedElements[cx - 1], targetChild);
                } else if (!followedElements[cx].moved) {
                    appendChild.before(followedElements[cx], targetChild);
                    break;
                }
            }

            preivousElements.map(recover);
            followedElements.map(recover);
            cancelmouseup();
            cancelmousemove();
        });
    });
    return target;
}

function split() {

}

function menu(buttons) {
    var menu_box = div();
    var menu_items = lattice(buttons, 100);
    menu_items.nodrag = true;
    addClass(menu_items, "lattice");
    var menu_extra = button("");
    addClass(menu_extra, "more");
    onappend(menu_items, function () {
        menu_items.go(0);
    });
    autodragchildren(menu_items, e => e.parentNode && e.parentNode.parentNode === menu_items);
    appendChild(menu_box, menu_items, menu_extra);
    return menu_box;
}