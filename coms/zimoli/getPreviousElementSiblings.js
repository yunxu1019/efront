var getPreviousElementSiblings = function (target) {
    var previousElements = [];
    while (target.previousSibling) target = target.previousSibling, target.nodeType === 1 && previousElements.push(target);
    return previousElements;
};
