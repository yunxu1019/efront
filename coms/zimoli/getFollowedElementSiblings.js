var getFollowedElementSiblings = function (target) {
    var nextElements = [];
    while (target.nextSibling) target = target.nextSibling, target.nodeType === 1 && nextElements.push(target);
    return nextElements;
};